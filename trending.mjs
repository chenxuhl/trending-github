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

// 关注方向：提效 + 赚钱（副业/求职/投资多维）。关键词可自行增删，命中即归类。
const INTERESTS = {
  '⚡ 提效': /agent|skill|mcp|automat|workflow|pipeline|editor|cli|devtools|productiv|code.?review|boilerplate|scaffold|rpa|no.?code/i,
  '💰 副业': /saas|side.?project|indie|startup|landing|template|boilerplate|scaffold|starter|monet|subscription|stripe|payment|billing|commerce|shop|ecommerce|marketplace|portfolio/i,
  '💼 求职': /interview|resume|cv|job|career|hiring|leetcode|algorithm|面试|简历/i,
  '📈 投资': /trading|finance|crypto|stock|market|fintech|quant|backtest|portfolio|forex|bitcoin|defi/i,
};
function classify(r) {
  const text = `${r.repo} ${r.desc}`;
  return Object.keys(INTERESTS).filter(k => INTERESTS[k].test(text));
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
  const dedupeBy = rs => { const s = new Set(); return rs.filter(r => !s.has(r.repo) && (s.add(r.repo), true)); };

  // 1) 种子信号：作者近 30 天有 push 的 repo
  const authorSignals = [];
  for (const a of (seeds.authors || [])) {
    const repos = await listAuthorRepos(a);
    authorSignals.push(...repos.filter(r => !seedRepos.has(r.repo) && Date.now() - new Date(r.pushed) < 30 * 864e5));
  }
  // 2) 种子 topic 近 90 天新项目
  const topicSince = new Date(Date.now() - 90 * 864e5).toISOString().slice(0, 10);
  const topicSignals = [];
  for (const t of (seeds.topics || [])) {
    const repos = await searchRepo(`topic:${t} created:>${topicSince}`);
    topicSignals.push(...repos.filter(r => !seedRepos.has(r.repo)));
  }

  // 3) 常规五窗口
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
  const half = await fetchCreatedSince(182);
  const year = await fetchCreatedSince(365);

  const fmt = r => {
    const tags = classify(r);
    const extra = r.created ? ` _${r.created} 新建_` : '';
    return `- [${r.repo}](https://github.com/${r.repo}) ⭐${r.stars.toLocaleString()}${r.delta !== r.stars ? ` (+${r.delta.toLocaleString()})` : ''}${r.lang ? ` \`${r.lang}\`` : ''}${tags.length ? ` ${tags.join(' ')}` : ''}${extra} — ${r.desc || '(no description)'}`;
  };
  // 各窗口独立去重（只去掉与「本周」重复的），跨月/季/半年/年窗口允许重复出现——长窗口本就该再次看到持续热门项目
  const weekSet = new Set(weekly.map(r => r.repo));
  const minusWeek = rs => rs.filter(r => !weekSet.has(r.repo));

  const longBurn = weekly.filter(r => history[r.repo].weeks >= 4)
    .sort((a, b) => history[b.repo].weeks - history[a.repo].weeks);
  const report = [
    `# GitHub Trending 全窗口（${today}）`,
    ``,
    `## 种子信号（你在用/关注的人和主题）`,
    `### 种子作者近 30 天活跃（${dedupeBy(authorSignals).length}）`,
    ...dedupeBy(authorSignals).sort((a, b) => b.stars - a.stars).map(fmt),
    ``,
    `### 种子 topic 近 90 天新项目（${dedupeBy(topicSignals).length}）`,
    ...dedupeBy(topicSignals).sort((a, b) => b.stars - a.stars).map(fmt),
    ``,
    `## 本周（trending weekly，${weekly.length}）`,
    ...weekly.sort((a, b) => b.delta - a.delta).map(fmt),
    ``,
    `## 🔥 持续在榜 ≥4 期（${longBurn.length}）`,
    ...longBurn.map(r => `${fmt(r)} _在榜 ${history[r.repo].weeks} 期_`),
    ``,
    `## 本月（trending monthly，去重本周后 ${minusWeek(monthly).length}）`,
    ...minusWeek(monthly).sort((a, b) => b.delta - a.delta).map(fmt),
    ``,
    `## 本季度（近 90 天新建 + star 排序，top ${minusWeek(quarter).length}）`,
    ...minusWeek(quarter).map(fmt),
    ``,
    `## 半年（近 182 天新建 + star 排序，top ${minusWeek(half).length}）`,
    ...minusWeek(half).map(fmt),
    ``,
    `## 一年（近 365 天新建 + star 排序，top ${minusWeek(year).length}）`,
    ...minusWeek(year).map(fmt),
    ``,
  ].join('\n');
  writeFileSync(OUT, report);
  console.log(`seeds: authors ${dedupeBy(authorSignals).length}, topics ${dedupeBy(topicSignals).length}; weekly ${weekly.length} (${newOnes.length} new), monthly ${monthly.length} -> ${OUT}`);
}
main().catch(e => { console.error(String(e)); process.exit(1); });
