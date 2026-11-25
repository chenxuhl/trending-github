# GitHub Trending 完整报告（2026-11-25，中文版）

英文版：`report.md`（脚本直出）。本文件为全条目中文翻译。
数据源：日/周/月榜 = GitHub Trending；季/年榜 = Search API（近 90/365 天新建 + star 排序 top 30，gh 认证）；种子信号 = `seeds.json` 作者/topic。
标签：⚡ 提效 / 💰 副业 / 💼 求职 / 📈 投资。

**本期新增（相对 2026-11-24）：2 个**，均为 📈 投资：[wickline](https://github.com/keptaduona/wickline)（216 星，11-13 新建）、[bytex](https://github.com/BYTEX-TRADE/bytex)（266 星，10-02 新建）。

## 💎 本期精华（10 个，脚本按价值分排序）

分数由 `score()` 计算：强方向标签（词边界修正后无假阳性）+ 赚钱类加权 + 强词密度 + 早期窗口（90 天内新建且 50–5000 星）+ 增速 − 大热降权 − 在榜衰减 − 无描述/0 星扣分；镜像/构建产物硬排除。

| 分 | 项目 | 为什么是精华 | 你怎么用 |
|---|---|---|---|
| 66 | [risk-aware-trading-agents](https://github.com/jackson-cmd/risk-aware-trading-agents)（477 📈） | 方法论最严谨：回测防未来函数 + 公开排行榜 rta-bench-1 + 10 家券商纸/实盘 | 📈 交易 agent 选型起点，先看它的排行榜再决定用谁 |
| 64 | [zeus-options-terminal](https://github.com/jackson-cmd/zeus-options-terminal)（276 📈 中英） | 功能密度惊人：持仓 Greeks、盈亏风险、离场提醒、SEC 文件、MCP 接 agent | 做美股期权就是现成终端，本地部署不交数据 |
| 64 | [free-backlink-sources](https://github.com/sherotree/free-backlink-sources)（53 💰） | 省钱：免费外链源清单（Product Hunt、HN、SaaS 目录） | 副业产品上线时照单提交，零成本起量 |
| 63 | [how-to-survive-unemployment](https://github.com/AIPMAndy/how-to-survive-unemployment)（603 💼 中文） | 中国语境唯一：N+1/2N、失业金、社保公积金，附政策原文+核验日期 | 保命级资料，现在读一遍，真遇到时不慌 |
| 62 | [app-ideas-from-reddit](https://github.com/theomarsoliman/app-ideas-from-reddit)（56 💰） | 需求真实：614 个点子全来自 Reddit 真人求软件，每条带原帖链接 | 副业选品直接翻，比自己空想靠谱 |
| 61 | [wickline](https://github.com/keptaduona/wickline)（216 📈）**🆕** | 本期新增：免费开源图表 app——加密/股票/外汇/期货实时 K 线，100 个指标、期权链 | 📈 看盘工具的自托管替代，配 zeus 终端正好一图一表 |
| 60 | [open-net-worth](https://github.com/open-net-worth-ai/open-net-worth)（724 📈） | 自托管替代品：管预算、投资，还能下单 | 替掉 Claude/ChatGPT 的理财功能，数据留本地 |
| 59 | [HFTENGINE](https://github.com/mirkovicdev/HFTENGINE)（350 📈） | 专业级：做市回测逐单复盘，订单簿+排队位置+延迟 | 📈 想做量化做市的话这是必备工具 |
| 58 | [saas-growth-agents](https://github.com/Pluviobyte/saas-growth-agents)（556 💰） | 增长杂活自动化：新词雷达、竞品外链、目录提交、抖音评论分析 | 副业做起来之后交给 agent 跑增长 |
| 55 | [bytex](https://github.com/BYTEX-TRADE/bytex)（266 📈）**🆕** | 本期新增：.NET 事件驱动量化引擎——策略写一次，回测/模拟/实盘不改代码 | 📈 C# 技术栈做量化的正好；别的栈参考其架构分层 |

**被淘汰的为什么落选**：
- **弱词降级**：含 agent/skill/mcp 但无具体场景的，如 superpowers（325k）、ECC（310k）、mattpocock/skills（332k）——harness/技能集合，与你已有生态重复。
- **词边界修复后出榜**（上期误标）：Filee（263 formats 误中 ats）、Strata（optional 误中 option）、mattpocock/skills（directory 误中副业）——本期标签已干净。
- **大热降权**：rea（477k）、firecrawl（209k）、deepseek-harness（286k），你迟早从别处知道。
- **在榜衰减**：周榜 13 个全部在榜 29 期，持续扣分。
- **方向不符**：PS5 移植、Switch 模拟、nginx、AFFiNE、storytold 系批量 craft。

---

以下为全量条目（备查，不必逐条读）。

## 种子信号（你在用/关注的作者与主题，方向命中优先）

| 项目 | 星数 | 建于 | 标签 | 一句话 |
|---|---|---|---|---|
| [magpie](https://github.com/yetone/magpie) | 41k | 09-23 | ⚡ | 菜单栏统一给 agent 换模型：Codex 用 DeepSeek、Claude Code 用 Kimi |
| [mattpocock/skills](https://github.com/mattpocock/skills) | 332k | 02-03 | ⚡ | Matt Pocock 开源 .agents 目录，工程实践型技能 |
| [dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype) | 24k | 10-31 | ⚡ | DeepSeek 自主 agent 系统原型，dsh 生态下一步 |
| [dossier](https://github.com/AienTech/dossier) | 5.5k | 10-03 | 💼 | 自托管求职+简历 builder：按 JD 定制简历和求职信 |
| [commerce-agents](https://github.com/anthropics/commerce-agents) | 3.5k | 09-01 | 💰 | Claude 商务 agent 官方参考蓝图 |
| [open-seo-mcp-skills](https://github.com/Ryze-AI-Adgent/open-seo-mcp-skills) | 10k | 08-29 | 💰 | 免费 SEO MCP + GEO 技能：关键词、排名、审计 |
| [open-net-worth](https://github.com/open-net-worth-ai/open-net-worth) | 724 | 10-15 | 📈 | 自托管个人财务 agent：预算、投资、下单 |
| [how-to-survive-unemployment](https://github.com/AIPMAndy/how-to-survive-unemployment) | 603 | 10-09 | 💼 | 中文裁员自救手册：N+1、失业金、社保 |
| [saas-growth-agents](https://github.com/Pluviobyte/saas-growth-agents) | 554 | 10-30 | 💰 | SaaS 增长杂活给 agent |
| [risk-aware-trading-agents](https://github.com/jackson-cmd/risk-aware-trading-agents) | 477 | 11-12 | 📈 | 美股 LLM 交易 agent，回测防未来函数 |
| [openchart](https://github.com/longsurf-ai/openchart) | 419 | 10-05 | 📈 | OSS 交易工作台 |
| [jev-job-search](https://github.com/qbeka/jev-job-search) | 386 | 10-02 | 💼 | 实习/校招自动填申请表、检查答案 |
| [Trader-Archives](https://github.com/suoha888/Trader-Archives) | 383 | 09-12 | 📈 | 推特实战交易员推文收录数据湖（中文） |
| [HFTENGINE](https://github.com/mirkovicdev/HFTENGINE) | 350 | 09-16 | 📈 | 做市回测回放台：订单簿+排队位置逐单复盘 |
| [aurelio-finance](https://github.com/LosaLosSantos/aurelio-finance) | 350 | 10-06 | 📈 | 个人财务 app + AI 顾问 |
| [zeus-options-terminal](https://github.com/jackson-cmd/zeus-options-terminal) | 276 | 11-12 | 📈 | 自托管期权终端：持仓、Greeks、盈亏 |
| [sentetrader](https://github.com/kingcharleslzy-ai/sentetrader) | 273 | 10-18 | 📈 | 中文：AI 私人交易助理 |
| [bytex](https://github.com/BYTEX-TRADE/bytex) | 266 | 10-02 | 📈 | .NET 事件驱动量化引擎 |
| [res](https://github.com/alextnetto/res) | 318 | 10-15 | 💰 | 浏览器逆向 SaaS 成知识库，用于重建 |
| [job-auto-apply](https://github.com/Anshul439/job-auto-apply) | 282 | 08-31 | 💼 | Wellfound/Instahyre 一键批量投递 |
| [how-profitable-startups-grow](https://github.com/yihui-dev/how-profitable-startups-grow) | 185 | 11-03 | 💰 | 740+ 真实创业公司按验证营收分档 |
| [app-ideas-from-reddit](https://github.com/theomarsoliman/app-ideas-from-reddit) | 56 | 09-20 | 💰 | 614 个真实 Reddit 需求的 app 点子 |
| [free-backlink-sources](https://github.com/sherotree/free-backlink-sources) | 53 | 09-07 | 💰 | 免费外链源：Product Hunt、HN、目录站 |
| [TokenEconomizer](https://github.com/microsoft/TokenEconomizer) | 8k | 10-13 | ⚡ | 微软：编码 agent 黑盒成本控制 |
| [replica-skill](https://github.com/Jakeschincariol/replica-skill) | 10k | 10-03 | ⚡ | 11 个免费技能克隆任意 app |
| [ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill) | 10k | 09-03 | ⚡ | agent 本地视频剪辑：42 个 FFmpeg 工具 |
| [rea-video](https://github.com/JuneYaooo/rea-video) | 13k | 10-29 | ⚡ | 中文：逐镜头逆向视频教你复刻 |
| [BeautifulRust](https://github.com/morganlinton/BeautifulRust) | 2.1k | 10-23 | ⚡ | 教 agent 写、审、移植地道 Rust |
| [agent-purge](https://github.com/ZiChuanLan/agent-purge) | 2.1k | 10-25 | ⚡ | 一套 persona 注入所有编码 agent |
| [wickline](https://github.com/keptaduona/wickline) | 216 | 11-13 | 📈 | 免费 K 线图表：加密/股票/外汇/期货，100 指标 |

一句话带过：cleanyourtv（60k）、dsh-Go（31k）、elephant-goldfish-model（22k）、lemo-opuscar（20k）、ARTEX（19k）、solidcraft（18k）、AIHOT（11k 中文热点站）、everything（9.4k）、ai-paper-system（540）、DeepInfer（26k）、chat-demo（5.4k）、oss-scanner（1.8k）、DeepJIT（477）、DeepEP-Ascend（301）、cookout（18）、orca-community-plugins（9）、qanat（334）、bankmcp（332）、GiroCrab（339）、order-flow-screener（278）、huolema（50）、cohort-fork（0）、playwright_mcp（821）。

## 日榜（trending daily，16）

| 项目 | 星数 | 标签 | 一句话 |
|---|---|---|---|
| [superpowers](https://github.com/obra/superpowers) | 325k | — | agent 技能框架 + 开发方法论 |
| [firecrawl](https://github.com/firecrawl/firecrawl) | 209k | — | agent 知识基础设施：搜索、抓取、550+ 数据源 |
| [AFFiNE](https://github.com/toeverything/AFFiNE) | 78k | — | 下一代知识库：Notion + Miro 合体 |
| [last30days-skill](https://github.com/mvanhorn/last30days-skill) | 74k | — | 跨平台调研任意主题，合成有据摘要 |
| [diagram-design](https://github.com/cathrynlavery/diagram-design) | 72k | — | 编辑级图表设计，52 种图型 |
| [minimind](https://github.com/jingyaogong/minimind) | 70k | — | 中文：两小时从 0 训 64M 大模型 |
| [CLI-Anything](https://github.com/HKUDS/CLI-Anything) | 64k | — | 所有软件 agent 原生化 |
| [nginx](https://github.com/nginx/nginx) | 33k | — | NGINX 官方仓库 |
| [Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | 21k | — | 84 技能漏洞挖掘/红队包 |
| [cursor/plugins](https://github.com/cursor/plugins) | 19k | — | Cursor 插件规范 + 官方插件 |
| [Ghost-Downloader-3](https://github.com/XiaoYouChR/Ghost-Downloader-3) | 17k | — | 中文：下载器集大成者 |
| [autoclip](https://github.com/zhouxiaoka/autoclip) | 15k | — | 中文：链接一键出片，短视频副业工具 |
| [opensre](https://github.com/Tracer-Cloud/opensre) | 15k | ⚡ | 开源 CI/CD 可靠性 agent |
| [stitch-skills](https://github.com/google-labs-code/stitch-skills) | 12k | — | Google 官方 Agent Skills 库 |
| [openvino](https://github.com/openvinotoolkit/openvino) | 12k | — | Intel AI 推理优化部署工具包 |
| [app-store-compliance](https://github.com/mjmirza/app-store-compliance) | 5.9k | — | App Store/Play 拒审避坑：124 种拒审模式 |

## 周榜（trending weekly，13；全部在榜 29 期）

| 项目 | 星数 | 本周 | 标签 | 一句话 |
|---|---|---|---|---|
| [last30days-skill](https://github.com/mvanhorn/last30days-skill) | 74k | +5.4k | — | 跨平台调研，合成有据摘要 |
| [univer](https://github.com/dream-num/univer) | 31k | +3.3k | — | AI 办公 SDK |
| [ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill) | 10k | +3.0k | — | agent 本地视频剪辑 |
| [astryx](https://github.com/meta/astryx) | 32k | +2.9k | — | Meta 开源设计系统 |
| [open-code-review](https://github.com/alibaba/open-code-review) | 56k | +2.6k | ⚡ | 阿里代码评审：规则引擎 + LLM |
| [stitch-skills](https://github.com/google-labs-code/stitch-skills) | 12k | +2.6k | — | Google 官方 Skills 库 |
| [modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) | 10k | +2.5k | — | agent 最新 Web 最佳实践 |
| [plannotator](https://github.com/backnotprop/plannotator) | 14k | +2.0k | — | agent 工作台 |
| [ag-ui](https://github.com/ag-ui-protocol/ag-ui) | 21k | +1.8k | — | Agent 带进前端的交互协议 |
| [sure](https://github.com/we-promise/sure) | 17k | +1.6k | 📈 | 个人记账应用 |
| [claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) | 8.3k | +1.5k | 📈 | 交易员技能包 |
| [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | 59k | +1.3k | — | Chrome DevTools 给 agent 用 |
| [HermesEnabler](https://github.com/pookjw/HermesEnabler) | 2.5k | +0.3k | — | Apple Watch 解锁 Hermès 表盘 |

## 月榜（trending monthly，16，去重周榜）

| 项目 | 星数 | 本月 | 标签 | 一句话 |
|---|---|---|---|---|
| [dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 86k | +48k | — | dsh 免费用 DeepSeek/Kimi 前沿模型，月增速第一 |
| [t3code](https://github.com/pingdotgg/t3code) | 77k | +47k | — | 手机/电脑远程控制 Claude Code、Codex |
| [security-audit-skill](https://github.com/cloudflare/security-audit-skill) | 78k | +35k | — | Cloudflare 安全审计技能 |
| [impeccable](https://github.com/pbakaus/impeccable) | 116k | +30k | — | agent 设计词汇表 |
| [hallmark](https://github.com/Nutlope/hallmark) | 60k | +29k | — | 反 AI 味设计技能 |
| [sherlock](https://github.com/sherlock-project/sherlock) | 117k | +22k | — | OSINT 跨平台追踪 |
| [OpenMausBot](https://github.com/milind-soni/OpenMausBot) | 27k | +22k | — | 开源 Grok Bot 替代 |
| [magpie](https://github.com/yetone/magpie) | 41k | +20k | — | 菜单栏统一换模型 |
| [DeepTutor](https://github.com/HKUDS/DeepTutor) | 62k | +20k | — | 终身个性化辅导 |
| [hyperframes](https://github.com/heygen-com/hyperframes) | 89k | +18k | — | HeyGen 开源视频编辑 |
| [claude-mem](https://github.com/thedotmack/claude-mem) | 119k | +17k | — | agent 会话持久记忆 |
| [anthropics/skills](https://github.com/anthropics/skills) | 200k | +16k | — | Anthropic 官方 Skills 仓库 |
| [Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | 21k | +15k | — | 84 技能漏洞挖掘包 |
| [claude-seo](https://github.com/AgriciDaniel/claude-seo) | 32k | +12k | 💰 | 26 子技能全链路 SEO，副业流量引擎 |
| [agent-browser](https://github.com/vercel-labs/agent-browser) | 53k | +9.4k | — | Vercel 浏览器自动化 CLI |
| [instagram-agent-skill](https://github.com/Jakeschincariol/instagram-agent-skill) | 9k | +6.2k | — | 13 个技能运营 Instagram 号 |

## 季榜（近 90 天新建，top 30）

| 项目 | 星数 | 建于 | 标签 | 一句话 |
|---|---|---|---|---|
| [dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 86k | 09-24 | — | dsh 免费用前沿模型 |
| [photocraft](https://github.com/storytold/photocraft) | 81k | 09-30 | — | 纯 Rust 照片编辑器 |
| [HowToLiveBetter](https://github.com/eternity4719/HowToLiveBetter) | 77k | 09-07 | 💼📈 | 中文人生指南：理财、社保、创业，证据分级 |
| [cleanyourtv](https://github.com/Gathin23/cleanyourtv) | 60k | 10-17 | — | Android TV 去广告 |
| [Strata](https://github.com/Niko1221/Strata) | 47k | 09-24 | — | 消费级硬件本地跑 Qwen3.8 |
| [craft-anything](https://github.com/storytold/craft-anything) | 42k | 10-31 | — | 理解任意软件原理并自己造 |
| [magpie](https://github.com/yetone/magpie) | 41k | 09-23 | — | 菜单栏统一换模型 |
| [laya](https://github.com/NandhaKishorM/laya) | 35k | 09-18 | — | 非自回归 System 1 决策引擎 |
| [dsh-Go](https://github.com/ccch1mneyyy/dsh-Go) | 31k | 10-25 | — | 手机本机跑 DeepSeek Harness |
| [Filee](https://github.com/KnifeLemon/Filee) | 30k | 09-29 | — | 离线转换 263 种文件格式 |
| [anatomy](https://github.com/wheresryan22/anatomy) | 29k | 10-08 | — | 交互式等距图解 SVG |
| [DeepInfer](https://github.com/deepseek-ai/DeepInfer) | 26k | 10-16 | — | DeepSeek 高性能推理框架 |
| [harness2](https://github.com/google-research/harness2) | 25k | 10-06 | — | Google（无描述） |
| [jev-ultrafast](https://github.com/browser-use/jev-ultrafast) | 24k | 09-16 | — | 最快最便宜的 web agent |
| [dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype) | 24k | 10-31 | — | DeepSeek 自主 agent 原型 |
| [elephant-goldfish-model](https://github.com/google/elephant-goldfish-model) | 22k | 09-13 | — | Google agent 设计/评审插件 |
| [DroidDeck](https://github.com/Droid-Deck/DroidDeck) | 21k | 09-24 | — | SteamOS 体验到 Android |
| [pdfcraft](https://github.com/storytold/pdfcraft) | 21k | 09-30 | — | 纯 Rust PDF 编辑器 |
| [unslop](https://github.com/heydamir/unslop) | 21k | 10-29 | — | 把 AI 味 UI 改成设计过的界面 |
| [gpu-unlock](https://github.com/Zagitta/gpu-unlock) | 20k | 10-18 | — | GeForce AI 提速最高 2 倍 |
| [lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) | 20k | 09-26 | — | 代码做片风格工具箱 |
| [ARTEX](https://github.com/BaaRai/ARTEX) | 19k | 10-08 | — | AI 自主渗透测试 |
| [filmcraft](https://github.com/storytold/filmcraft) | 18k | 09-30 | — | 纯 Rust 非线性视频编辑器 |
| [Compositor](https://github.com/robbietilton/Compositor) | 18k | 09-16 | — | Mac 的 Photoshop 替代品 |
| [wordcraft](https://github.com/storytold/wordcraft) | 18k | 10-07 | — | 纯 Rust 字处理器 |
| [solidcraft](https://github.com/tangency-labs/solidcraft) | 18k | 10-07 | — | 纯 Rust 参数化 3D CAD |
| [misterdownloadmanager](https://github.com/anefzaoui/misterdownloadmanager) | 17k | 10-29 | — | 纯 Rust 下载管理器 |
| [math](https://github.com/openai/math) | 17k | 10-06 | — | OpenAI Lean（无描述） |
| [nxnative](https://github.com/seedds/nxnative) | 16k | 10-13 | — | Switch 游戏原生跑 iPhone/Mac |
| [awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos) | 16k | 09-27 | — | Opus 5.5 爆款视频 + prompt 收录 |

## 年榜（近 365 天新建，top 30）

| 项目 | 星数 | 建于 | 标签 | 一句话 |
|---|---|---|---|---|
| [rea](https://github.com/morluto/rea) | 477k | 04-14 | — | agent 逆向任意软件到二进制 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | 332k | 02-03 | — | 工程师技能集 |
| [ECC](https://github.com/affaan-m/ECC) | 310k | 01-18 | ⚡ | agent harness 性能优化系统 |
| [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) | 286k | 08-13 | — | 一切皆插件 |
| [andrej-karpathy-skills](https://github.com/multica-ai/karpathy-skills) | 235k | 01-27 | — | Karpathy 观察做成 CLAUDE.md |
| [ponytail](https://github.com/DietrichGebert/ponytail) | 198k | 06-12 | — | 最懒资深开发思维（你在用） |
| [claw-code](https://github.com/ultraworkers/claw-code) | 194k | 03-31 | — | agent 管理的博物馆展品 |
| [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | 153k | 11-30 | — | UI/UX 设计智能技能 |
| [graphify](https://github.com/Graphify-Labs/graphify) | 153k | 04-03 | — | 代码库变知识图谱 |
| [gstack](https://github.com/garrytan/gstack) | 142k | 03-11 | — | Garry Tan 的 Claude Code 配置 |
| [orca](https://github.com/stablyai/orca) | 136k | 03-17 | 💰 | 你在用的 bot 舰队工具 |
| [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | 128k | 03-31 | — | 品牌设计系统 DESIGN.md 合集 |
| [caveman](https://github.com/JuliusBrussee/caveman) | 122k | 04-04 | — | 省词技能 + 本地代理（你在用） |
| [taste-skill](https://github.com/Leonxlnx/taste-skill) | 121k | 02-19 | — | 给 agent 品味 |
| [agent-skills](https://github.com/addyosmani/agent-skills) | 120k | 02-15 | — | 生产级工程技能 |
| [VoiceStudio](https://github.com/debpalash/VoiceStudio) | 117k | 04-09 | — | 本地 ElevenLabs 替代 |
| [paperclip](https://github.com/paperclipai/paperclip) | 116k | 03-02 | — | 管理工作中的 agent |
| [Agent-Reach](https://github.com/Panniantong/Agent-Reach) | 114k | 02-24 | — | agent 的全互联网眼睛（含 B 站/小红书） |
| [open-design](https://github.com/nexu-io/open-design) | 109k | 04-28 | — | 协作 AI 设计工作台 |
| [autoresearch](https://github.com/karpathy/autoresearch) | 100k | 03-06 | — | Karpathy 自动调研 |
| [archify](https://github.com/tt-a1i/archify) | 99k | 04-15 | — | 想法/代码变交互式图表 |
| [odysseus](https://github.com/odysseus-dev/odysseus) | 95k | 05-31 | — | 自托管 AI 工作区 |
| [Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) | 94k | 03-15 | — | 代码变知识图谱 |
| [worldmonitor](https://github.com/koala73/worldmonitor) | 91k | 01-08 | — | 实时全球情报仪表盘 |
| [OmniRoute](https://github.com/cheaper-inference/OmniRoute) | 90k | 02-13 | — | 375 供应商统一 AI 网关 |
| [hyperframes](https://github.com/heygen-com/hyperframes) | 89k | 03-10 | — | HeyGen 开源视频编辑 |
| [rtk](https://github.com/rtk-ai/rtk) | 87k | 01-22 | — | CLI 代理 token 省 60-90% |
| [MiroFish](https://github.com/666ghj/MiroFish) | 86k | 11-26 | — | 群体智能预测引擎（中文） |
| [dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 86k | 09-24 | — | dsh 免费用前沿模型 |
| [career-ops](https://github.com/career-ops-hq/career-ops) | 84k | 04-04 | 💼 | AI 找工作 agent：打分、简历、追踪 |

---

2026-11-25。底稿 `report.md`（英文版）。
