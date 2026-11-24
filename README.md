# trending-github

GitHub project radar: five-tier trending (daily / weekly / monthly / quarterly / yearly) plus seed signals (new repos from authors and topics you follow), diffed against last run so you only see what's **new**. Built to never miss the next [Orca](https://github.com/stablyai/orca) — the project that was famous for months before you heard of it.

## Latest report

→ **[report.md](report.md)** (English, script-generated) · [report-zh.md](report-zh.md) (中文完整版)

## How it works

```
node trending.mjs             # fetch all tiers + seed signals, diff vs last run
node trending.mjs --selftest  # offline parser/diff self-check
```

Each run produces `report.md`:

| Section | Source |
|---|---|
| 🆕 New this run | auto-diff vs `seen.json` (last run's repo set) |
| Seed signals | `seeds.json`: new repos from followed authors (pushed <30d) + topic projects (<90d, interest-tagged) |
| Daily / Weekly / Monthly | GitHub Trending pages |
| Quarterly / Yearly | Search API: created-in-window + top by stars (authenticated via `gh auth token`, 30 req/min) |

Every repo is tagged against four interests — ⚡ productivity / 💰 side-hustle / 💼 job-search / 📈 investing — by regex first, human judgment second.

## Files

- `trending.mjs` — fetcher + parser + classifier (zero dependencies, Node 18+)
- `seeds.json` — your followed repos/authors/topics; edit freely
- `seen.json` — last run's repo set, powers the new-entries diff
- `history.json` — per-repo first/last seen + streak length (「在榜 N 期」)
- `report.md` / `report-zh.md` — English base report / full Chinese translation

## Conventions

- Trending HTML may change and break the parser: run `--selftest`, fix `parseTrending` regexes.
- Anonymous Search API is unstable and rate-limited; the script picks up `gh auth token` automatically.
- `report-zh.md` is rewritten each run by an agent session (see `.claude/skills/trending/SKILL.md`) — Chinese-first, interest-driven, no fluff.
