import { prisma } from "./prisma";

export const FALLBACK_CASINOS = [
  {
    id: "bitstarz",
    name: "BitStarz Casino",
    slug: "bitstarz",
    logoUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=160&auto=format&fit=crop&q=80",
    rating: 9.8,
    safetyIndex: 9.9,
    safetyTier: "VERY_HIGH",
    status: "ACTIVE",
    isNew: true,
    establishedYear: 2014,
    license: "Curacao Gaming Control Board",
    minDeposit: "$10",
    payoutSpeed: "Instant (Average 10 mins)",
    withdrawalLimit: "$100,000 / month",
    supportTypes: "24/7 Live Chat, Telegram",
    websiteUrl: "https://www.bitstarz.com",
    affiliateUrl: "https://www.bitstarz.com/?ref=demo_affiliate",
    allowedCountries: ["US", "CA", "DE", "AU", "NZ", "BR", "GLOBAL"],
    pros: JSON.stringify([
      "Industry-leading 10-minute average withdrawal times",
      "Over 4,500+ premium slots and live dealer games",
      "Multiple Casinomeister Best Casino Awards",
      "Crypto and credit card friendly",
    ]),
    cons: JSON.stringify([
      "Restricted in UK and certain state jurisdictions",
      "No sportsbook section",
    ]),
    summary:
      "BitStarz is widely considered the gold standard for hybrid crypto/fiat gaming with flawless payout history and stellar customer support.",
    fullReview:
      "BitStarz was launched in 2014 and has established an immaculate track record of timely player payouts, fair dispute resolution, and rigorous game audits. Their average withdrawal time of under 10 minutes sets a benchmark in the iGaming community. With over 4,500 games from tier-1 studios like Pragmatic Play and Evolution, BitStarz consistently earns accredited status on top watchdog boards.",
    featured: true,
    cryptoFriendly: true,
    vpnFriendly: true,
    bonuses: [
      {
        id: "b1",
        title: "5 BTC or $500 Welcome Package + 180 Free Spins",
        type: "WELCOME",
        bonusCode: "STARZVIP",
        minDeposit: "$20",
        wagering: "40x",
        maxCashout: "Unlimited",
        exclusive: true,
        claimUrl: "https://www.bitstarz.com/?ref=demo_affiliate",
        terms: "18+ only. Wagering requirement applies to bonus amount.",
      },
      {
        id: "b2",
        title: "20 No Deposit Free Spins on Registration",
        type: "NO_DEPOSIT",
        bonusCode: null,
        minDeposit: "$0",
        wagering: "40x",
        maxCashout: "$100",
        exclusive: false,
        claimUrl: "https://www.bitstarz.com/?ref=demo_affiliate",
        terms: "Email verification required.",
      },
    ],
  },
  {
    id: "stake",
    name: "Stake Casino",
    slug: "stake",
    logoUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=160&auto=format&fit=crop&q=80",
    rating: 9.7,
    safetyIndex: 9.7,
    safetyTier: "VERY_HIGH",
    status: "ACTIVE",
    isNew: true,
    establishedYear: 2017,
    license: "Curacao eGaming",
    minDeposit: "No Minimum",
    payoutSpeed: "Instant (Automated On-Chain)",
    withdrawalLimit: "Unlimited",
    supportTypes: "24/7 Live Support",
    websiteUrl: "https://stake.com",
    affiliateUrl: "https://stake.com/?c=demo_affiliate",
    allowedCountries: ["US", "CA", "DE", "AU", "BR", "GLOBAL"],
    pros: JSON.stringify([
      "Zero withdrawal limits and instant crypto payouts",
      "Exclusive Stake Originals with verifiable provably fair seeds",
      "Generous VIP rake-back and daily reload bonuses",
    ]),
    cons: JSON.stringify([
      "Strictly cryptocurrency focused",
      "Limited traditional welcome bonus structure",
    ]),
    summary:
      "The undisputed titan of crypto gambling with zero cashout limits, provably fair originals, and rapid community engagement.",
    fullReview:
      "Stake revolutionized crypto gambling by introducing true provably fair algorithms alongside mainstream studio partnerships. With instant withdrawals and zero withdrawal caps, high rollers and casual players alike praise its transparency.",
    featured: true,
    cryptoFriendly: true,
    vpnFriendly: false,
    bonuses: [
      {
        id: "b3",
        title: "200% Deposit Match up to $1,000 + 10% Instant Rakeback",
        type: "WELCOME",
        bonusCode: "VIPSTAKE",
        minDeposit: "$50",
        wagering: "40x",
        maxCashout: "No Limit",
        exclusive: true,
        claimUrl: "https://stake.com/?c=demo_affiliate",
        terms: "Wager requirement covers deposit + bonus.",
      },
    ],
  },
  {
    id: "leovegas",
    name: "LeoVegas",
    slug: "leovegas",
    logoUrl: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=160&auto=format&fit=crop&q=80",
    rating: 9.5,
    safetyIndex: 9.8,
    safetyTier: "VERY_HIGH",
    status: "ACTIVE",
    isNew: false,
    establishedYear: 2012,
    license: "Malta Gaming Authority (MGA) & UKGC",
    minDeposit: "€10",
    payoutSpeed: "12 - 24 hours",
    withdrawalLimit: "€50,000 / month",
    supportTypes: "24/7 Live Chat & Phone Call",
    websiteUrl: "https://www.leovegas.com",
    affiliateUrl: "https://www.leovegas.com/?ref=demo_affiliate",
    allowedCountries: ["GB", "CA", "DE", "FR", "SE", "NL", "GLOBAL"],
    pros: JSON.stringify([
      "Dual UKGC and MGA tier-1 regulatory licenses",
      "King of Mobile: Award-winning native iOS and Android apps",
      "LeoSafePlay responsible gambling portal",
    ]),
    cons: JSON.stringify([
      "Strict KYC verification before first payout",
      "No cryptocurrency deposit options",
    ]),
    summary:
      "Known as the King of Mobile Casino, LeoVegas carries elite European licensing and rock-solid consumer trust.",
    fullReview:
      "LeoVegas holds the highest regulatory standard under the UK Gambling Commission and the Malta Gaming Authority. With an award-winning mobile application and stringent player protection tools, it is a flagship choice for regulated European and Canadian markets.",
    featured: true,
    cryptoFriendly: false,
    vpnFriendly: false,
    bonuses: [
      {
        id: "b4",
        title: "100% Cash Match up to €1,000 + 200 Free Spins",
        type: "FREE_SPINS",
        bonusCode: null,
        minDeposit: "€10",
        wagering: "20x Wager-to-unlock",
        maxCashout: "No Limit",
        exclusive: false,
        claimUrl: "https://www.leovegas.com/?ref=demo_affiliate",
        terms: "Real money wagering required before bonus cash is released.",
      },
    ],
  },
  {
    id: "betway",
    name: "Betway Casino",
    slug: "betway",
    logoUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=160&auto=format&fit=crop&q=80",
    rating: 9.4,
    safetyIndex: 9.6,
    safetyTier: "VERY_HIGH",
    status: "ACTIVE",
    isNew: false,
    establishedYear: 2006,
    license: "UK Gambling Commission & MGA",
    minDeposit: "£10 / $10",
    payoutSpeed: "1 - 2 business days",
    withdrawalLimit: "No Maximum",
    supportTypes: "Live Chat, Email",
    websiteUrl: "https://www.betway.com",
    affiliateUrl: "https://www.betway.com/?ref=demo_affiliate",
    allowedCountries: ["GB", "CA", "DE", "FR", "NZ", "GLOBAL"],
    pros: JSON.stringify([
      "Strict UKGC consumer safeguards and player fund protection",
      "Over 18 years of continuous audited operations",
      "Massive progressive jackpots including Mega Moolah",
    ]),
    cons: JSON.stringify([
      "Higher wagering on certain promotional bonuses",
      "Traditional banking methods only",
    ]),
    summary:
      "Established titan in the regulated British and European markets with reliable payouts and extensive slot catalogs.",
    fullReview:
      "Betway has stood as one of the most recognized global brands in iGaming since 2006. With dual tier-1 licensing from the UKGC and MGA, player balances are safeguarded under rigorous segregation requirements.",
    featured: false,
    cryptoFriendly: false,
    vpnFriendly: false,
    bonuses: [
      {
        id: "b5",
        title: "100% Match up to £50 on First Deposit",
        type: "WELCOME",
        bonusCode: null,
        minDeposit: "£10",
        wagering: "30x",
        maxCashout: "Unlimited",
        exclusive: false,
        claimUrl: "https://www.betway.com/?ref=demo_affiliate",
        terms: "UK residents only. Debit cards only.",
      },
    ],
  },
  {
    id: "bovada",
    name: "Bovada Casino",
    slug: "bovada",
    logoUrl: "https://images.unsplash.com/photo-1541278107931-e006523892df?w=160&auto=format&fit=crop&q=80",
    rating: 9.3,
    safetyIndex: 9.4,
    safetyTier: "VERY_HIGH",
    status: "ACTIVE",
    isNew: true,
    establishedYear: 2011,
    license: "Curacao eGaming",
    minDeposit: "$10 (Crypto)",
    payoutSpeed: "15 mins - 24h",
    withdrawalLimit: "$9,500 every 15 minutes (Crypto)",
    supportTypes: "Community Forum & 24/7 Chat",
    websiteUrl: "https://www.bovada.lv",
    affiliateUrl: "https://www.bovada.lv/?ref=demo_affiliate",
    allowedCountries: ["US", "CA", "AU", "GLOBAL"],
    pros: JSON.stringify([
      "Primary destination for US and North American players",
      "Fast same-day Bitcoin, Ethereum, and USDT payouts",
      "Exclusive Hot Drop Jackpots paying out hourly",
    ]),
    cons: JSON.stringify([
      "Credit card deposit fees may apply",
      "Restricted in several specific US states",
    ]),
    summary:
      "The longest-running offshore leader for American players with reliable crypto withdrawals and huge community backing.",
    fullReview:
      "Bovada has operated continuously since 2011, serving as a trusted brand for players in North America. Their rapid adoption of cryptocurrency has made payouts virtually same-day.",
    featured: false,
    cryptoFriendly: true,
    vpnFriendly: false,
    bonuses: [
      {
        id: "b6",
        title: "$3,750 Crypto Welcome Package (3x 125% Match)",
        type: "WELCOME",
        bonusCode: "BTCCWB1250",
        minDeposit: "$20",
        wagering: "25x",
        maxCashout: "No Limit",
        exclusive: true,
        claimUrl: "https://www.bovada.lv/?ref=demo_affiliate",
        terms: "Valid on first 3 crypto deposits.",
      },
      {
        id: "b7",
        title: "50 Free Spins on 777 Deluxe",
        type: "FREE_SPINS",
        bonusCode: "SPIN777",
        minDeposit: "$10",
        wagering: "30x",
        maxCashout: "$500",
        exclusive: true,
        claimUrl: "https://www.bovada.lv/?ref=demo_affiliate",
        terms: "New players only.",
      },
    ],
  },
];

export const FALLBACK_BLACKLIST = [
  {
    id: "scam1",
    name: "RogueJackpot Casino",
    slug: "roguejackpot-warning",
    logoUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=160&auto=format&fit=crop&q=80",
    rating: 1.2,
    safetyIndex: 1.1,
    safetyTier: "BLACKLISTED",
    status: "BLACKLISTED",
    blacklistReason:
      "Flagged by independent auditors for pirated/fake NetEnt and Novomatic software, predatory withdrawal terms, and ignoring over 45 legitimate player payout complaints.",
    establishedYear: 2021,
    license: "Fake / Unverified Seal",
    minDeposit: "$50",
    payoutSpeed: "Indefinite Delay / Withheld",
    summary:
      "DO NOT DEPOSIT. Blacklisted across watchdog networks for falsified software licenses and unpaid player withdrawals.",
    allowedCountries: ["GLOBAL"],
  },
];

export const FALLBACK_GUIDES = [
  {
    id: "g1",
    title: "How to Spot a Rigged Online Casino in 2026",
    slug: "how-to-spot-rigged-casinos",
    category: "Safety & Audits",
    readTime: "6 min read",
    excerpt: "Learn how to verify original game studio servers and avoid pirated slots.",
    content: "When evaluating online casinos, the first checkpoint is testing the game iframe network requests...",
    published: true,
  },
  {
    id: "g2",
    title: "The Ultimate Guide to No Deposit Bonuses",
    slug: "no-deposit-bonus-guide",
    category: "Bonuses",
    readTime: "5 min read",
    excerpt: "Understand max cashouts, playthrough requirements, and eligible game weightings.",
    content: "No deposit bonuses let you test a casino with house money. However, wagering requirements...",
    published: true,
  },
  {
    id: "g3",
    title: "Blackjack Basic Strategy: Lowering House Edge to 0.5%",
    slug: "blackjack-basic-strategy",
    category: "Game Strategy",
    readTime: "8 min read",
    excerpt: "A mathematically proven decision chart for single and multi-deck blackjack games.",
    content: "By following basic strategy charts without deviation, the casino house edge drops below 0.5%...",
    published: true,
  },
  {
    id: "g4",
    title: "Crypto Withdrawals vs Bank Wire: Speed & Limits Compared",
    slug: "crypto-vs-bank-withdrawals",
    category: "Payment Methods",
    readTime: "4 min read",
    excerpt: "Why cryptocurrency payouts settle in minutes while wire transfers take 3-5 days.",
    content: "Automated smart contract releases enable instant crypto withdrawals on networks like Solana and Bitcoin...",
    published: true,
  },
];

export async function getCasinos() {
  try {
    const casinos = await prisma.casino.findMany({
      where: { status: "ACTIVE" },
      include: { bonuses: true },
      orderBy: { rating: "desc" },
    });
    if (casinos.length > 0) return casinos;
  } catch (err) {
    console.warn("Database query skipped, serving fallback casinos.");
  }
  return FALLBACK_CASINOS;
}

export async function getBlacklist() {
  try {
    const blacklist = await prisma.casino.findMany({
      where: { status: "BLACKLISTED" },
      orderBy: { createdAt: "desc" },
    });
    if (blacklist.length > 0) return blacklist;
  } catch (err) {
    console.warn("Database query skipped, serving fallback blacklist.");
  }
  return FALLBACK_BLACKLIST;
}

export async function getCasinoBySlug(slug: string) {
  try {
    const casino = await prisma.casino.findUnique({
      where: { slug },
      include: { bonuses: true, reviews: { where: { isApproved: true } } },
    });
    if (casino) return casino;
  } catch (err) {
    console.warn("Database query skipped, serving static casino.");
  }

  const fallback =
    FALLBACK_CASINOS.find((c) => c.slug === slug) ||
    FALLBACK_BLACKLIST.find((c) => c.slug === slug);
  return fallback || null;
}

// ── REAL SITE STATS ENGINE ──
export interface SiteStats {
  newCasinos: number;
  noDepositBonuses: number;
  freeSpins: number;
  freeGames: number;
  casinoReviews: number;
  gamblingGuides: number;
}

export async function getSiteStats(): Promise<SiteStats> {
  let newCasinos = 234;
  let noDepositBonuses = 75;
  let freeSpins = 167;
  let freeGames = 25713;
  let casinoReviews = 2360;
  let gamblingGuides = 92;

  try {
    // 1. Fetch any manual overrides configured in SiteSetting
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = new Map(settings.map((s) => [s.key, s.value]));

    // Check if auto-calculate is enabled (default true)
    const autoCalc = settingsMap.get("stats_auto_calculate") !== "false";

    if (autoCalc) {
      // Calculate real live database numbers + optional base offsets
      const [
        dbNewCasinos,
        dbNoDepositBonuses,
        dbFreeSpins,
        dbGames,
        dbUserReviews,
        dbActiveCasinos,
        dbGuides,
      ] = await Promise.all([
        prisma.casino.count({ where: { status: "ACTIVE", isNew: true } }),
        prisma.bonus.count({ where: { active: true, type: "NO_DEPOSIT" } }),
        prisma.bonus.count({
          where: {
            active: true,
            OR: [
              { type: "FREE_SPINS" },
              { title: { contains: "Free Spins", mode: "insensitive" } },
            ],
          },
        }),
        prisma.game.count(),
        prisma.userReview.count({ where: { isApproved: true } }),
        prisma.casino.count({ where: { status: "ACTIVE" } }),
        prisma.guide.count({ where: { published: true } }),
      ]);

      const baseOffsetNewCasinos = parseInt(settingsMap.get("offset_new_casinos") || "230", 10);
      const baseOffsetNoDeposit = parseInt(settingsMap.get("offset_no_deposit") || "73", 10);
      const baseOffsetFreeSpins = parseInt(settingsMap.get("offset_free_spins") || "165", 10);
      const baseOffsetGames = parseInt(settingsMap.get("offset_free_games") || "25700", 10);
      const baseOffsetReviews = parseInt(settingsMap.get("offset_casino_reviews") || "2350", 10);
      const baseOffsetGuides = parseInt(settingsMap.get("offset_gambling_guides") || "88", 10);

      newCasinos = baseOffsetNewCasinos + dbNewCasinos;
      noDepositBonuses = baseOffsetNoDeposit + dbNoDepositBonuses;
      freeSpins = baseOffsetFreeSpins + dbFreeSpins;
      freeGames = baseOffsetGames + (dbGames || 13);
      casinoReviews = baseOffsetReviews + dbActiveCasinos + dbUserReviews;
      gamblingGuides = baseOffsetGuides + (dbGuides || 4);
    } else {
      // Exact manual values from Admin Settings
      newCasinos = parseInt(settingsMap.get("stat_new_casinos") || "234", 10);
      noDepositBonuses = parseInt(settingsMap.get("stat_no_deposit") || "75", 10);
      freeSpins = parseInt(settingsMap.get("stat_free_spins") || "167", 10);
      freeGames = parseInt(settingsMap.get("stat_free_games") || "25713", 10);
      casinoReviews = parseInt(settingsMap.get("stat_casino_reviews") || "2360", 10);
      gamblingGuides = parseInt(settingsMap.get("stat_gambling_guides") || "92", 10);
    }
  } catch (err) {
    // Database connection or table creation in progress, return default statistics
  }

  return {
    newCasinos,
    noDepositBonuses,
    freeSpins,
    freeGames,
    casinoReviews,
    gamblingGuides,
  };
}
