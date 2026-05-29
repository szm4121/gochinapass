# GoChinaPass 架构与技术方案

> 最后更新: 2026-05-28
> 版本: v1.0 (MVP 设计阶段)

---

## 目录

1. [整体架构总览](#1-整体架构总览)
2. [技术栈选型与理由](#2-技术栈选型与理由)
3. [详细功能模块分解](#3-详细功能模块分解)
4. [AI 系统设计](#4-ai-系统设计)
5. [SEO 内容引擎架构](#5-seo-内容引擎架构)
6. [商业化系统设计](#6-商业化系统设计)
7. [数据模型设计](#7-数据模型设计)
8. [API 设计](#8-api-设计)
9. [部署与运维](#9-部署与运维)
10. [分阶段实施路线图](#10-分阶段实施路线图)

---

## 1. 整体架构总览

### 1.1 架构层次

```
┌─────────────────────────────────────────────────────────────────┐
│                        客户端层 (Client)                         │
│   ┌──────────────────┐  ┌──────────────┐  ┌───────────────┐   │
│   │  Next.js SSR Web  │  │  PWA Mobile   │  │  (未来) App   │   │
│   │  (主客户端)       │  │  Web          │  │  Flutter/RN  │   │
│   └────────┬─────────┘  └──────┬───────┘  └───────┬───────┘   │
│            │                   │                   │           │
├────────────┼───────────────────┼───────────────────┼───────────┤
│            │         API Gateway (Next.js API Routes / BFF)     │
│            │         Edge Cache (Vercel Edge / Cloudflare)      │
├────────────┼───────────────────┼───────────────────┼───────────┤
│            ▼                   ▼                   ▼           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    业务服务层 (Services)                  │   │
│  │                                                         │   │
│  │  ┌─────────────────┐  ┌──────────────┐  ┌────────────┐ │   │
│  │  │    AI 服务       │  │  内容服务     │  │ 用户/预订  │ │   │
│  │  │  ┌───────────┐  │  │ ┌──────────┐ │  │ ┌────────┐ │ │   │
│  │  │  │ Trip      │  │  │ │ CMS      │ │  │ │Auth    │ │ │   │
│  │  │  │ Planner   │  │  │ │          │ │  │ │        │ │ │   │
│  │  │  ├───────────┤  │  │ ├──────────┤ │  │ ├────────┤ │ │   │
│  │  │  │ Q&A Chat  │  │  │ │ SEO页面  │ │  │ │Affiliate│ │ │   │
│  │  │  ├───────────┤  │  │ ├──────────┤ │  │ ├────────┤ │ │   │
│  │  │  │ RAG       │  │  │ │ City     │ │  │ │行程收藏│ │ │   │
│  │  │  │ 知识库    │  │  │ │ Guide    │ │  │ ├────────┤ │ │   │
│  │  │  └───────────┘  │  │ ├──────────┤ │  │ │PDF导出 │ │ │   │
│  │  │                 │  │ │ Blog     │ │  │ └────────┘ │ │   │
│  │  └─────────────────┘  │ └──────────┘ │  └────────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                         │           │            │              │
├─────────────────────────┼───────────┼────────────┼──────────────┤
│                         ▼           ▼            ▼              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     数据层 (Data)                        │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  PostgreSQL: 用户 / 行程 / 内容 / 预订管理        │   │   │
│  │  │  Redis: 缓存 / 会话 / API限流 / AI响应缓存        │   │   │
│  │  │  PGvector: RAG 向量存储 (知识库文章嵌入)          │   │   │
│  │  │  CDN: 图片 / 静态资源 / SEO元数据                 │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                         │                                       │
├─────────────────────────┼───────────────────────────────────────┤
│                         ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   外部集成层 (Integrations)               │   │
│  │                                                         │   │
│  │  AI API ─── OpenAI GPT-4.1 / Claude (长文生成)           │   │
│  │  Affiliate ─ Booking / Agoda / Trip.com / Airalo /      │   │
│  │              Holafly / NordVPN / ExpressVPN API          │   │
│  │  自动化 ──── n8n (内容批量生成 / SEO发布 / 数据同步)     │   │
│  │  分析 ────── Google Analytics / Search Console           │   │
│  │  支付 ────── Stripe (未来 AI 会员)                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 架构原则

| 原则 | 说明 |
|------|------|
| **SSR 优先** | SEO 是核心增长引擎，所有内容页必须 SSR |
| **AI as a Service** | AI 能力独立部署，与业务服务松耦合，方便切换模型 |
| **缓存分层** | Edge → Redis → DB，减少 API 调用成本 |
| **渐进增强** | MVP 不追求微服务，Monorepo + 模块化，后续拆 |
| **内容驱动** | CMS 数据 + AI 生成 + 程序化 SEO 三位一体 |

---

## 2. 技术栈选型与理由

### 2.1 技术栈总表

| 层级 | 选型 | 理由 |
|------|------|------|
| **前端框架** | Next.js 15 (App Router) | SSR 原生支持 SEO，RSC 减少客户端 JS，Edge Runtime 支持 |
| **样式** | Tailwind CSS v4 + shadcn/ui | 快速构建，专业 UI，减少设计成本 |
| **语言** | TypeScript (全栈) | 前后端类型共享，减少运行时错误 |
| **AI SDK** | Vercel AI SDK | 流式输出、工具调用、多模型切换原生支持 |
| **AI 编排** | LangChain / Vercel AI SDK | prompt 模板管理、RAG pipeline、工具调用 |
| **ORM** | Prisma | TypeScript 原生，类型安全，迁移管理 |
| **数据库** | PostgreSQL + PGvector | 关系数据 + 向量搜索，一个数据库解决 |
| **缓存** | Redis (Upstash/Vercel KV) | Serverless 友好，Edge 兼容 |
| **CMS** | Sanity / Hygraph (Headless CMS) | 编辑友好，API 灵活，支持国际化 |
| **自动化** | n8n (自托管) | 可视化工作流，SEO批量生成、数据同步 |
| **部署** | Vercel (Web) + Render/Fly.io (服务) | Edge 部署，全球 CDN，零运维 |
| **搜索** | Meilisearch / Typesense | 轻量全文搜索，比 Elasticsearch 省成本 |
| **监控** | Sentry + PostHog | 错误追踪 + 用户行为分析 |
| **AI 模型** | OpenAI GPT-4.1 (主) / Claude (长文) | 性价比最优，工具调用能力强 |

### 2.2 为什么选 Next.js 而非其他方案

| 方案 | 评估 |
|------|------|
| **Next.js** ✅ | SSR + Edge + API Routes 三合一，一个项目搞定前后端，SEO 友好，生态成熟 |
| **WordPress** ❌ | 不适合 AI 原生场景，API 层需要额外开发，维护成本高 |
| **Gatsby/ Astro** ⚠️ | SSG 为主，动态 AI 交互场景需要额外 Server 支持 |
| **纯后端 (Python FastAPI) + 前端分离** ⚠️ | 可行，但多一个部署单元，MVP 阶段增加复杂度 |

### 2.3 AI 服务架构选型

**推荐方案：Next.js API Routes + Vercel AI SDK + LangChain**

```
用户输入 → Next.js API Route → Vercel AI SDK → LangChain Chain → OpenAI/Claude
                                   ↓
         Prompt 模板 + RAG 知识库 + 工具调用 (搜索引擎 / Affiliate API)
                                   ↓
                              流式响应 → 客户端展示
```

**为什么不选 Dify 作为 MVP？**
- MVP 阶段自定义度要求高，Dify 的编排灵活性有限
- V2 可将 AI Q&A 迁移到 Dify，降低维护成本

---

## 3. 详细功能模块分解

### 3.1 功能模块总图

```
GoChinaPass (网站)
│
├── 🧠 AI Travel Planner (核心功能)
│   ├── 行程生成引擎
│   │   ├── 单城市行程生成 (3/5/7天)
│   │   ├── 多城市行程生成 (北京→上海→成都)
│   │   ├── 主题行程 (美食/文化/自然/历史)
│   │   └── 预算敏感行程
│   ├── AI 问答
│   │   ├── 实时旅行问答 (RAG增强)
│   │   ├── 语境化推荐 (根据行程上下文)
│   │   └── 常见问题快速回答
│   └── 行程管理
│       ├── 行程收藏 (未来)
│       ├── 行程编辑 (未来)
│       └── PDF导出 (未来)
│
├── 📖 China Survival Guide (SEO内容核心)
│   ├── 支付指南
│   │   ├── Alipay 注册与使用
│   │   ├── WeChat Pay 绑卡教程
│   │   ├── 外卡在中国刷卡指南
│   │   └── 现金使用技巧
│   ├── 交通指南
│   │   ├── 高铁预订教程 (12306)
│   │   ├── 地铁乘坐指南
│   │   ├── 打车 (Didi) 使用教程
│   │   └── 飞机国内航线指南
│   ├── 网络指南
│   │   ├── 最佳 VPN 推荐 (Affiliate)
│   │   ├── eSIM 购买指南 (Affiliate)
│   │   ├── 中国网络限制详解
│   │   └── 手机卡购买指南
│   ├── 必备App
│   │   ├── 翻译类App (DeepL / Google Translate)
│   │   ├── 地图类 (高德/百度 Maps 替代)
│   │   ├── 社交类 (微信/小红书)
│   │   └── 美食类 (大众点评/美团)
│   └── 生存技巧
│       ├── 语言障碍应对
│       ├── 医疗/药品指南
│       ├── 紧急情况处理
│       └── 文化礼仪注意事项
│
├── 🏙️ City Guides (SEO流量入口)
│   ├── Tier 1 城市 (北京/上海/成都/广州/深圳)
│   │   ├── 必去景点 + 门票信息
│   │   ├── 美食推荐 (含Affiliate餐厅链接)
│   │   ├── 住宿推荐 (含Booking/Trip.com affiliate)
│   │   ├── 交通攻略 (机场→市区/市内交通)
│   │   ├── 3天/5天推荐行程
│   │   └── AI 一键生成该城市行程
│   ├── Tier 2 城市 (西安/重庆/杭州/昆明/桂林...)
│   │   └── (同上，逐步覆盖)
│   └── 程序化生成城市页面 (V2)
│       └── "Best hotels in X" 模板化内容
│
├── 🛒 eSIM Deals (商业化页面)
│   ├── eSIM 对比 (Airalo / Holafly / 本地运营商)
│   ├── 按目的地选择eSIM
│   ├── 按天/流量选择eSIM
│   └── 一键购买 (Affiliate直链)
│
├── 🔧 工具
│   ├── 预算估算器
│   ├── 时差转换器
│   ├── 签证检查工具
│   └── 语言速查表 (PDF)
│
├── 📝 Blog (SEO内容 + 品牌)
│   ├── 旅行攻略文章
│   ├── 政策/签证更新
│   └── 用户故事/体验分享
│
├── 👤 用户系统 (V2/V3)
│   ├── 注册/登录 (Google OAuth / Email)
│   ├── 行程收藏/历史
│   ├── AI 使用配额管理
│   └── 会员订阅 (Stripe)
│
└── ⚙️ 管理后台
    ├── Affiliate 链路管理
    ├── SEO 内容管理
    ├── AI 提示词管理
    ├── 分析仪表盘
    └── n8n 工作流管理
```

### 3.2 MVP 功能矩阵 (V1)

| 功能 | 优先级 | 复杂度 | 预估工时 | 说明 |
|------|--------|--------|----------|------|
| AI Trip Planner | P0 | 高 | 5-7天 | 核心差异化功能 |
| AI 问答 | P0 | 中 | 3-5天 | RAG + 知识库 |
| 10篇 SEO 文章 | P0 | 低 | 2-3天 | AI生成 + 人工审核 |
| 3个城市页 | P0 | 中 | 2-3天 | 北京/上海/成都 |
| eSIM Affiliate 页 | P0 | 低 | 1天 | 对比 + 购买链 |
| VPN Affiliate 页 | P0 | 低 | 1天 | 对比 + 购买链 |
| 支付指南页 | P0 | 中 | 2天 | Alipay/WeChat Pay教程 |
| 交通指南页 | P0 | 中 | 2天 | 高铁/地铁/打车 |
| 首页 + 导航 | P0 | 低 | 1天 | 产品 Landing |
| 预算估算器 | P1 | 低 | 1天 | 辅助工具 |
| 语言速查PDF | P1 | 低 | 0.5天 | 可下载资源 |
| Analytics | P1 | 低 | 0.5天 | Google Analytics / PostHog |

---

## 4. AI 系统设计

### 4.1 AI Travel Planner - 技术架构

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI Trip Planner 流程                           │
│                                                                 │
│  User Input                                                     │
│  "7 days in China, first time, budget $2000"                    │
│       │                                                         │
│       ▼                                                         │
│  1. 意图识别 & 参数提取                                           │
│      ├── 天数: 7                                                │
│      ├── 城市: 未指定 (需要推荐)                                  │
│      ├── 预算: $2000                                            │
│      ├── 兴趣: general (首次)                                    │
│      └── 旅行风格: 未指定 (默认 balanced)                         │
│       │                                                         │
│       ▼                                                         │
│  2. 知识检索 (RAG)                                              │
│      ├── 从知识库检索城市信息、景点、交通数据                      │
│      ├── 从数据库检索当前可用Affiliate优惠                        │
│      └── 从外部API (可选) 获取天气/节日/事件                       │
│       │                                                         │
│       ▼                                                         │
│  3. Prompt 组装                                                 │
│      ├── System Prompt: 旅行规划专家角色                          │
│      ├── Context: 检索到的知识片段                                │
│      ├── Tools: 结构化输出定义 (JSON schema)                     │
│      └── User Input: 用户原始输入                                │
│       │                                                         │
│       ▼                                                         │
│  4. LLM 调用 (流式输出)                                         │
│      ├── OpenAI GPT-4.1-mini (快速生成)                          │
│      └── Claude Opus (复杂多城市规划, 长文优化)                   │
│       │                                                         │
│       ▼                                                         │
│  5. 结构化输出 & 渲染                                            │
│      ├── 每日行程 (结构化 JSON → 卡片渲染)                       │
│      ├── 推荐酒店 (含 Affiliate 链接)                            │
│      ├── 交通方案                                                │
│      ├── 预算明细                                                │
│      └── 必备工具推荐 (eSIM/VPN 链接)                            │
│       │                                                         │
│       ▼                                                         │
│  6. 缓存 & 后续操作                                              │
│      ├── 结果缓存到 Redis (相同输入直接返回)                      │
│      └── 用户可收藏/导出/分享 (V2)                              │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Prompt 工程结构

```typescript
// System Prompt 核心结构
const SYSTEM_PROMPT = `
你是一个专业的中国旅行规划专家。你的任务是:

## 角色定位
- 专精中国旅游，了解所有主要城市、景点、交通、文化
- 熟悉外国游客在中国旅行遇到的所有实际问题
- 始终从"第一次来中国的外国游客"角度思考

## 输出规范
请以结构化的 JSON 格式输出，包含:
- dailyPlan: 每日行程数组
- accommodation: 推荐住宿 (嵌入 affiliate 链接)
- transport: 城市间交通方案
- budget: 预估费用细分
- essentials: 必备工具推荐 (eSIM / VPN / App)
- tips: 该行程特别注意事项

## 商业化嵌入规则
- 在推荐酒店时使用 affiliate 链接格式: {{HOTEL_LINK:酒店名}}
- 在推荐 eSIM 时使用: {{ESIM_LINK:提供商名}}
- 仅在相关上下文中嵌入，不要硬塞

## 内容质量要求
- 每个推荐景点必须包含: 开放时间、门票价格、交通方式
- 每日行程需包含午餐/晚餐推荐
- 提供至少一个备选方案
`;
```

### 4.3 AI 问答系统 (RAG 架构)

```
用户问题 → "Can I use Google in China?"
    │
    ├─ 1. 问题分类 (Intent Classifier)
    │     └─ 类别: ["网络指南", "VPN", "常见问题"]
    │
    ├─ 2. 向量检索 (PGvector)
    │     ├─ 将问题转为 embedding (text-embedding-3-small)
    │     ├─ 在知识库中搜索 top-5 最相关片段
    │     └─ 返回: [chunk_id, content, source_url, similarity]
    │
    ├─ 3. 重排序 & 过滤
    │     ├─ 丢弃相似度 < 0.7 的结果
    │     └─ 按来源优先级排序
    │
    ├─ 4. Prompt 组装
    │     ├─ System: "你是一个中国旅行专家，基于以下资料回答问题"
    │     ├─ Context: 检索到的知识片段
    │     └─ Question: 用户问题
    │
    └─ 5. 流式输出
          ├─ 回答 + 来源引用
          └─ 相关文章链接 (SEO 导流)
```

### 4.4 知识库结构设计

```
knowledge_base/
│
├── manual/                    # 人工编写的高质量文章
│   ├── alipay-guide.md
│   ├── wechat-pay-guide.md
│   ├── china-train-guide.md
│   └── china-vpn-guide.md
│
├── ai_generated/              # AI 生成 + 人工审核
│   ├── city-guides/
│   │   ├── beijing.md
│   │   ├── shanghai.md
│   │   └── chengdu.md
│   └── topics/
│       └── ...
│
├── structured_data/           # 结构化数据 (程序化生成)
│   ├── hotels.csv
│   ├── attractions.csv
│   └── restaurants.csv
│
└── external/                  # 外部数据 (定期同步)
    └── ...
```

**文档分块策略：**

```
文档 → Headings 分割 → Chunk (512 tokens) → Overlap (128 tokens) → Embedding → PGvector
```

---

## 5. SEO 内容引擎架构

### 5.1 三层内容策略

```
┌─────────────────────────────────────────────────────────────┐
│                  三层内容金字塔                               │
│                                                             │
│   Tier 1: 旗舰内容 (人工 + AI辅助)                            │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  ├── China Travel Guide (终极指南, 10000+ words)    │   │
│   │  ├── China VPN Guide (高商业价值)                   │   │
│   │  ├── China eSIM Guide                              │   │
│   │  └── How to Use Alipay in China                    │   │
│   │  战略: 打造权威内容，获取外部链接                       │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   Tier 2: 城市指南 (AI生成 + 人工审核)                        │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  ├── Beijing Travel Guide                           │   │
│   │  ├── Shanghai Travel Guide                          │   │
│   │  ├── Chengdu Travel Guide                           │   │
│   │  └── ... (逐步扩展)                                 │   │
│   │  战略: 长尾关键词获取流量                               │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   Tier 3: 程序化内容 (n8n 自动生成)                          │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  ├── Best Hotels in Beijing                         │   │
│   │  ├── 3-Day Itinerary in Shanghai                    │   │
│   │  ├── How to Travel in Guangzhou                     │   │
│   │  └── ... (无限扩展)                                 │   │
│   │  战略: 规模化覆盖，量大取胜                              │   │
│   └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 程序化 SEO 引擎 (n8n 工作流)

```
n8n 工作流: "程序化 SEO 内容生成"

[定时触发] (每天)
    │
    ▼
[关键词列表] (Google Search Console 数据 + 关键词工具)
    │
    ├─ 1. 检查已存在的页面 (避免重复)
    │
    ├─ 2. Prompt 模板选择
    │     ├─ "Best hotels in [city]" → 酒店模板
    │     ├─ "[N]-day itinerary in [city]" → 行程模板
    │     └─ "How to travel in [city]" → 攻略模板
    │
    ├─ 3. AI 内容生成 (Claude/OpenAI)
    │     ├─ 标题 + Meta Description (SEO优化)
    │     ├─ 正文内容 (带结构)
    │     ├─ Affiliate 链接插入点
    │     └─ 内部链接策略
    │
    ├─ 4. 内容审核 (人工检查点)
    │     └─ Slack/Email 通知等待审核
    │
    └─ 5. 发布流程
          ├─ 写入 CMS (Sanity/Hygraph)
          ├─ 生成页面静态缓存
          └─ 提交到 Google Indexing API
```

### 5.3 关键词聚类架构

```
International Travel (高流量)
├── china travel guide
├── china visa 2026
└── best time to visit china

Payment (高商业价值)
├── how to use alipay as foreigner
├── best vpn for china
├── wechat pay without chinese bank
└── best esim for china

Transport (中等流量)
├── how to book china train tickets
├── china subway guide
└── didi in china for foreigners

City-Specific (长尾)
├── beijing great wall tour from city center
├── chengdu panda base tickets
└── shanghai bund hotels

Product/Comparison (高转化)
├── airalo vs holafly china
├── best hotels in beijing
└── nordvpn vs expressvpn china
```

### 5.4 SEO 技术实现

```
┌─────────────────────────────────────────────────────────────────┐
│                    SEO 技术实现方案                               │
│                                                                 │
│  1. SSR (Server-Side Rendering)                                 │
│     ├── Next.js App Router 默认 SSR                             │
│     ├── 动态页面 (AI 行程) 客户端渲染, 但 SEO fallback 提供静态内容 │
│     └── 静态页面 ISR (Incremental Static Regeneration)          │
│                                                                 │
│  2. 结构化数据 (Schema.org)                                     │
│     ├── Article (文章页)                                       │
│     ├── FAQPage (FAQ 页面)                                     │
│     ├── Product (eSIM / VPN 对比)                              │
│     ├── City (城市指南)                                         │
│     └── HowTo (教程类页面)                                      │
│                                                                 │
│  3. 元数据管理                                                  │
│     ├── next-seo / 自定义 metadata API                          │
│     ├── Open Graph / Twitter Cards                              │
│     ├── hreflang 标签 (多语言支持)                              │
│     └── canonical URL 处理                                      │
│                                                                 │
│  4. 性能优化                                                    │
│     ├── Core Web Vitals 达标                                    │
│     ├── LCP: 图片 WebP + lazy loading                          │
│     ├── CLS: 布局稳定性                                        │
│     └── INP: 交互响应                                          │
│                                                                 │
│  5. 内部链接策略                                                │
│     ├── 内容页底部自动推荐相关文章                               │
│     ├── 面包屑导航                                              │
│     └── AI 输出自动关联富链接                                   │
│                                                                 │
│  6. 监控                                                       │
│     ├── Google Search Console API (自动获取搜索数据)             │
│     ├── Rank tracking (可选, 初期手动)                          │
│     └── Indexing API (新页面自动提交)                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. 商业化系统设计

### 6.1 Affiliate 链路架构

```
┌─────────────────────────────────────────────────────────────────┐
│                   Affiliate 链路管理                             │
│                                                                 │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐   │
│  │  AI 行程生成   │     │  SEO 内容页   │     │  对比页面     │   │
│  │  (动态嵌入)   │     │  (静态嵌入)   │     │  (专门页)    │   │
│  └──────┬───────┘     └──────┬───────┘     └──────┬───────┘   │
│         │                    │                    │           │
│         ▼                    ▼                    ▼           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                Affiliate 链路管理中间层                    │   │
│  │                                                         │   │
│  │  功能:                                                   │   │
│  │  ├── 统一管理所有 Affiliate ID 和参数                     │   │
│  │  ├── A/B 测试不同链接                                    │   │
│  │  ├── 跟踪点击和转化                                      │   │
│  │  ├── 自动更新过期的链接                                  │   │
│  │  └── 避免链接硬编码在内容中 (方便批量更新)                 │   │
│  └─────────────────────┬───────────────────────────────────┘   │
│                        │                                       │
│                        ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    各 Partner API                        │   │
│  │  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐  │   │
│  │  │Booking  │ │Trip.com  │ │ Agoda    │ │ Airalo     │  │   │
│  │  │Affiliate│ │Affiliate │ │Affiliate  │ │Affiliate   │  │   │
│  │  └─────────┘ └──────────┘ └──────────┘ └────────────┘  │   │
│  │  ┌─────────┐ ┌──────────┐ ┌────────────┐              │   │
│  │  │NordVPN  │ │Express   │ │ Holafly    │              │   │
│  │  │         │ │VPN       │ │            │              │   │
│  │  └─────────┘ └──────────┘ └────────────┘              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 商业化嵌入策略 (按页面类型)

| 页面类型 | 嵌入方式 | 嵌入强度 | 示例 |
|----------|----------|----------|------|
| AI 行程 | 自然推荐 | ⭐⭐⭐ | "推荐入住王府井附近的XX酒店 [Book now]" |
| City Guide | 内链 + 对比 | ⭐⭐⭐ | "最佳住宿区域" 下面嵌入酒店列表 |
| Survival Guide | 解决方案推荐 | ⭐⭐ | "需要VPN? 推荐NordVPN [Get 68% off]" |
| 对比页 | 主内容 | ⭐⭐⭐⭐⭐ | eSIM对比表 + 购买按钮 |
| Blog | 上下文相关 | ⭐ | 在相关段落嵌入一个链接 |

### 6.3 点击流追踪

```
用户点击 Affiliate 链接
    │
    ├─ 1. 拦截点击事件 (onClick)
    │     ├─ 记录: link_id, page_url, timestamp, user_id (if logged in)
    │     ├─ 更新: 点击计数 (Redis计数器)
    │     └─ 发送: PostHog 事件
    │
    ├─ 2. 302 重定向 (通过中间页)
    │     ├─ /go/booking-hotel-123 → 302 → Booking.com
    │     ├─ 避免直接暴露 Affiliate ID (防止链接被篡改)
    │     └─ 记录转化数据 (如果 partner 支持)
    │
    └─ 3. 数据汇总
          ├─ 日/周/月报表 (PostHog)
          ├─ 收入预估仪表盘
          └─ Affiliate 优化建议 (哪些链接转化高)
```

---

## 7. 数据模型设计

### 7.1 核心实体关系概览

```
┌─────────────────┐       ┌──────────────────┐
│      User       │       │    Itinerary      │
├─────────────────┤       ├──────────────────┤
│ id              │       │ id               │
│ email           │       │ userId           │
│ name            │       │ title            │
│ provider        │──1:N──│ days             │
│ providerId      │       │ cities[]         │
│ createdAt       │       │ budget           │
│ subscriptionTier│       │ preferences      │
│ usageCount      │       │ content (JSON)   │
└─────────────────┘       │ createdAt        │
                           │ pdfExported      │
┌─────────────────┐       └──────────────────┘
│     Article     │
├─────────────────┤       ┌──────────────────┐
│ id              │       │   AffiliateLink   │
│ slug            │       ├──────────────────┤
│ title           │       │ id               │
│ content         │       │ partner          │
│ excerpt         │       │ linkType         │
│ category        │──M:N──│ url              │
│ city (nullable) │       │ trackingId       │
│ seoMeta (JSON)  │       │ commission       │
│ publishedAt     │       │ active           │
│ source (ai/man) │       │ clickCount       │
│ embedding       │       └──────────────────┘
└─────────────────┘
       │
       │ 1:N           ┌──────────────────┐
       └───────────────│  KnowledgeChunk   │
                       ├──────────────────┤
                       │ id               │
                       │ articleId        │
                       │ content          │
                       │ heading          │
                       │ embedding (vec)  │
                       │ source           │
                       │ chunkIndex       │
                       └──────────────────┘
```

### 7.2 核心表结构 (Prisma Schema 概览)

```prisma
// ⚠️ 以下为示意，不是最终正式代码

model User {
  id        String   @id @default(cuid())
  email     String?  @unique
  name      String?
  image     String?
  provider  String?  // "google" | "email"
  // Stripe 相关 (V3)
  stripeCustomerId String?
  subscriptionTier String? @default("free") // "free" | "pro"
  // 使用量
  aiUsageCount Int @default(0)
  createdAt    DateTime @default(now())
  itineraries  Itinerary[]
}

model Article {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  content     String   // Markdown 或 JSON
  excerpt     String?
  category    String   // "survival" | "city-guide" | "blog" | "affiliate"
  citySlug    String?  // 关联城市 (可为 null)
  // SEO 元数据
  metaTitle       String?
  metaDescription String?
  ogImage         String?
  // 结构化数据 JSON
  schemaJson Json?
  // 来源
  source    String   @default("ai") // "ai" | "manual"
  status    String   @default("draft") // "draft" | "published"
  // 多语言
  locale    String   @default("en")
  // 时间戳
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  // 关联
  affiliateLinks AffiliateLinkOnArticle[]
  knowledgeChunks KnowledgeChunk[]
}

model City {
  slug        String   @id
  name        String
  nameZh      String?  // 中文名
  country     String   @default("China")
  tier        Int      @default(2) // 1=旗舰, 2=次要
  description String?
  // 结构化数据
  coordinates Json?    // { lat, lng }
  // 流量相关
  searchVolume Int?    // 月搜索量预估
  articles     Article[]
}

model AffiliateLink {
  id          String   @id @default(cuid())
  partner     String   // "booking" | "trip.com" | "airalo" | "nordvpn"
  linkType    String   // "hotel" | "esim" | "vpn" | "tour"
  displayText String?
  url         String   // 原始 URL (不带 tracking)
  trackingUrl String   // 生成的 tracking URL
  commission  Float?   // 佣金比例
  active      Boolean  @default(true)
  clickCount  Int      @default(0)
  articles    AffiliateLinkOnArticle[]
}

model KnowledgeChunk {
  id        String   @id @default(cuid())
  content   String
  heading   String?
  // 向量嵌入 (PGvector)
  embedding Unsupported("vector(1536)")?
  // 元数据
  articleId   String?
  article     Article?   @relation(fields: [articleId], references: [id])
  source      String     // "manual" | "ai" | "structured"
  chunkIndex  Int
  createdAt   DateTime @default(now())
}

model Itinerary {
  id         String   @id @default(cuid())
  userId     String?
  user       User?    @relation(fields: [userId], references: [id])
  // 输入
  title      String
  days       Int
  cities     String[] // ["beijing", "shanghai"]
  budget     Float?
  preferences Json?   // 兴趣标签
  // 输出 (AI 生成结果缓存)
  content    Json     // 完整的行程 JSON
  // 追踪
  sourcePage String?  // 从哪个页面发起的
  createdAt  DateTime @default(now())
}
```

---

## 8. API 设计

### 8.1 API 路由规划 (Next.js App Router)

```
/api
│
├── /ai
│   ├── POST /trip-planner          # AI 行程生成
│   ├── POST /qa                    # AI 问答 (RAG)
│   └── POST /suggest              # AI 输入建议 (自动补全城市/兴趣)
│
├── /itineraries
│   ├── GET   /                    # 获取用户的行程列表
│   ├── GET   /[id]                # 获取单个行程
│   ├── POST  /                    # 保存行程
│   ├── PUT   /[id]                # 更新行程
│   └── DELETE /[id]               # 删除行程
│
├── /articles
│   ├── GET   /                    # 文章列表 (分页+筛选)
│   ├── GET   /[slug]              # 单篇文章
│   └── GET   /by-city/[citySlug]  # 按城市获取文章
│
├── /affiliate
│   ├── POST /click               # 记录点击事件 (客户端上报)
│   └── GET  /stats               # 统计数据 (管理后台)
│
├── /search
│   ├── GET /articles             # 全文搜索文章
│   └── GET /cities               # 城市搜索 (自动补全)
│
├── /auth
│   ├── POST /register            # 注册
│   ├── POST /login               # 登录 (Google OAuth)
│   └── POST /logout              # 登出
│
└── /webhooks
    ├── POST /n8n                 # n8n 发布回调
    └── POST /stripe              # Stripe 支付回调 (V3)
```

### 8.2 核心 API 接口规范

**AI Trip Planner:**

```typescript
POST /api/ai/trip-planner
Content-Type: application/json

{
  "query": "7 days in China, first time, budget $2000",
  "cities": ["beijing", "shanghai"],     // 可选, 不指定则 AI 推荐
  "interests": ["culture", "food"],      // 可选
  "locale": "en",
  "sessionId": "abc123"                  // 可选, 用于对话上下文
}

Response (SSE - Server Sent Events):
data: {"type": "thinking", "content": "正在为您规划..."}
data: {"type": "day", "day": 1, "content": {...}}
data: {"type": "hotel", "content": {...}}
data: {"type": "complete", "itineraryId": "xxx"}
```

**AI Q&A:**

```typescript
POST /api/ai/qa
Content-Type: application/json

{
  "question": "Can I use Google in China?",
  "sessionId": "abc123"
}

Response (SSE):
data: {"type": "answer", "content": "在中国无法直接使用Google..."}
data: {"type": "sources", "articles": [
  {"slug": "china-vpn-guide", "title": "Best VPN for China"}
]}
data: {"type": "complete"}
```

**Affiliate Click Tracking:**

```typescript
POST /api/affiliate/click
Content-Type: application/json

{
  "linkId": "link_abc123",
  "pageUrl": "/beijing-guide",
  "position": "content-body"
}

Response:
{
  "redirectUrl": "https://booking.com/...?affiliate_id=xxx",
  "trackingId": "track_xxx"
}
```

---

## 9. 部署与运维

### 9.1 部署架构 (V1 MVP)

```
┌─────────────────────────────────────────────────────────────────┐
│                      Vercel (Web 部署)                          │
│                                                                 │
│  ├── Next.js App (SSR + API Routes)                            │
│  ├── Edge Functions (重定向 / A/B 测试)                         │
│  ├── Vercel Analytics                                          │
│  └── Vercel KV (Redis) + Vercel Postgres                       │
│                                                                 │
│  Verge: 全球边缘网络, 自动 CDN, 零运维                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      n8n (自动化平台)                            │
│                                                                 │
│  ├── 自托管 (Render / Railway / Fly.io)                        │
│  ├── SEO 内容批量生成工作流                                     │
│  ├── 数据同步 (CMS ↔ DB)                                       │
│  └── Affiliate 链接管理                                        │
│                                                                 │
│  成本: $5-20/月                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      AI 服务                                     │
│                                                                 │
│  ├── OpenAI API (GPT-4.1-mini + text-embedding-3-small)         │
│  ├── Claude API (长文生成备用)                                  │
│  └── 全部走 API, 无需自托管模型                                  │
│                                                                 │
│  成本: 按量付费, MVP 预估 $50-200/月                            │
└─────────────────────────────────────────────────────────────────┘
```

### 9.2 成本预估 (月度)

| 项目 | MVP (V1) | V2 (增长期) | V3 (规模化) |
|------|----------|-------------|-------------|
| Vercel (Pro) | $20 | $50-$100 | $200+ |
| PostgreSQL | $0 (Vercel Postgres Hobby) | $15 | $50+ |
| Redis | $0 (Vercel KV Hobby) | $15 | $50+ |
| OpenAI API | $50 | $200 | $500+ |
| n8n 自托管 | $7 (Render) | $15 | $30+ |
| CMS (Sanity) | $0 (Free tier) | $25 | $50+ |
| 域名 + 邮箱 | $15 | $15 | $15 |
| **总计** | **~$100/月** | **~$350/月** | **~$900/月** |

### 9.3 开发环境

```yaml
# 开发环境配置 (概念)
version: 1.0
environment:
  local:
    - Next.js dev server (localhost:3000)
    - PostgreSQL (Docker / 本地)
    - Redis (Docker / 本地)
    - n8n (Docker)
    
  preview:
    - Vercel Preview Deploy (每个 PR 自动部署)
    - Vercel Postgres (preview DB)
    
  production:
    - Vercel Production (主域名)
    - Vercel Postgres (生产 DB)
    - n8n (生产实例, Render)
```

---

## 10. 分阶段实施路线图

### Phase 1: MVP (2-4周) 🚀

```
Week 1: 基础搭建
├── Next.js 项目初始化 + Tailwind + shadcn/ui
├── Prisma + PostgreSQL 数据模型
├── 首页 + 导航结构
├── SEO 基础 (metadata, sitemap, robots.txt)
└── Vercel 部署

Week 2: AI 核心
├── AI Trip Planner (Vercel AI SDK + OpenAI)
├── 流式输出 + 结构化 JSON 渲染
├── RAG 知识库初始化 (5篇基础文章)
├── AI Q&A
└── 输入自动补全

Week 3: 内容 + 商业化
├── 10篇 SEO 文章 (AI生成 + 人工审核)
├── 北京/上海/成都城市页
├── eSIM 对比页 (Airalo / Holafly)
├── VPN 对比页 (NordVPN / ExpressVPN)
├── 支付指南页
├── 交通指南页
└── Affiliate 链路系统

Week 4: 优化 + 上线
├── 预算估算器工具
├── 性能优化 (Core Web Vitals)
├── 结构化数据 (Schema.org)
├── n8n 自动化流程 (内容批量生成)
├── Google Search Console 接入
└── 正式上线
```

### Phase 2: 增长 (2-3个月)

```
├── 程序化 SEO (n8n 批量内容)
├── 扩展到 10+ 城市页
├── 多语言 (日/韩/东南亚语)
├── Dify AI 问答 (降低维护成本)
├── Google Indexing API 自动提
├── A/B 测试 (Affiliate 链路)
└── 用户系统 (Google OAuth)
```

### Phase 3: 产品化 (3-6个月)

```
├── 用户收藏 + 历史行程
├── AI 会员订阅 (Stripe)
│   ├── Free: 3次/月
│   ├── Pro: 无限 + PDF导出
│   └── Premium: 高级路线 + 离线指南
├── PDF 行程导出
├── PWA 支持
├── SEO 内容自动发布到第三方平台
└── Native App (Flutter / React Native)
```

---

## 附录: 关键技术决策记录

### 决策 1: Next.js 而非 WordPress
- **理由**: AI 原生场景, 动态交互, API 统一, 部署简单
- **代价**: 内容编辑团队需要适应, 无现成 SEO 插件

### 决策 2: PostgreSQL + PGvector 而非 Pinecone
- **理由**: MVP 阶段减少基础设施复杂度, 一个数据库解决
- **当考虑切换**: 知识库 > 10 万条 chunks 时考虑独立向量库

### 决策 3: Vercel AI SDK 而非 LangChain
- **理由**: 与 Next.js 深度集成, 流式输出原生支持, API 简洁
- **LangChain 的角色**: 仅用于 prompt 模板管理与复杂 chain

### 决策 4: Sanity CMS 而非 WordPress Headless
- **理由**: 原生前端框架友好, 支持实时预览, 国际化内置
- **当考虑切换**: 编辑团队需要成熟 WYSIWYG 时

### 决策 5: Affiliate 中间页 (302 重定向)
- **理由**: 不暴露 affiliate ID, 可跟踪点击, 可批量更换 partner
- **实现**: /go/[link-slug] → 302 → affiliate URL

---

> 本文档是 GoChinaPass 产品的完整架构设计, 用于指导后续开发。
> 每个模块在实际实现时可根据实际情况调整。
> 核心原则: MVP 快的优先, 后续迭代优化。
