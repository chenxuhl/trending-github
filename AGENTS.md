# trending-github

GitHub 项目雷达：种子信号（在用工具的作者/topic 新项目）+ 五窗口 trending，产出中文报告。目标：不再错过对你有价值的项目（Orca 式教训）。

## 日常执行

想跑一次完整流程（抓取 + 中文报告）时，用 `/trending`（`.claude/skills/trending/SKILL.md`，内含用户偏好与报告格式）。

## 使用

```bash
node trending.mjs                 # 报告：种子信号 + 本周/本月(trending) + 季度/半年/一年(Search API)
node trending.mjs --selftest      # 解析器自检（HTML 改版后先跑这个）
```

跑完后按 skill 流程写 `report-zh.md`：只两层——「与你相关」（种子信号+方向命中，≤15 条展开）和「全站速览」（一段带过）。

## 文件

- `trending.mjs` — 抓取 + 解析 + 分类（标签正则只是粗筛）
- `seeds.json` — 种子清单：你在用的 repo、关注的作者、关心的 topic。**发现新工具/新作者时更新它**
- `history.json` — 各 repo 首见/末见/在榜期数，删掉即重置
- `report.md` — 脚本底稿
- `report-zh.md` — 中文报告（会话产出）

## 排查

- star 数异常 → GitHub 改 HTML，跑 `--selftest`，修 `parseTrending` 正则
- 种子信号为空 → `gh auth token` 是否失效（认证请求限流 30 req/min，种子抓取需认证）
