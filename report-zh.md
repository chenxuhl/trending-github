# GitHub Trending 完整报告（2026-11-24，中文版）

英文版：`report.md`（脚本直出）。本文件为全条目中文翻译。
数据源：日/周/月榜 = GitHub Trending；季/年榜 = Search API（近 90/365 天新建 + star 排序 top 30，gh 认证）；种子信号 = `seeds.json` 作者/topic。
标签：⚡ 提效 / 💰 副业 / 💼 求职 / 📈 投资。

**本期新增（相对上期 2026-11-24）：0 个**（同日第二次运行）。

## 💎 本期精华（7 个，按行动价值排序）

只列值得动手的。筛选：方向强命中 + 至少一项（早期机会 / 官方出品 / 直接可用 / 同类最佳）。

| # | 项目 | 为什么是精华 | 你怎么用 |
|---|---|---|---|
| 1 | [orca-plugins](https://github.com/stablyai/orca-plugins)（41 星 💰） | 早期窗口：Orca 官方插件市场，知道的人极少 | 你是 Orca 重度用户——看市场缺什么插件，写一个上架，吃生态红利 |
| 2 | [career-ops](https://github.com/career-ops-hq/career-ops)（84k 💼） | 同类最佳：AI 求职 agent 里最完整的（打分+ATS 简历+追踪） | 想换工作时直接跑；平时留着自己简历数据 |
| 3 | [autoclip](https://github.com/zhouxiaoka/autoclip)（15k 💰 中文） | 直接可用：链接进、短视频+字幕+文案出，适配抖音/小红书 | 内容副业的流水线工具，零剪辑技能要求 |
| 4 | [HowToLiveBetter](https://github.com/eternity4719/HowToLiveBetter)（77k 📈 中文） | 独一无二：每条结论带证据等级和出处的中文人生理财指南 | 理财/社保/法律决策前查一遍，避免踩坑 |
| 5 | [claude-seo](https://github.com/AgriciDaniel/claude-seo)（32k 💰） | 官方生态缺位：SEO 这块最全的 Claude 技能（26 子技能） | 任何要做流量的副业项目装上即用 |
| 6 | [risk-aware-trading-agents](https://github.com/jackson-cmd/risk-aware-trading-agents)（475 📈） | 方法论领先：回测防未来函数 + 公开排行榜，比同类玩具严谨 | 📈 交易 agent 选型的起点 |
| 7 | [rtk](https://github.com/rtk-ai/rtk)（87k ⚡） | 刚需：CLI 层 token 省 60-90%，单 Rust 二进制 | 立即装，省的是真金白银 |

**淘汰说明**（为什么榜上其他 140+ 个不是精华）：同类已有更好的（photocraft/pdfcraft/wordcraft/lightcraft 同一作者批量出，留一个即可）；只是热不解决你的问题（nginx、AFFiNE）；方向不符（PS5 移植、Switch 模拟）；星多但对你无增量（firecrawl 你已在用生态内工具）。

---

以下为全量条目（备查，不必逐条读）。

## 种子信号（你在用/关注的作者与主题，方向命中优先）

| 项目 | 星数 | 建于 | 标签 | 一句话 |
|---|---|---|---|---|
| [magpie](https://github.com/yetone/magpie) | 40k | 09-23 | ⚡ | 菜单栏统一给 agent 换模型：Codex 用 DeepSeek、Claude Code 用 Kimi |
| [mattpocock/skills](https://github.com/mattpocock/skills) | 331k | 02-03 | ⚡ | Matt Pocock 开源自己的 .agents 目录，工程实践型技能 |
| [dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype) | 24k | 10-31 | ⚡ | DeepSeek 自主 agent 系统原型，dsh 生态下一步 |
| [dossier](https://github.com/AienTech/dossier) | 5.5k | 10-03 | 💼 | 自托管求职+简历 builder：按 JD 定制简历和求职信 |
| [commerce-agents](https://github.com/anthropics/commerce-agents) | 3.5k | 09-01 | ⚡💰 | Claude 商务 agent 官方参考蓝图（零售/电信/娱乐） |
| [how-to-survive-unemployment](https://github.com/AIPMAndy/how-to-survive-unemployment) | 602 | 10-09 | 💼 | 中文裁员自救手册：N+1、失业金、社保，附政策原文 |
| [saas-growth-agents](https://github.com/Pluviobyte/saas-growth-agents) | 554 | 10-30 | ⚡💰 | SaaS 增长杂活给 agent：新词雷达、关键词、竞品、外链 |
| [risk-aware-trading-agents](https://github.com/jackson-cmd/risk-aware-trading-agents) | 475 | 11-12 | ⚡📈 | 美股 LLM 交易 agent：新闻回测防未来函数 |
| [open-net-worth](https://github.com/open-net-worth-ai/open-net-worth) | 726 | 10-15 | ⚡📈 | 自托管个人财务 agent：预算、投资、下单 |
| [jev-job-search](https://github.com/qbeka/jev-job-search) | 384 | 10-02 | 💼 | 实习/校招自动填申请表、检查答案 |
| [Trader-Archives](https://github.com/suoha888/Trader-Archives) | 375 | 09-12 | 📈 | 推特实战交易员推文收录数据湖（中文） |
| [zeus-options-terminal](https://github.com/jackson-cmd/zeus-options-terminal) | 260 | 11-12 | ⚡📈 | 自托管期权终端：持仓、Greeks、盈亏、离场提醒 |
| [HFTENGINE](https://github.com/mirkovicdev/HFTENGINE) | 347 | 09-16 | 📈 | 做市回测回放台：订单簿+排队位置逐单复盘 |
| [res](https://github.com/alextnetto/res) | 318 | 10-15 | ⚡💰 | 浏览器逆向 SaaS 成知识库，用于重建 |
| [job-auto-apply](https://github.com/Anshul439/job-auto-apply) | 282 | 08-31 | ⚡💼 | Wellfound/Instahyre 一键批量投递 |
| [how-profitable-startups-grow](https://github.com/yihui-dev/how-profitable-startups-grow) | 185 | 11-03 | 💰 | 740+ 真实创业公司按验证营收分档，每周更新 |
| [app-ideas-from-reddit](https://github.com/theomarsoliman/app-ideas-from-reddit) | 56 | 09-20 | 💰 | 614 个真实 Reddit 需求的 app 点子 |
| [free-backlink-sources](https://github.com/sherotree/free-backlink-sources) | 53 | 09-07 | 💰 | 免费外链源：Product Hunt、HN、目录站 |
| [open-seo-mcp-skills](https://github.com/Ryze-AI-Adgent/open-seo-mcp-skills) | 10k | 08-29 | ⚡ | 免费 SEO MCP + GEO 技能：关键词、排名、审计 |
| [replica-skill](https://github.com/Jakeschincariol/replica-skill) | 10k | 10-03 | ⚡ | 11 个免费技能克隆任意 app：逆向、重建、测试 |
| [TokenEconomizer](https://github.com/microsoft/TokenEconomizer) | 8k | 10-13 | ⚡ | 微软：编码 agent 经验驱动的黑盒成本控制 |
| [sandcastle](https://github.com/mattpocock/sandcastle) | 9.2k | 03-17 | ⚡ | TypeScript 编排沙箱化编码 agent |
| [orca-plugins](https://github.com/stablyai/orca-plugins) | 41 | 07-13 | 💰📈 | Orca 官方插件市场索引，写插件机会窗口 |
| [orca-community-plugins](https://github.com/stablyai/orca-community-plugins) | 9 | 10-25 | — | Orca 社区插件目录 |
| [DeepInfer](https://github.com/deepseek-ai/DeepInfer) | 26k | 10-16 | — | DeepSeek 官方高性能大模型推理框架 |
| [chat-demo](https://github.com/deepseek-ai/chat-demo) | 5.4k | 11-12 | — | DeepSeek 聊天示例（本周新发布） |
| [qanat](https://github.com/fidetolabs/qanat) | 334 | 09-05 | ⚡ | 投研数据平台：point-in-time 金融指标 |
| [bankmcp](https://github.com/noskillish/bankmcp) | 331 | 09-07 | ⚡ | 只读 MCP 让 AI 读你的银行账户 |
| [aurelio-finance](https://github.com/LosaLosSantos/aurelio-finance) | 352 | 10-06 | 📈 | 个人财务 app + AI 顾问：净资产、ETF、债务 |
| [ALTA](https://github.com/kyky2347/ALTA) | 1.1k | 08-27 | ⚡📈 | 自主 LLM 交易系统 |
| [openchart](https://github.com/longsurf-ai/openchart) | 411 | 10-05 | ⚡📈 | OSS 交易工作台 |
| [rea-video](https://github.com/JuneYaooo/rea-video) | 12k | 10-29 | ⚡ | 逐镜头逆向视频：拍的/AI 生成/代码做的，教你复刻（中文） |
| [awesome-submitlist](https://github.com/alvinunreal/awesome-submitlist) | 190 | 09-06 | 💰📈 | 300+ 无垃圾提交渠道：目录、launcher、社区 |
| [AIHOT](https://github.com/KKKKhazix/AIHOT) | 11k | 09-28 | — | 自己找热点、写日报的网站框架，换信源即你的行业站（中文） |
| [dsh-Go](https://github.com/ccch1mneyyy/dsh-Go) | 31k | 10-25 | — | dsh-go：手机本机跑 DeepSeek Harness，还能遥控电脑 |
| [elephant-goldfish-model](https://github.com/google/elephant-goldfish-model) | 22k | 09-13 | ⚡ | Google 开源 agent 设计/评审插件 |
| [ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill) | 10k | 09-03 | ⚡ | 编码 agent 的本地视频剪辑：42 个 FFmpeg 工具 + MCP |
| [agent-purge](https://github.com/ZiChuanLan/agent-purge) | 2.1k | 10-25 | ⚡ | 一套 persona 注入所有编码 agent 系统提示 |
| [playwright_mcp](https://github.com/oss-invisible/playwright_mcp) | 855 | 09-29 | ⚡ | 隐身 Playwright MCP：反 bot 检测 |
| [claude-agent-sdk-python](https://github.com/anthropics/claude-agent-sdk-python) | 8.6k | 06-11 | ⚡ | Anthropic 官方 Claude Agent SDK（Python） |
| [BeautifulRust](https://github.com/morganlinton/BeautifulRust) | 2.1k | 10-23 | ⚡ | 教 agent 写、审、移植地道 Rust 的技能 |
| [cleanyourtv](https://github.com/Gathin23/cleanyourtv) | 60k | 10-17 | — | Wi-Fi 给 Android/Google TV 去广告，变 Apple TV 风格 |
| [solidcraft](https://github.com/tangency-labs/solidcraft) | 18k | 10-07 | ⚡ | 纯 Rust 参数化 3D CAD，支持 MCP 自动化 |
| [lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) | 20k | 09-26 | — | Claude Code 代码做片风格工具箱：99 种现成风格（中英双语） |
| [ARTEX](https://github.com/BaaRai/ARTEX) | 18k | 10-08 | — | AI 自主渗透测试系统 |

一句话带过（与方向无关或信息量低）：everything（9.4k）、ai-paper-system（540）、oss-scanner（1.8k）、DeepJIT（477）、uplifting-biomolecular-modeling（393）、DeepEP-Ascend（301）、ai-hero-cli（155）、cookout（10 新无描述）、orca-hourly（2 构建版）、cohort-005-project-fork-3（0）、orca-community-mirror（0 镜像）、GiroCrab（337 德国银行）、order-flow-screener（278）、sentetrader（263）、bytx（206 无描述）、huolema（50）。

## 日榜（trending daily，16）

| 项目 | 星数 | 标签 | 一句话 |
|---|---|---|---|
| [superpowers](https://github.com/obra/superpowers) | 325k | ⚡ | agent 技能框架 + 软件开发方法论 |
| [firecrawl](https://github.com/firecrawl/firecrawl) | 208k | ⚡ | agent 知识基础设施：搜索、抓取、550+ 数据源一个 API |
| [AFFiNE](https://github.com/toeverything/AFFiNE) | 77k | — | 下一代知识库：Notion + Miro 合体 |
| [last30days-skill](https://github.com/mvanhorn/last30days-skill) | 73k | ⚡📈 | 跨 Reddit/X/YouTube/HN/Polymarket 调研，合成有据摘要 |
| [diagram-design](https://github.com/cathrynlavery/diagram-design) | 71k | ⚡ | 编辑级图表设计，52 种图型，纯 HTML+SVG |
| [minimind](https://github.com/jingyaogong/minimind) | 69k | — | 中文：两小时从 0 训 64M 大模型 |
| [CLI-Anything](https://github.com/HKUDS/CLI-Anything) | 64k | ⚡ | 把所有软件 agent 原生化 |
| [nginx](https://github.com/nginx/nginx) | 33k | — | NGINX 官方仓库 |
| [Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | 20k | ⚡ | 84 技能漏洞挖掘/红队包，681 份披露报告模式 |
| [cursor/plugins](https://github.com/cursor/plugins) | 19k | — | Cursor 插件规范 + 官方插件 |
| [Ghost-Downloader-3](https://github.com/XiaoYouChR/Ghost-Downloader-3) | 16k | — | 中文：下载器集大成者 |
| [autoclip](https://github.com/zhouxiaoka/autoclip) | 15k | ⚡ | 中文：链接一键出片，长视频自动剪短视频+字幕+文案 |
| [opensre](https://github.com/Tracer-Cloud/opensre) | 15k | ⚡ | 开源 CI/CD 可靠性 agent |
| [stitch-skills](https://github.com/google-labs-code/stitch-skills) | 12k | ⚡ | Google 官方 Agent Skills 库（配 Stitch MCP） |
| [openvino](https://github.com/openvinotoolkit/openvino) | 12k | — | Intel AI 推理优化部署工具包 |
| [app-store-compliance](https://github.com/mjmirza/app-store-compliance) | 5.3k | ⚡ | App Store/Play 拒审避坑：124 种拒审模式+修复 |

## 周榜（trending weekly，13；全部在榜 25 期）

| 项目 | 星数 | 本周 | 标签 | 一句话 |
|---|---|---|---|---|
| [last30days-skill](https://github.com/mvanhorn/last30days-skill) | 73k | +5.4k | ⚡📈 | 跨平台调研任意主题，合成有据摘要 |
| [univer](https://github.com/dream-num/univer) | 31k | +4.3k | ⚡ | AI 办公 SDK：编辑、计算、协作、文件处理 |
| [ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill) | 10k | +3.9k | ⚡ | agent 本地视频剪辑：42 个 FFmpeg 工具 |
| [astryx](https://github.com/meta/astryx) | 32k | +3.2k | ⚡ | Meta 开源设计系统，agent 就绪 |
| [open-code-review](https://github.com/alibaba/open-code-review) | 55k | +3.0k | ⚡ | 阿里代码评审：确定性流水线 + LLM，行级评论，内置 NPE/线程安全/XSS/SQL 注入规则 |
| [ag-ui](https://github.com/ag-ui-protocol/ag-ui) | 21k | +3.0k | ⚡ | Agent-用户交互协议，把 Agent 带进前端 |
| [modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) | 10k | +2.7k | ⚡ | agent 始终掌握最新 Web 最佳实践 |
| [stitch-skills](https://github.com/google-labs-code/stitch-skills) | 12k | +2.6k | ⚡ | Google 官方 Agent Skills 库 |
| [plannotator](https://github.com/backnotprop/plannotator) | 14k | +2.4k | ⚡ | agent 工作台：规划、标注、评审、团队共享 |
| [claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) | 8.2k | +1.9k | ⚡📈 | 交易员技能包：行情分析、技术图表、选股器 |
| [sure](https://github.com/we-promise/sure) | 17k | +1.6k | 📈 | 个人记账应用 |
| [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | 59k | +1.6k | ⚡ | Chrome DevTools 给编码 agent 用 |
| [HermesEnabler](https://github.com/pookjw/HermesEnabler) | 2.5k | +0.4k | — | Apple Watch 解锁 Hermès 表盘 |

## 月榜（trending monthly，15，去重周榜）

| 项目 | 星数 | 本月 | 标签 | 一句话 |
|---|---|---|---|---|
| [t3code](https://github.com/pingdotgg/t3code) | 76k | +44k | — | 手机/电脑远程控制 Claude Code、Codex |
| [security-audit-skill](https://github.com/cloudflare/security-audit-skill) | 77k | +36k | ⚡ | Cloudflare 多阶段安全审计技能，机器可读发现 |
| [impeccable](https://github.com/pbakaus/impeccable) | 115k | +30k | ⚡ | agent 设计词汇表：打磨、评审、抓 AI slop |
| [hallmark](https://github.com/Nutlope/hallmark) | 60k | +29k | ⚡ | 反 AI-slop 设计技能 |
| [OpenMausBot](https://github.com/milind-soni/OpenMausBot) | 27k | +21k | — | 开源 Grok Bot 替代，bot 可用虚拟机 |
| [sherlock](https://github.com/sherlock-project/sherlock) | 116k | +21k | — | 按用户名跨社交网络追踪账号（OSINT） |
| [magpie](https://github.com/yetone/magpie) | 40k | +20k | ⚡ | 菜单栏统一给 agent 换模型 |
| [DeepTutor](https://github.com/HKUDS/DeepTutor) | 62k | +19k | — | 终身个性化辅导 |
| [hyperframes](https://github.com/heygen-com/hyperframes) | 89k | +18k | ⚡ | HeyGen 开源视频编辑：写 HTML 渲染 MP4 |
| [claude-mem](https://github.com/thedotmack/claude-mem) | 119k | +17k | ⚡ | agent 会话持久记忆，跨会话注入上下文 |
| [anthropics/skills](https://github.com/anthropics/skills) | 199k | +16k | ⚡ | Anthropic 官方 Agent Skills 仓库 |
| [Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | 20k | +13k | ⚡ | 84 技能漏洞挖掘/红队包 |
| [claude-seo](https://github.com/AgriciDaniel/claude-seo) | 32k | +12k | ⚡💰 | 26 子技能 + 19 子 agent 全链路 SEO |
| [agent-browser](https://github.com/vercel-labs/agent-browser) | 53k | +9.2k | ⚡ | Vercel 浏览器自动化 CLI |
| [instagram-agent-skill](https://github.com/Jakeschincariol/instagram-agent-skill) | 8.8k | +6k | ⚡ | 13 个技能运营 Instagram 号：钩子公式、爆款选题 |

## 季榜（近 90 天新建 + star 排序，top 30）

| 项目 | 星数 | 建于 | 标签 | 一句话 |
|---|---|---|---|---|
| [dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 85k | 09-24 | — | dsh 装插件免费用 DeepSeek/Kimi 前沿模型，无限量 |
| [photocraft](https://github.com/storytold/photocraft) | 81k | 09-30 | ⚡ | 纯 Rust 照片编辑器 |
| [HowToLiveBetter](https://github.com/eternity4719/HowToLiveBetter) | 77k | 09-07 | 📈 | 中文人生指南：长寿、理财、法律、社保，证据分级 |
| [cleanyourtv](https://github.com/Gathin23/cleanyourtv) | 60k | 10-17 | — | Android TV 去广告 |
| [Strata](https://github.com/Niko1221/Strata) | 47k | 09-24 | ⚡ | 消费级硬件本地跑 Qwen3.8，OpenAI/Anthropic 兼容 API |
| [craft-anything](https://github.com/storytold/craft-anything) | 42k | 10-31 | — | 理解任意软件原理并自己造 |
| [magpie](https://github.com/yetone/magpie) | 40k | 09-23 | ⚡ | 菜单栏统一给 agent 换模型 |
| [laya](https://github.com/NandhaKishorM/laya) | 35k | 09-18 | — | 非自回归 System 1 决策引擎，单次前向，100+ 语言 |
| [dsh-Go](https://github.com/ccch1mneyyy/dsh-Go) | 31k | 10-25 | — | 手机本机跑 DeepSeek Harness |
| [Filee](https://github.com/KnifeLemon/Filee) | 30k | 09-29 | — | 离线转换 263 种文件格式，拖拽即用 |
| [anatomy](https://github.com/wheresryan22/anatomy) | 29k | 10-08 | ⚡ | 生成复杂系统的交互式等距图解 SVG |
| [DeepInfer](https://github.com/deepseek-ai/DeepInfer) | 26k | 10-16 | — | DeepSeek 高性能推理框架 |
| [harness2](https://github.com/google-research/harness2) | 25k | 10-06 | — | Google（无描述） |
| [jev-ultrafast](https://github.com/browser-use/jev-ultrafast) | 24k | 09-16 | ⚡ | 最快最便宜的 web agent |
| [dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype) | 24k | 10-31 | ⚡ | DeepSeek 自主 agent 原型 |
| [elephant-goldfish-model](https://github.com/google/elephant-goldfish-model) | 22k | 09-13 | ⚡ | Google agent 设计/评审插件 |
| [DroidDeck](https://github.com/Droid-Deck/DroidDeck) | 21k | 09-24 | — | 把 SteamOS 体验带到 Android |
| [pdfcraft](https://github.com/storytold/pdfcraft) | 21k | 09-30 | ⚡ | 纯 Rust PDF 阅读器+编辑器 |
| [unslop](https://github.com/heydamir/unslop) | 21k | 10-29 | ⚡ | 把 AI 味 UI 改成设计过的界面 |
| [gpu-unlock](https://github.com/Zagitta/gpu-unlock) | 20k | 10-18 | — | GeForce 20/30/40 系 AI 提速最高 2 倍 |
| [lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) | 20k | 09-26 | — | 代码做片风格工具箱（中英） |
| [filmcraft](https://github.com/storytold/filmcraft) | 18k | 09-30 | ⚡ | 纯 Rust 非线性视频编辑器 |
| [Compositor](https://github.com/robbietilton/Compositor) | 18k | 09-16 | 💰 | Mac 的 Photoshop 替代品 |
| [wordcraft](https://github.com/storytold/wordcraft) | 18k | 10-07 | — | 纯 Rust 字处理器 |
| [ARTEX](https://github.com/BaaRai/ARTEX) | 18k | 10-08 | — | AI 自主渗透测试 |
| [solidcraft](https://github.com/tangency-labs/solidcraft) | 18k | 10-07 | ⚡ | 纯 Rust 参数化 3D CAD |
| [math](https://github.com/openai/math) | 17k | 10-06 | — | OpenAI Lean（无描述） |
| [misterdownloadmanager](https://github.com/anefzaoui/misterdownloadmanager) | 17k | 10-29 | — | 纯 Rust 下载管理器 |
| [nxnative](https://github.com/seedds/nxnative) | 16k | 10-13 | — | Switch 游戏原生跑在 iPhone/iPad/Mac |
| [lightcraft](https://github.com/storytold/lightcraft) | 16k | 09-30 | ⚡ | 纯 Rust 非破坏性照片编辑器 |

## 年榜（近 365 天新建 + star 排序，top 30）

| 项目 | 星数 | 建于 | 标签 | 一句话 |
|---|---|---|---|---|
| [rea](https://github.com/morluto/rea) | 476k | 04-14 | ⚡ | agent 逆向任意软件：从行为到原生二进制 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | 331k | 02-03 | ⚡ | 工程师技能（直出自 .agents 目录） |
| [ECC](https://github.com/affaan-m/ECC) | 309k | 01-18 | ⚡ | agent harness 性能优化系统：技能、本能、记忆、安全 |
| [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) | 286k | 08-13 | — | DeepSeek Harness：一切皆插件 |
| [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | 235k | 01-27 | ⚡ | 把 Karpathy 的 LLM 编码观察做成 CLAUDE.md |
| [ponytail](https://github.com/DietrichGebert/ponytail) | 197k | 06-12 | ⚡ | 让 agent 像最懒资深开发思考 |
| [claw-code](https://github.com/ultraworkers/claw-code) | 194k | 03-31 | ⚡ | Rust 的 agent 管理博物馆展品 |
| [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | 153k | 11-30 | ⚡ | UI/UX 设计智能技能 |
| [graphify](https://github.com/Graphify-Labs/graphify) | 152k | 04-03 | ⚡ | 代码库+文档+SQL+PDF 变可查询知识图谱 |
| [gstack](https://github.com/garrytan/gstack) | 142k | 03-11 | — | Garry Tan 的 Claude Code 配置：CEO/设计师/QA 等 23 工具 |
| [orca](https://github.com/stablyai/orca) | 135k | 03-17 | 💰 | 用自己的订阅跑一队 bot：桌面/移动/远程 |
| [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | 128k | 03-31 | ⚡ | 各品牌设计系统 DESIGN.md 分析合集 |
| [caveman](https://github.com/JuliusBrussee/caveman) | 122k | 04-04 | ⚡ | 省词技能 + 本地代理：更短回答、更小工具输出 |
| [taste-skill](https://github.com/Leonxlnx/taste-skill) | 120k | 02-19 | ⚡ | 给 agent 品味：艺术指导、参考图、浏览器检查 |
| [agent-skills](https://github.com/addyosmani/agent-skills) | 120k | 02-15 | ⚡ | 生产级工程技能 |
| [VoiceStudio](https://github.com/debpalash/VoiceStudio) | 117k | 04-09 | — | 完全本地的 ElevenLabs 替代 |
| [paperclip](https://github.com/paperclipai/paperclip) | 116k | 03-02 | ⚡ | 管理工作中的 agent 的开源 app |
| [Agent-Reach](https://github.com/Panniantong/Agent-Reach) | 114k | 02-24 | ⚡ | 给 agent 全互联网的眼睛：Twitter/Reddit/YouTube/B站/小红书 |
| [open-design](https://github.com/nexu-io/open-design) | 109k | 04-28 | ⚡ | 协作 AI 设计工作台，本地优先 |
| [autoresearch](https://github.com/karpathy/autoresearch) | 100k | 03-06 | ⚡ | Karpathy：agent 在单 GPU nanochat 上自动跑研究 |
| [archify](https://github.com/tt-a1i/archify) | 99k | 04-15 | ⚡ | 任意想法/代码变交互式图表 |
| [odysseus](https://github.com/odysseus-dev/odysseus) | 95k | 05-31 | — | 自托管 AI 工作区 |
| [Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) | 93k | 03-15 | ⚡ | 代码变可探索的交互式知识图谱 |
| [worldmonitor](https://github.com/koala73/worldmonitor) | 91k | 01-08 | — | 实时全球情报仪表盘：新闻聚合+地缘监控 |
| [OmniRoute](https://github.com/cheaper-inference/OmniRoute) | 89k | 02-13 | ⚡ | 统一 AI 网关：375 供应商（150+ 免费）、1400+ 模型 |
| [hyperframes](https://github.com/heygen-com/hyperframes) | 89k | 03-10 | ⚡ | HeyGen 开源视频编辑 |
| [rtk](https://github.com/rtk-ai/rtk) | 87k | 01-22 | ⚡ | CLI 代理，token 省 60-90%，单 Rust 二进制 |
| [MiroFish](https://github.com/666ghj/MiroFish) | 86k | 11-26 | — | 群体智能预测引擎（中文） |
| [dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 85k | 09-24 | — | dsh 免费用前沿模型 |
| [career-ops](https://github.com/career-ops-hq/career-ops) | 84k | 04-04 | ⚡💼 | AI 找工作 agent：扫职位板、按简历打分、ATS 简历、面试准备 |

---

2026-11-24。底稿 `report.md`（英文版）。
