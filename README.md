# trending-github

GitHub project radar for **finding money-making opportunities before they get crowded**. Five-tier trending plus seed signals plus an **early-opportunity tier**: repos created <60d with 30–3000 stars, money-keyword match, quality-gated, ranked by **stars-per-day velocity** — the window is when growth is taking off but attention is still low. Built so you never learn about the next [Orca](https://github.com/stablyai/orca) months late.

## Latest report

→ **[report.md](report.md)** (English, script-generated) · [report-zh.md](report-zh.md) (中文完整版)

## How it works

```
node trending.mjs             # fetch all tiers + seed signals, diff vs last run
node trending.mjs --selftest  # offline parser/diff/scoring self-check
```

Each run produces `report.md`:

| Section | Source |
|---|---|
| 🫰 Early opportunities | created <60d, 30–3000 stars, 💰/💼/📈 keyword, quality-gated, ranked by stars/day |
| 💎 Top picks | scored and ranked by `score()` — see below |
| 🆕 New this run | auto-diff vs `seen.json` (last run's repo set) |
| Seed signals | `seeds.json`: new repos from followed authors (pushed <30d) + topic projects (<90d, interest-tagged) |
| Daily / Weekly / Monthly | GitHub Trending pages |
| Quarterly / Yearly | Search API: created-in-window + top by stars (authenticated via `gh auth token`, 30 req/min) |

## Scoring

Stars rank popularity, not usefulness. `score()` ranks by relevance to four interests — ⚡ productivity / 💰 side-hustle / 💼 job-search / 📈 investing:

- **Strong keywords only**: in 2026 nearly every trending repo says "agent" or "skill", so those are demoted to weak signals worth a flat +3. A tag requires a concrete scenario word (`stripe`, `backtest`, `resume`, `code review`, …).
- **Money first**: 💰/💼/📈 hits get +15 over productivity-only.
- **Keyword density** (+2 each, capped +16): a repo that is really about trading beats one that merely mentions a market.
- **Early window** (+20): created <90d with 50–5000 stars — found before everyone else.
- **Momentum** (+1 per 500 weekly stars, capped +10).
- **Penalties**: >50k stars −8 (you'd hear about it anyway), on the weekly board ≥4 runs −1/run (you've had your chance), <50 stars −12 (unvalidated), missing description −10.
- **Hard excluded**: mirrors, nightly/hourly build repos, read-only catalogs.

Edit `STRONG` / `score()` in `trending.mjs` to retune; `--selftest` asserts the ranking invariants.

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
