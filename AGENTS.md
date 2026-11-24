# trending-github

GitHub Trending 追踪器：定期抓取 trending，对比历史找出新晋项目和持续热门项目，避免「火了很久才知道」。

## 日常执行

想跑一次完整流程（抓取 + 中文报告）时，用 `/trending`（`.claude/skills/trending/SKILL.md`，内含用户偏好：中文优先、提效/赚钱两方向、标注在榜期数）。

## 使用

```bash
node trending.mjs                 # 抓 weekly，写 history.json + report-weekly.md（英文底稿）
node trending.mjs --selftest      # 解析器自检（HTML 改版后先跑这个）
node trending.mjs --since=daily   # daily / weekly / monthly
```

每次跑完，读 `report-weekly.md`，把新上榜项目人工翻成中文写入 `report-zh.md`（用户中文阅读优先）。

## 文件

- `trending.mjs` — 抓取 + 解析 + 分类（⚡ 提效 / 💰 赚钱 关键词匹配，关键词在 `INTERESTS`，可改）
- `history.json` — 各 repo 首见/末见/在榜期数，删掉即重置
- `report-weekly.md` — 脚本生成的英文报告
- `report-zh.md` — 中文版报告（人工/会话产出）

## 排查

报告里 star 数异常（全相同或过小）→ GitHub 改了 HTML，跑 `--selftest`，修 `parseTrending` 正则。
