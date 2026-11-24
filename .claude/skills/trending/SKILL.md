---
name: trending
description: 抓取 GitHub Trending 并产出中文周报。触发词：跑 trending、抓 trending、trending 周报、本周有什么新项目、看看 trending。用户每周想了解 GitHub 新晋热门项目（方向：提效、赚钱），必须产出中文报告。
---

# trending 抓取与中文周报

## 步骤

1. 跑脚本：
   ```bash
   node trending.mjs
   ```
   输出 `report-weekly.md`（英文底稿）+ 更新 `history.json`。star 数异常（全相同/过小）→ GitHub 改版，跑 `node trending.mjs --selftest` 修 `parseTrending` 正则。

2. 读 `report-weekly.md`。重点两类：
   - 🆕 新上榜：按 delta 排序已排好
   - 🔥 持续在榜 ≥4 期：用户最在意这类（Orca 式教训：火了很久才知道）

3. 写 `report-zh.md`（覆盖式，每期一份）：
   - 全文中文，repo 名/语言/链接保留原文
   - 每条翻译描述为一两行中文，注明 star 总数和本期增量
   - 按 ⚡ 提效 / 💰 赚钱 / 其他 分组（脚本已打标，照抄分组即可）
   - 持续在榜项目单独成节，标「在榜 N 期」，给出为什么持续火的判断

4. 回复用户：3-5 行摘要，点名本期最值得看的 2-3 个项目及理由（按用户两个方向评估价值），并附 `report-zh.md` 路径。

## 用户偏好（执行时遵守）

- 中文阅读优先，任何报告/摘要必须中文。
- 两个关注方向：①能提效工作 ②能赚钱。评估项目价值只从这两个角度。
- 讨厌信息滞后：持续热门项目必须显式标出在榜期数。
- star 数、增量数字必须准确，不臆造。
