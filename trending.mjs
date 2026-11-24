#!/usr/bin/env node
// trending-github: 抓 GitHub trending（weekly），对比 history.json 找新晋/长热项目。
// 用法: node trending.js [--since=daily|weekly|monthly] [--out=report.md]
// 无依赖，Node 18+（内置 fetch）。

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { execSync } from 'node:child_process';

// 认证 token：gh 已登录则取，无则匿名（匿名 Search API 采样不稳 + 10 req/min）
let TOKEN = '';
try { TOKEN = execSync('gh auth token', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch {}
const authHeaders = { 'User-Agent': 'trending-tracker', 'Accept': 'application/vnd.github+json',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}) };

const ROOT = dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const m = a.match(/^--([^=]+)=(.*)$/);
  return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true];
}));
const SINCE = args.since || 'weekly';
const OUT = join(ROOT, args.out || 'report.md');
const HISTORY = join(ROOT, 'history.json');
const SEEN = join(ROOT, 'seen.json');

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'");
}

// shortcut: 正则解析 GitHub HTML，页面改版会失效，届时重跑看报错即可
function parseTrending(html) {
  const repos = [];
  const blocks = html.split(/<article[^>]*class="[^"]*Box-row[^"]*"/).slice(1);
  for (const b of blocks) {
    const href = b.match(/href="\/([\w.-]+\/[\w.-]+)\/stargazers"/) // 任意 stargazers 链接锚定 repo
      || b.match(/<h2[^>]*>[\s\S]*?href="\/([\w.-]+\/[\w.-]+)"/);
    if (!href) continue;
    const full = href[1];
    const desc = decodeEntities((b.match(/<p[^>]*class="[^"]*col-9[^"]*"[^>]*>([\s\S]*?)<\/p>/) || [])[1] || '').trim().replace(/\s+/g, ' ');
    const starLink = b.match(/href="\/[\w.-]+\/[\w.-]+\/stargazers"[\s\S]*?<\/svg>\s*([\d,]+)\s*<\/a>/);
    const stars = starLink ? parseInt(starLink[1].replace(/,/g, ''), 10) : 0;
    const lang = (b.match(/itemprop="programmingLanguage">([^<]+)</) || [])[1] || '';
    const delta = parseInt((((b.match(/([\d,]+)\s+stars?\s+this\s+(?:week|day|month)/) || [])[1]) || '0').replace(/,/g, ''), 10);
    repos.push({ repo: full, desc, stars, lang, delta });
  }
  return repos;
}

// 关注方向打分。2026 年「agent/skill」几乎人人都有，不再是信号，只作弱加分。
// 强词 = 直接对应用户的具体场景（能赚钱/能省时间的具体动作），弱词 = 领域背景噪音。
const STRONG = {
  '💰 副业': /saas|side.?hustle|side.?project|indie.?(hacker|maker)|monetiz|revenue|stripe|payment|billing|subscription|ecommerce|shopify|dropship|affiliate|seo|backlink|product.?hunt|launch|directory|app.?idea|startup.?idea|freelance|接单|变现|副业/i,
  '💼 求职': /resume|cv.?builder|cover.?letter|job.?(search|board|appl|hunt)|interview.?(prep|question)|ats|career|leetcode|hiring|layoff|unemploy|面试|简历|求职|裁员|失业/i,
  '📈 投资': /trading|trade.?(bot|agent|engine)|backtest|quant|portfolio.?(track|manag)|stock|equit|option|futures|forex|crypto|defi|net.?worth|personal.?finance|budget|broker|market.?(data|maker)|交易|投资|理财|量化/i,
  '⚡ 提效': /code.?review|refactor|debug|test.?(gen|coverage)|ci\/cd|devops|lint|token.?(cost|saving|reduc)|context.?(manag|window)|memory|prompt.?(optimi|engineer)|benchmark|observab|monitor|profil|migrat|document(ation)?.?gen|boilerplate|scaffold|template.?repo|自动化|提效/i,
};
// 弱词：命中只在已有强标签时加一分权重，自己不单独产生标签
const WEAK = /agent|skill|mcp|cli|automat|workflow|llm|ai/i;

function classify(r) {
  const text = `${r.repo} ${r.desc}`;
  return Object.keys(STRONG).filter(k => STRONG[k].test(text));
}

// 价值分：用于精华排序与「备查」降级。不是星数排序——星多未必对你有用。
function score(r, history) {
  const tags = classify(r);
  if (!tags.length) return 0;                       // 无强标签 = 不进精华
  const text = `${r.repo} ${r.desc}`;
  // 排除类：镜像/构建产物/目录索引本身无使用价值
  if (/\b(mirror|read-only|nightly|hourly build|daily build|adhoc build|not a source repo)\b/i.test(text)) return 0;
  let s = 10 * tags.length;
  if (tags.some(t => /💰|💼|📈/.test(t))) s += 15;    // 赚钱类优先于提效类
  // 强词密度：命中越多说明越是这个领域的正主，不是蹭词
  const density = Object.values(STRONG).reduce((n, re) => n + (text.match(new RegExp(re.source, 'gi')) || []).length, 0);
  s += Math.min(density * 2, 16);
  if (WEAK.test(text)) s += 3;                       // AI 生态内，工具链契合
  // 早期窗口：新建且星少 = 机会；但 0 星无人验证反而风险
  const ageDays = r.created ? (Date.now() - new Date(r.created)) / 864e5 : 999;
  if (ageDays < 90 && r.stars >= 50 && r.stars < 5000) s += 20;
  if (r.stars < 50) s -= 12;                         // 几乎没人用过，无法判断质量
  if (r.stars > 50000) s -= 8;                       // 大热项目信息价值低
  // 增速信号：trending 榜上的周/月增量说明正在起势
  if (r.delta && r.delta !== r.stars) s += Math.min(Math.round(r.delta / 500), 10);
  // 衰减：长期在榜说明你早有机会看到
  const weeks = history?.[r.repo]?.weeks || 0;
  if (weeks >= 4) s -= Math.min(weeks, 20);
  // 描述质量：没描述无法判断价值
  if (!r.desc || r.desc.length < 20) s -= 10;
  if (r.desc && r.desc.length > 80) s += 4;          // 说得清自己做什么
  return s;
}

async function fetchTrending(since) {
  const res = await fetch(`https://github.com/trending?since=${since}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 trending-tracker', 'Accept': 'text/html' },
  });
  if (!res.ok) throw new Error(`github trending(${since}) returned ${res.status}`);
  const repos = parseTrending(await res.text());
  if (repos.length < 10) throw new Error(`trending(${since}): only parsed ${repos.length} repos, HTML likely changed`);
  return repos;
}

// 季度/半年/一年：无 trending 页，用 Search API 取「窗口期内新建 + star 最多」
// shortcut: 匿名 Search API 结果不稳定（索引分片近似）；本机 gh 已登录则走认证请求（30 req/min，结果稳定），否则匿名
async function fetchCreatedSince(days) {
  const since = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);
  const res = await fetch(
    `https://api.github.com/search/repositories?q=created:%3E${since}&sort=stars&order=desc&per_page=30`,
    { headers: authHeaders },
  );
  if (res.status === 403) { // rate limit：等一分钟后重试一次
    await new Promise(s => setTimeout(s, 65000));
    const retry = await fetch(
      `https://api.github.com/search/repositories?q=created:%3E${since}&sort=stars&order=desc&per_page=30`,
      { headers: authHeaders },
    );
    if (!retry.ok) throw new Error(`search(${since}) retry returned ${retry.status}`);
    return mapItems(await retry.json());
  }
  if (!res.ok) throw new Error(`search(${since}) returned ${res.status}`);
  return mapItems(await res.json());
}
function mapItems(data) {
  return (data.items || []).map(i => ({
    repo: i.full_name, desc: (i.description || '').trim(), stars: i.stargazers_count,
    lang: i.language || '', delta: i.stargazers_count, created: i.created_at.slice(0, 10),
  }));
}

function main() { return mainAsync(); }

// ===== 种子信号：seeds.json 里的作者新 repo、topic 新项目 =====
async function searchRepo(q, per = 5) {
  const res = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=${per}`,
    { headers: authHeaders },
  );
  if (!res.ok) return [];
  return mapItems(await res.json());
}
async function listAuthorRepos(author) {
  const res = await fetch(`https://api.github.com/users/${author}/repos?sort=pushed&per_page=10`, { headers: authHeaders });
  if (!res.ok) return [];
  return (await res.json()).map(i => ({
    repo: i.full_name, desc: (i.description || '').trim(), stars: i.stargazers_count,
    lang: i.language || '', delta: i.stargazers_count, created: i.created_at.slice(0, 10), pushed: i.pushed_at.slice(0, 10),
  }));
}

async function mainAsync() {
  const today = new Date().toISOString().slice(0, 10);
  const history = existsSync(HISTORY) ? JSON.parse(readFileSync(HISTORY, 'utf8')) : {};
  const seeds = JSON.parse(readFileSync(join(ROOT, 'seeds.json'), 'utf8'));
  const seedRepos = new Set(seeds.repos || []);
  const prevSeen = existsSync(SEEN) ? JSON.parse(readFileSync(SEEN, 'utf8')) : null;
  const seenBefore = prevSeen ? new Set(prevSeen.repos) : null;
  const seenDate = prevSeen ? prevSeen.date : '';
  const dedupeBy = rs => { const s = new Set(); return rs.filter(r => !s.has(r.repo) && (s.add(r.repo), true)); };

  // 种子信号收紧：只保留「近 90 天新建」或「命中方向标签」的项目，砍掉常年不变的老 repo 和无关长尾
  const seedKeep = r => (r.created && Date.now() - new Date(r.created) < 90 * 864e5) || classify(r).length > 0;

  // 1) 种子信号：作者近 30 天有 push 的 repo（再过 created/标签筛选）
  const authorSignals = [];
  for (const a of (seeds.authors || [])) {
    const repos = await listAuthorRepos(a);
    authorSignals.push(...repos.filter(r => !seedRepos.has(r.repo) && seedKeep(r) && Date.now() - new Date(r.pushed) < 30 * 864e5));
  }
  // 2) 种子 topic 近 90 天新项目（再过标签筛选）
  const topicSince = new Date(Date.now() - 90 * 864e5).toISOString().slice(0, 10);
  const topicSignals = [];
  for (const t of (seeds.topics || [])) {
    const repos = await searchRepo(`topic:${t} created:>${topicSince}`);
    topicSignals.push(...repos.filter(r => !seedRepos.has(r.repo) && seedKeep(r)));
  }

  // 3) 常规五窗口：日/周/月(trending) + 季/年(Search API)
  const daily = await fetchTrending('daily');
  const weekly = await fetchTrending('weekly');
  const newOnes = [];
  for (const r of weekly) {
    const h = history[r.repo];
    if (!h) { history[r.repo] = { firstSeen: today, lastSeen: today, weeks: 1, maxDelta: r.delta }; newOnes.push(r); }
    else { h.lastSeen = today; h.weeks += 1; h.maxDelta = Math.max(h.maxDelta, r.delta); }
  }
  writeFileSync(HISTORY, JSON.stringify(history, null, 2));
  const monthly = await fetchTrending('monthly');
  const quarter = await fetchCreatedSince(90);
  const year = await fetchCreatedSince(365);

  const fmt = r => {
    const tags = classify(r);
    const extra = r.created ? ` _${r.created} 新建_` : '';
    const isNew = seenBefore && !seenBefore.has(r.repo) ? ' **🆕本期新增**' : '';
    return `- [${r.repo}](https://github.com/${r.repo}) ⭐${r.stars.toLocaleString()}${r.delta !== r.stars ? ` (+${r.delta.toLocaleString()})` : ''}${r.lang ? ` \`${r.lang}\`` : ''}${tags.length ? ` ${tags.join(' ')}` : ''}${extra}${isNew} — ${r.desc || '(no description)'}`;
  };
  const fmtScored = r => `${fmt(r)} _[${score(r, history)}分]_`;
  // 各榜独立去重：只去掉与更短窗口重复的（日→周→月→季→年），长窗口重复保留
  const weekSet = new Set(weekly.map(r => r.repo));
  const minusWeek = rs => rs.filter(r => !weekSet.has(r.repo));

  // 本期新增判定：和上期 seen.json 比，跨榜统一标 🆕，报告只需读新增项
  const allNow = [...dedupeBy(authorSignals), ...dedupeBy(topicSignals), ...daily, ...weekly,
    ...minusWeek(monthly), ...minusWeek(quarter), ...minusWeek(year)];
  const freshList = seenBefore ? allNow.filter(r => !seenBefore.has(r.repo)) : [];
  writeFileSync(SEEN, JSON.stringify({ date: today, repos: [...new Set(allNow.map(r => r.repo))] }, null, 2));

  // 精华候选：按价值分排序（非星数），只取有强方向标签的。分数逻辑见 score()
  const essence = dedupeBy(allNow).map(r => ({ r, s: score(r, history) }))
    .filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 15);

  const longBurn = weekly.filter(r => history[r.repo].weeks >= 4)
    .sort((a, b) => history[b.repo].weeks - history[a.repo].weeks);
  const report = [
    `# GitHub Trending 全窗口（${today}）`,
    ``,
    `## 💎 精华候选（按价值分排序，top ${essence.length}）`,
    `_分数 = 强方向标签 + 赚钱类优先 + 早期窗口(新建且<5k星) - 大热降权 - 长期在榜衰减 - 无描述扣分_`,
    ...essence.map(x => fmtScored(x.r)),
    ``,
    seenBefore
      ? `## 🆕 本期新增（相对上期 ${seenDate}，${dedupeBy(freshList).length} 个）\n${dedupeBy(freshList).length ? dedupeBy(freshList).sort((a, b) => b.stars - a.stars).map(fmt).join('\n') : '_无新增_'}`
      : `## 🆕 本期新增\n_首次运行，无对比基线_`,
    ``,
    `## 种子信号（你在用/关注的人和主题）`,
    `### 种子作者近 30 天活跃（${dedupeBy(authorSignals).length}）`,
    ...dedupeBy(authorSignals).sort((a, b) => b.stars - a.stars).map(fmt),
    ``,
    `### 种子 topic 近 90 天新项目（${dedupeBy(topicSignals).length}）`,
    ...dedupeBy(topicSignals).sort((a, b) => b.stars - a.stars).map(fmt),
    ``,
    `## 日榜（trending daily，${daily.length}）`,
    ...daily.sort((a, b) => b.delta - a.delta).map(fmt),
    ``,
    `## 周榜（trending weekly，${weekly.length}）`,
    ...weekly.sort((a, b) => b.delta - a.delta).map(fmt),
    ``,
    `## 🔥 持续在榜 ≥4 期（${longBurn.length}）`,
    ...longBurn.map(r => `${fmt(r)} _在榜 ${history[r.repo].weeks} 期_`),
    ``,
    `## 月榜（trending monthly，去重周榜后 ${minusWeek(monthly).length}）`,
    ...minusWeek(monthly).sort((a, b) => b.delta - a.delta).map(fmt),
    ``,
    `## 季榜（近 90 天新建 + star 排序，top ${minusWeek(quarter).length}）`,
    ...minusWeek(quarter).map(fmt),
    ``,
    `## 年榜（近 365 天新建 + star 排序，top ${minusWeek(year).length}）`,
    ...minusWeek(year).map(fmt),
    ``,
  ].join('\n');
  writeFileSync(OUT, report);
  console.log(`新增 ${dedupeBy(freshList).length} 个（vs ${seenDate || '首次'}）; seeds ${dedupeBy(authorSignals).length}+${dedupeBy(topicSignals).length}, daily ${daily.length}, weekly ${weekly.length}, monthly ${monthly.length} -> ${OUT}`);
}
// self-test: 固定 HTML/数据验证解析器与新增 diff，不发网络请求
if (args.selftest) {
  const html = `<article class="Box-row">
    <h2 class="h3"><a href="/aaa/bbb"></a></h2>
    <p class="col-9 color-fg-muted my-1 pr-4">A &amp; B trading tool</p>
    <span itemprop="programmingLanguage">Rust</span>
    <a href="/aaa/bbb/stargazers" class="Link--muted d-inline-block mr-3"><svg octicon-star width="16"></svg> 12,345</a>
    <span class="d-inline-block float-sm-right">2,300 stars this week</span>
  </article>`;
  const r = parseTrending(html);
  console.assert(r.length === 1, 'count');
  console.assert(r[0].repo === 'aaa/bbb', 'repo');
  console.assert(r[0].desc === 'A & B trading tool', 'desc');
  console.assert(r[0].stars === 12345, `stars got ${r[0].stars}`);
  console.assert(r[0].lang === 'Rust', 'lang');
  console.assert(r[0].delta === 2300, 'delta');
  console.assert(classify(r[0]).includes('📈 投资'), 'classify trading');
  // 弱词不再单独产标签：纯 agent/skill 项目不该有 ⚡
  console.assert(classify({ repo: 'x/y', desc: 'An agent skill framework with MCP' }).length === 0, 'weak words make no tag');
  console.assert(classify({ repo: 'x/y', desc: 'Automated code review and refactor tool' }).includes('⚡ 提效'), 'strong productivity word');
  // 价值分：新+小+赚钱类 > 老+大热
  const small = { repo: 'a/a', desc: 'Side hustle SaaS revenue tracker with stripe billing and subscription management', stars: 300, created: new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10) };
  const huge = { repo: 'b/b', desc: 'Automated code review for agents', stars: 90000, created: '2026-01-01' };
  console.assert(score(small, {}) > score(huge, {}), `small-new should outrank huge-old: ${score(small, {})} vs ${score(huge, {})}`);
  console.assert(score({ repo: 'c/c', desc: 'A generic agent harness', stars: 1000 }, {}) === 0, 'no strong tag = 0 score');
  // 镜像/构建产物直接排除
  console.assert(score({ repo: 'x/m', desc: 'Read-only mirror of plugin marketplace releases for stripe billing', stars: 0 }, {}) === 0, 'mirror excluded');
  // 0 星项目扣分：同描述下星少的不该赢
  const zero = { ...small, repo: 'z/z', stars: 2 };
  console.assert(score(zero, {}) < score(small, {}), 'zero-star penalized');
  // 长期在榜衰减
  const base = { repo: 'd/d', desc: 'Stock trading backtest engine for quant portfolio management', stars: 400 };
  console.assert(score(base, { 'd/d': { weeks: 20 } }) < score(base, {}), 'streak decay');
  // 新增 diff：上期有 a/a，本期 a/a + b/b → 只有 b/b 是新增
  const before = new Set(['a/a']);
  const fresh = [{ repo: 'a/a' }, { repo: 'b/b' }].filter(x => !before.has(x.repo));
  console.assert(fresh.length === 1 && fresh[0].repo === 'b/b', 'fresh diff');
  console.log('selftest ok');
  process.exit(0);
}

main().catch(e => { console.error(String(e)); process.exit(1); });
