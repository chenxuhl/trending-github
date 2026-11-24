#!/usr/bin/env node
// trending-github: 抓 GitHub trending（weekly），对比 history.json 找新晋/长热项目。
// 用法: node trending.js [--since=daily|weekly|monthly] [--out=report.md]
// 无依赖，Node 18+（内置 fetch）。

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const m = a.match(/^--([^=]+)=(.*)$/);
  return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true];
}));
const SINCE = args.since || 'weekly';
const OUT = join(ROOT, args.out || `report-${SINCE}.md`);
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

// 关注方向：提效 + 赚钱。关键词可自行增删，命中即归类。
const INTERESTS = {
  '⚡ 提效': /agent|skill|mcp|automat|workflow|pipeline|editor|cli|devtools|productiv|code.?review|boilerplate|scaffold|rpa|no.?code/i,
  '💰 赚钱': /trading|finance|crypto|stock|market|payment|billing|commerce|shop|ecommerce|monet|business|revenue|fintech|invoice|pos/i,
};
function classify(r) {
  const text = `${r.repo} ${r.desc}`;
  return Object.keys(INTERESTS).filter(k => INTERESTS[k].test(text));
}

function main() { return mainAsync(); }
async function mainAsync() {
  const res = await fetch(`https://github.com/trending?since=${SINCE}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 trending-tracker', 'Accept': 'text/html' },
  });
  if (!res.ok) throw new Error(`github returned ${res.status}`);
  const repos = parseTrending(await res.text());
  if (repos.length < 10) throw new Error(`only parsed ${repos.length} repos, HTML likely changed`);

  const today = new Date().toISOString().slice(0, 10);
  const history = existsSync(HISTORY) ? JSON.parse(readFileSync(HISTORY, 'utf8')) : {};
  const now = { newOnes: [], still: [] };
  for (const r of repos) {
    const h = history[r.repo];
    if (!h) { history[r.repo] = { firstSeen: today, lastSeen: today, weeks: 1, maxDelta: r.delta }; now.newOnes.push(r); }
    else { h.lastSeen = today; h.weeks += 1; h.maxDelta = Math.max(h.maxDelta, r.delta); now.still.push(r); }
  }
  writeFileSync(HISTORY, JSON.stringify(history, null, 2));

  const fmt = r => {
    const tags = classify(r);
    return `- [${r.repo}](https://github.com/${r.repo}) ⭐${r.stars.toLocaleString()} (+${r.delta.toLocaleString()} this ${SINCE === 'daily' ? 'day' : SINCE.replace('ly', '')})${r.lang ? ` \`${r.lang}\`` : ''}${tags.length ? ` ${tags.join(' ')}` : ''} — ${r.desc || '(no description)'}`;
  };
  const longBurn = now.still.filter(r => history[r.repo].weeks >= 4)
    .sort((a, b) => history[b.repo].weeks - history[a.repo].weeks);
  const report = [
    `# GitHub Trending（${SINCE}，${today}）`,
    ``,
    `## 🆕 新上榜（${now.newOnes.length}）`,
    ...now.newOnes.sort((a, b) => b.delta - a.delta).map(fmt),
    ``,
    `## 🔥 持续在榜 ≥4 期，别再错过（${longBurn.length}）`,
    ...longBurn.map(r => `${fmt(r)} _在榜 ${history[r.repo].weeks} 期_`),
    ``,
    `## 其余在榜（${now.still.length - longBurn.length}）`,
    ...now.still.filter(r => history[r.repo].weeks < 4).sort((a, b) => b.delta - a.delta).map(fmt),
    ``,
  ].join('\n');
  writeFileSync(OUT, report);
  console.log(`${repos.length} repos, ${now.newOnes.length} new -> ${OUT}`);
}

// self-test: 固定 HTML 片段验证解析器
if (args.selftest) {
  const html = `<article class="Box-row">
    <h2 class="h3"><a href="/aaa/bbb"></a></h2>
    <p class="col-9 color-fg-muted my-1 pr-4">A &amp; B tool</p>
    <span itemprop="programmingLanguage">Rust</span>
    <a href="/aaa/bbb/stargazers" class="Link--muted d-inline-block mr-3"><svg octicon-star width="16"></svg> 12,345</a>
    <span class="d-inline-block float-sm-right">2,300 stars this week</span>
  </article>`;
  const r = parseTrending(html);
  console.assert(r.length === 1, 'count');
  console.assert(r[0].repo === 'aaa/bbb', 'repo');
  console.assert(r[0].desc === 'A & B tool', 'desc');
  console.assert(r[0].stars === 12345, 'stars');
  console.assert(r[0].lang === 'Rust', 'lang');
  console.assert(r[0].delta === 2300, 'delta');
  console.log('selftest ok');
  process.exit(0);
}

main().catch(e => { console.error(String(e)); process.exit(1); });
