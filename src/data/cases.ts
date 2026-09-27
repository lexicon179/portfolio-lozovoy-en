/**
 * ЕДИНЫЙ ИСТОЧНИК ПРАВДЫ ПО КЕЙСАМ (EN).
 *
 * Все тексты — дословно с Framer (incomplete-sphinx-085771.framer.app),
 * без перевода. Источник: assets/framer/_not-images/searchIndex-7oQTbrZPIMWP.json.
 * Порядок и «Избранное» — как на Framer (/work и главная).
 *
 * Как добавить новый кейс:
 *   1. Скопируй любой объект ниже, поменяй поля.
 *   2. `slug` — латиницей, без пробелов. Это адрес страницы: /case/<slug>.
 *   3. `featured: true` — кейс попадёт в «Избранное» на главной.
 *      На странице /projects всегда видны все кейсы.
 *   4. Картинки: положи оригиналы в assets/framer, добавь имена в
 *      scripts/prepare-media.mjs и запусти `npm run media` — он сам
 *      сделает 1x и 2x в public/media/<slug>/ и приведёт к JPEG.
 *   5. `npm run build` — и заливай dist.
 *
 * Порядок в массиве = порядок на сайте.
 */

export type CaseMetric = {
  /** Крупная цифра: «647K», «+21%», «15K». Суммы в деньгах не публикуем. */
  value: string;
  /** Подпись под цифрой */
  label: string;
};

export type CaseMedia = {
  /** Путь из /public, ширина 880px */
  src: string;
  /** Он же в 1760px, для экранов 2x */
  src2x: string;
  /** Описание для незрячих и на случай, если картинка не загрузилась */
  alt: string;
  /** Подпись под изображением */
  caption?: string;
  /** Ссылка на оригинальный пост. Пусто — кнопки не будет. */
  href?: string;
  /** Точка фокуса при обрезке (object-position). Пусто — центр. */
  focus?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** Одна строка о проекте — на карточке и в шапке кейса. */
  summary: string;
  /** Главная цифра на карточке */
  headline: string;
  role: string;
  period: string;
  /** Обложка на карточке в «Избранном» и в списке проектов */
  cover: CaseMedia;
  /** Раздел «Челлендж» */
  challenge: string;
  /** Метрики крупными блоками на странице кейса */
  metrics: CaseMetric[];
  /** Раздел «Что я сделал» — буллеты */
  whatIDid: string[];
  /** Раздел «Хайлайты» — вертикальная лента. У коротких кейсов его нет. */
  gallery?: CaseMedia[];
  /** Сноска под хайлайтами: юридические пометки и оговорки */
  footnote?: string;
  /** Внешняя ссылка на проект. Пусто → кнопка не показывается. */
  link?: string;
  featured: boolean;
  /** Короткие теги на карточке */
  tags?: string[];
};

/**
 * Все слоты 16:10 с обрезкой по слоту — как на Framer.
 * Картинки лежат в JPEG (см. npm run media).
 */

/**
 * Точки фокуса, заданные на Framer. Остальные картинки режутся по центру.
 */
const FOCUS: Record<string, string> = {
  'dich-04': '65.9% 15.8%',
  'dich-05': '4% 6%',
  'dich-06': '4.7% 9.6%',
};

/**
 * На Framer у картинок нет alt, поэтому alt берём из той же подписи
 * с Framer, а у обложки — название кейса.
 */
const media = (
  slug: string,
  n: number,
  caption: string,
  href?: string
): CaseMedia => {
  const id = `${slug}-${String(n).padStart(2, '0')}`;
  const base = `/media/${slug}/${id}`;
  return {
    src: `${base}.jpg`,
    src2x: `${base}@2x.jpg`,
    alt: caption,
    caption: n === 1 ? undefined : caption,
    href,
    focus: FOCUS[id],
  };
};

export const cases: CaseStudy[] = [
  {
    slug: 'main',
    title: 'MAIN',
    summary: 'AI-native DEX for agentic finance on Base',
    headline: '0→3K community · 647K impressions · 100K whitelist',
    role: 'Community Manager → Community Lead · Contract, full-time',
    period: 'Apr 2025 – May 2026',
    cover: media('main', 1, 'MAIN'),
    challenge:
      'Define MAIN’s voice in agentic finance, a new category with no established playbook',
    metrics: [
      { value: '3K', label: 'Farcaster followers' },
      { value: '647K', label: 'Impressions' },
      { value: '100K', label: 'Whitelist signups' },
      { value: '20K+', label: 'Top reply views' },
    ],
    whatIDid: [
      'Grew Farcaster from 0 to 3K via a whitelist form built with a developer; ran a **100K**-**user** whitelist and earned protocol airdrops including **Monad**',
      'Ran the main **X** **account** (8.8K followers) to **647K** impressions; reply strategy hit **20K**+ views per reply',
      'Cut content costs roughly **10x** by making viral videos with AI for about $3 each; optimized **KOL** spend through tracked negotiation and closed every partnership at zero cost',
      'Ran a **KOL** and contractor network, secured a **Nansen** promo code, and recovered the account from a shadowban. **Partners**: HeyElsa, Synthdata, SurfAI, OpenLedger, Lagrange',
    ],
    gallery: [
      media('main', 2, 'X account analytics · 647K impressions over 12 months'),
      media(
        'main',
        3,
        'MAIN as the execution layer for agent finance (thread)',
        'https://x.com/MAIN_AI_DEX/status/2045135924590526712'
      ),
      media(
        'main',
        4,
        "Announcing MAIN's MCP integration",
        'https://x.com/MAIN_AI_DEX/status/2039744351400800484'
      ),
      media(
        'main',
        5,
        "Mapping the x402 economy for Coinbase's ecosystem",
        'https://x.com/MAIN_AI_DEX/status/2031058986326438168'
      ),
      media(
        'main',
        6,
        'AMA with OpenLedger · built a reusable template for all partner AMAs',
        'https://x.com/MAIN_AI_DEX/status/2013627995723038841'
      ),
      media(
        'main',
        7,
        'Announcing HeyElsa x MAIN integration',
        'https://x.com/MAIN_AI_DEX/status/2017221380010639646'
      ),
      media('main', 8, 'Community meme'),
    ],
    link: 'https://main.exchange/',
    featured: true,
  },
  {
    slug: 'pill',
    title: 'PILL',
    summary:
      'Community-driven product on Base with a Farcaster mini-app',
    headline: '15K daily active users',
    role: 'Head of Growth',
    period: 'Feb 2024 – May 2025',
    cover: media('pill', 1, 'PILL'),
    challenge:
      'Build something durable on Base, where most launches fade within weeks',
    metrics: [
      { value: '15K', label: 'Daily active users' },
      { value: '$120K', label: 'RAISED AT LAUNCH' },
      { value: '60K', label: 'NFTS SOLD' },
      { value: '20K', label: 'COMMUNITY AT PEAK' },
    ],
    whatIDid: [
      'Raised **$120K** at launch via Party and sold **60K NFTs**; the project peaked at **$800K market cap** with **$200K daily volume**',
      'Shipped a Farcaster mini-app that reached **15K daily active users** at peak, plus an **AI agent** posting daily across X and Farcaster in early 2025, **ahead** of the **agent** **narrative**',
      'Built **brand**, tone of voice, and content guidelines from scratch; **led** **a team** **of** **four** (two community managers, a developer, a designer)',
      'Ran **KOL** campaigns, AMAs, and CEX listings (CoinGecko-listed); closed all partnerships at zero cost, including **GLOOM** and **Guild**. Worked across **Base, Optimism, Clanker, Zora**',
      'Grew the community to **20K** at peak and managed FUD through market volatility',
    ],
    gallery: [
      media('pill', 2, 'X analytics. Most of the traction came from Farcaster.'),
      media('pill', 3, 'Farcaster: where the community actually lived'),
      media('pill', 4, 'Mini-app interface · 15K daily active users at peak'),
      media('pill', 5, 'In-app rules · designed to get users playing in seconds'),
      media('pill', 6, 'End of Season 1 · retention hook for Season 2'),
      media('pill', 7, 'Leaderboard mechanic · what kept users coming back'),
      media('pill', 8, 'PSY · autonomous content agent, running since early 2025'),
      media('pill', 9, 'Airdrop FAQ · getting ahead of the question flood'),
      media('pill', 10, 'CoinGecko listing'),
      media('pill', 11, '420-piece main collection sold out in seconds'),
    ],
    featured: true,
  },
  {
    slug: 'algebra-finance',
    title: 'Algebra Finance',
    summary:
      "EVM's leading DEX infrastructure with deep liquidity efficiency and modular architecture for scalable DeFi",
    headline: 'Viral AI video · 10x cheaper production',
    role: 'Content & Video Production · Contract',
    period: 'Apr 2025 – May 2026',
    cover: media('algebra-finance', 1, 'Algebra Finance'),
    challenge:
      'Make technical DeFi features shareable for a broader audience.',
    metrics: [
      { value: '635K', label: 'Impressions' },
      { value: '24K', label: 'Account Size' },
      { value: '2.3%', label: 'Engagement rate' },
      { value: '~$3', label: 'Cost per video' },
    ],
    whatIDid: [
      "Produced content for the project's X account (24K followers) during a period of 635K impressions and 2.3% ER",
      'Produced viral video content with **Seedance** and **Veo3** for about $3 per piece against studio rates',
      'Launched the project’s **Farcaster** account as a new distribution channel',
      'Worked with **Avalanche**, **Arbitrum**, **Polygon**',
    ],
    gallery: [
      media('algebra-finance', 2, 'X account analytics'),
      media(
        'algebra-finance',
        3,
        'DeFi Spring campaign with QuickSwap and Kittenswap',
        'https://x.com/CryptoAlgebra/status/2037515107350319182'
      ),
      media(
        'algebra-finance',
        4,
        'Algebra infrastructure launch on Avalanche L1s',
        'https://x.com/CryptoAlgebra/status/2046264745817485595'
      ),
      media(
        'algebra-finance',
        5,
        'AI agents and OpenClaw narrative video',
        'https://x.com/CryptoAlgebra/status/2030252198035427465'
      ),
      media(
        'algebra-finance',
        6,
        'Vitalik-themed community video',
        'https://x.com/CryptoAlgebra/status/2037862366902403107'
      ),
      media(
        'algebra-finance',
        7,
        'Trend-driven VHS edit',
        'https://x.com/CryptoAlgebra/status/2040821871667740869'
      ),
      media(
        'algebra-finance',
        8,
        'QuickSwap x Algebra integration announcement',
        'https://x.com/CryptoAlgebra/status/2013281199381504376'
      ),
    ],
    featured: true,
  },
  {
    slug: 'dich',
    title: 'DICH',
    summary:
      'Fashion night-show brand in Moscow, built around live performances and a distinct aesthetic',
    headline: '1,000+ guests · +21% margin',
    role: 'CMO · Side project',
    period: 'Apr 2026 – Present',
    cover: media('dich', 1, 'DICH'),
    challenge:
      'Fill a venue and build a brand from scratch, on organic reach alone',
    metrics: [
      { value: '375', label: 'GUESTS AT FIRST EVENT' },
      { value: '430K', label: 'VIEWS ACROSS EVENTS' },
      { value: '+21%', label: 'MARGIN, ZERO AD SPEND' },
      { value: '92%', label: 'NON-FOLLOWERS REACHED' },
    ],
    whatIDid: [
      "Led **marketing** and **PR** for the brand's launch and its first three events this summer",
      'First event: **375 guests** on organic reach alone, **zero ad spend**, at **+21% margin**',
      'Drove **430K views** and reached **110K accounts** over the period, **92% non-followers**, building the brand from scratch',
      'Owned content, positioning, and partner outreach; brought in brand partners and media figures',
      "Ran the event's pop-up program, one partner made back **10x** in a single night",
    ],
    gallery: [
      media(
        'dich',
        2,
        'Instagram analytics · 430K views, 92% non-followers over 90 days',
        'https://www.instagram.com/dichnight/'
      ),
      media(
        'dich',
        3,
        'Activated a 100K-follower creator · built a new format that brings known names into Moscow nightlife',
        'https://www.instagram.com/p/DXhQ_MJiNG9/'
      ),
      media(
        'dich',
        4,
        "Turned a 3.2M-follower page's admin into a DJ · a new role for a big name",
        'https://www.instagram.com/p/DZfjd-UiAdp/'
      ),
      media(
        'dich',
        5,
        'Built brand offers and placements, closed partnerships with fashion labels'
      ),
      media(
        'dich',
        6,
        'Built partnership decks and offers, ran brand negotiations, and closed deals'
      ),
      media(
        'dich',
        7,
        'Curated an art show with in-demand contemporary artists inside the event',
        'https://www.instagram.com/p/DbdcnhkCGob/'
      ),
    ],
    featured: true,
  },

  // ——— Короткие кейсы: тот же шаблон, меньше полей. ———

  {
    slug: 'talent-protocol',
    title: 'Talent Protocol',
    summary: 'Onchain professional reputation network',
    headline: '500+ retweets on one CTA',
    role: 'Community Specialist · Part-time',
    period: 'May 2024 – Feb 2025',
    cover: media('talent-protocol', 1, 'Talent Protocol'),
    challenge:
      'Support a token launch while keeping the community engaged for the long run',
    metrics: [{ value: '500+', label: 'Retweets on one CTA' }],
    whatIDid: [
      'Ran Discord moderation and community content',
      'Worked with clients including Coinbase, Binance, and Zora',
    ],
    featured: false,
  },
  {
    slug: 'yandex-practicum',
    title: 'Yandex Practicum',
    summary: 'Largest online education platform in the CIS',
    headline: '10% cold-outreach conversion',
    role: 'Business Development Manager · Full-time',
    period: 'Sep 2023 – May 2024',
    cover: media('yandex-practicum', 1, 'Yandex Practicum'),
    challenge:
      'Build a cold B2B pipeline from scratch and close the ones worth real money',
    metrics: [{ value: '10%', label: 'Cold-outreach conversion' }],
    whatIDid: [
      'Ran full-cycle B2B partner acquisition as part of the hunter team, consistently above target',
      'Owned proposals, quotes, and product feedback to product managers',
    ],
    featured: false,
  },
  {
    slug: 'cleverbots',
    title: 'Cleverbots',
    summary:
      'B2B AI solutions provider (chatbots, conversational AI, computer vision)',
    headline: 'Tier-1 enterprise clients',
    role: 'Business Development Manager · Full-time',
    period: 'Oct 2022 – Sep 2023',
    cover: media('cleverbots', 1, 'Cleverbots'),
    challenge:
      'Sell enterprise AI adoption years before the AI hype made it easy',
    metrics: [{ value: 'Tier-1', label: 'Enterprise clients' }],
    whatIDid: [
      'Sold AI products to decision-makers at large enterprises including Philip Morris, Colgate, and Sanofi',
      'Ran the full sales cycle from OSINT-based lead hunting to close; upsold existing clients',
    ],
    featured: false,
  },
  {
    slug: 'cyberconnect',
    title: 'CyberConnect',
    summary: 'Web3 social graph protocol',
    headline: '4.6K community · 100+ AMAs',
    role: 'Community Specialist · Part-time',
    period: 'Sep 2022 – May 2023',
    cover: media('cyberconnect', 1, 'CyberConnect'),
    challenge:
      'Open up the CIS market for a protocol that had no presence there',
    metrics: [
      { value: '4.6K', label: 'Community' },
      { value: '100+', label: 'AMAs' },
    ],
    whatIDid: [
      'Grew the CIS community to 4,600 and hosted 100+ AMAs',
      'Secured 10+ partnerships; created and localized content',
    ],
    featured: false,
  },
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    summary: 'Affiliate and agency performance campaigns',
    headline: '76% ROI · -25% cost per lead',
    role: 'Targeting, creative, analytics · Freelance and agencies',
    period: '2021 – 2023',
    cover: media('performance-marketing', 1, 'Performance Marketing'),
    challenge:
      'Pull traffic from every source and squeeze the highest ROI out of every dollar',
    metrics: [
      { value: '76%', label: 'ROI' },
      { value: '-25%', label: 'Cost per lead' },
    ],
    whatIDid: [
      'Hit 76% ROI on affiliate campaigns (UAE goods)',
      'Grew leads 30-50% per month and cut cost per lead 25% for agency clients',
      'Ran Instagram, VK, Facebook, and TikTok ad accounts with A/B testing',
    ],
    featured: false,
  },
  {
    slug: 'earlier-crypto-roles',
    title: 'Earlier crypto roles',
    summary: 'Early CIS community and content work across Web3 projects',
    headline: '$1M token sale · $300K item sales',
    role: 'Community & content · Part-time',
    period: '2020 – 2022',
    cover: media('earlier-crypto-roles', 1, 'Earlier crypto roles'),
    challenge:
      'Break into the CIS market for global Web3 projects that had zero presence there',
    metrics: [
      { value: '$1M', label: 'Token sale' },
      { value: '$300K', label: 'Item sales' },
    ],
    whatIDid: [
      'Thetan Arena: grew CIS community from 200 to 5,000 and drove $300K+ in item sales',
      'Fantom Starter: grew from 60 to 1,200 and supported a $1M token sale',
      'Olympus DAO: built the CIS branch from scratch',
    ],
    gallery: [
      media(
        'earlier-crypto-roles',
        2,
        'Grew a CIS community from 200 to 5,000 and drove $300K+ in item sales',
        'https://thetanarena.com/#home'
      ),
      media(
        'earlier-crypto-roles',
        3,
        'Grew the CIS community 60 to 1,200 and supported a $1M token sale',
        'https://vg.linkedin.com/company/fantomstarter'
      ),
    ],
    link: 'https://olympusdao.medium.com/dai-bonds-a-more-effective-sales-mechanism-c9a57586f1f7',
    featured: false,
  },
  {
    slug: 'personal-brand-tiktok',
    title: 'Personal Brand (TikTok)',
    summary: 'Lifestyle blog built from scratch',
    headline: '1M+ views peak month',
    role: 'Creator · Lifestyle (side project)',
    period: '2024 – Present',
    cover: media('personal-brand-tiktok', 1, 'Personal Brand (TikTok)'),
    challenge: 'Start a media presence from zero and actually break through',
    metrics: [{ value: '1M+', label: 'Views peak month' }],
    whatIDid: [
      'Built the blog from zero',
      'Top videos hit 300K-800K views, with a peak month over 1M',
    ],
    gallery: [
      media(
        'personal-brand-tiktok',
        2,
        'A year of organic reach · active advertisers on board',
        'https://www.tiktok.com/@aslantheangel'
      ),
    ],
    featured: false,
  },
];

export const featuredCases = cases.filter((c) => c.featured);

export const getCaseBySlug = (slug: string) =>
  cases.find((c) => c.slug === slug);

/** Следующий кейс по кругу — для навигации внизу страницы кейса. */
export const getNextCase = (slug: string) => {
  const i = cases.findIndex((c) => c.slug === slug);
  if (i === -1) return undefined;
  return cases[(i + 1) % cases.length];
};
