import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning old database records...");
  await prisma.userReview.deleteMany();
  await prisma.casinoPaymentMethod.deleteMany();
  await prisma.casinoProvider.deleteMany();
  await prisma.bonus.deleteMany();
  await prisma.casino.deleteMany();
  await prisma.paymentMethod.deleteMany();
  await prisma.softwareProvider.deleteMany();

  console.log("Seeding payment methods...");
  const btc = await prisma.paymentMethod.create({
    data: { name: "Bitcoin (BTC)", slug: "bitcoin", type: "CRYPTO", icon: "₿" },
  });
  const usdt = await prisma.paymentMethod.create({
    data: { name: "Tether (USDT)", slug: "tether", type: "CRYPTO", icon: "₮" },
  });
  const visa = await prisma.paymentMethod.create({
    data: { name: "Visa / Mastercard", slug: "visa-mastercard", type: "CARD", icon: "💳" },
  });
  const interac = await prisma.paymentMethod.create({
    data: { name: "Interac e-Transfer", slug: "interac", type: "BANK", icon: "🏦" },
  });
  const skrill = await prisma.paymentMethod.create({
    data: { name: "Skrill", slug: "skrill", type: "EWALLET", icon: "👛" },
  });

  console.log("Seeding software providers...");
  const pragmatic = await prisma.softwareProvider.create({
    data: { name: "Pragmatic Play", slug: "pragmatic-play" },
  });
  const evolution = await prisma.softwareProvider.create({
    data: { name: "Evolution Gaming", slug: "evolution-gaming" },
  });
  const hacksaw = await prisma.softwareProvider.create({
    data: { name: "Hacksaw Gaming", slug: "hacksaw-gaming" },
  });
  const netent = await prisma.softwareProvider.create({
    data: { name: "NetEnt", slug: "netent" },
  });
  const playngo = await prisma.softwareProvider.create({
    data: { name: "Play'n GO", slug: "playngo" },
  });

  console.log("Seeding casinos...");
  // 1. BitStarz
  const bitstarz = await prisma.casino.create({
    data: {
      name: "BitStarz Casino",
      slug: "bitstarz",
      logoUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=160&auto=format&fit=crop&q=80",
      rating: 9.8,
      safetyIndex: 9.9,
      safetyTier: "VERY_HIGH",
      status: "ACTIVE",
      establishedYear: 2014,
      license: "Curacao Gaming Control Board",
      minDeposit: "$10",
      payoutSpeed: "Instant (Average 10 mins)",
      withdrawalLimit: "$100,000 / month",
      supportTypes: "24/7 Live Chat, VIP Host, Telegram",
      websiteUrl: "https://www.bitstarz.com",
      affiliateUrl: "https://www.bitstarz.com/?ref=demo_affiliate",
      pros: JSON.stringify([
        "Industry-leading 10-minute average withdrawal times",
        "Over 4,500+ premium slots and live dealer games",
        "Awarded Best Casino multiple years by Casinomeister",
        "Supports both crypto and traditional credit cards",
      ]),
      cons: JSON.stringify([
        "Restricted in UK, US, and certain EU jurisdictions",
        "No dedicated sports betting section",
      ]),
      summary:
        "BitStarz is widely considered the gold standard for hybrid crypto/fiat gaming with flawless payout history and stellar customer support.",
      fullReview:
        "BitStarz was launched in 2014 and has established an immaculate track record of timely player payouts, fair dispute resolution, and rigorous game audits. Their average withdrawal time of under 10 minutes sets a benchmark in the iGaming community. With over 4,500 games from tier-1 studios like Pragmatic Play and Evolution, BitStarz consistently earns accredited status on top watchdog boards.",
      featured: true,
      cryptoFriendly: true,
      vpnFriendly: true,
      bonuses: {
        create: [
          {
            title: "5 BTC or $500 Welcome Package + 180 Free Spins",
            type: "WELCOME",
            bonusCode: "STARZVIP",
            minDeposit: "$20",
            wagering: "40x",
            maxCashout: "Unlimited",
            exclusive: true,
            claimUrl: "https://www.bitstarz.com/?ref=demo_affiliate",
            terms: "18+ only. Wagering requirement applies to bonus amount. Free spins credited over 9 days.",
          },
          {
            title: "20 No Deposit Free Spins on Registration",
            type: "NO_DEPOSIT",
            minDeposit: "$0",
            wagering: "40x",
            maxCashout: "$100",
            exclusive: false,
            claimUrl: "https://www.bitstarz.com/?ref=demo_affiliate",
            terms: "Email verification required. Available to new players upon signup.",
          },
        ],
      },
      paymentMethods: {
        create: [{ paymentMethodId: btc.id }, { paymentMethodId: usdt.id }, { paymentMethodId: visa.id }],
      },
      providers: {
        create: [{ providerId: pragmatic.id }, { providerId: evolution.id }, { providerId: hacksaw.id }],
      },
    },
  });

  // 2. Stake.com
  const stake = await prisma.casino.create({
    data: {
      name: "Stake Casino",
      slug: "stake",
      logoUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=160&auto=format&fit=crop&q=80",
      rating: 9.7,
      safetyIndex: 9.7,
      safetyTier: "VERY_HIGH",
      status: "ACTIVE",
      establishedYear: 2017,
      license: "Curacao eGaming",
      minDeposit: "No Minimum",
      payoutSpeed: "Instant (Automated On-Chain)",
      withdrawalLimit: "Unlimited",
      supportTypes: "24/7 Live Support",
      websiteUrl: "https://stake.com",
      affiliateUrl: "https://stake.com/?c=demo_affiliate",
      pros: JSON.stringify([
        "Zero withdrawal limits and instant crypto payouts",
        "Exclusive Stake Originals with verifiable provably fair seeds",
        "Generous VIP rake-back and daily reload bonuses",
        "Official betting partner of UFC and Formula 1",
      ]),
      cons: JSON.stringify([
        "Strictly cryptocurrency focused (fiat deposits use third-party on-ramps)",
        "Limited traditional welcome bonus structure",
      ]),
      summary:
        "The undisputed titan of crypto gambling with zero cashout limits, provably fair originals, and rapid community engagement.",
      fullReview:
        "Stake revolutionized crypto gambling by introducing true provably fair algorithms alongside mainstream studio partnerships. With instant withdrawals and zero withdrawal caps, high rollers and casual players alike praise its transparency.",
      featured: true,
      cryptoFriendly: true,
      vpnFriendly: false,
      bonuses: {
        create: [
          {
            title: "200% Deposit Match up to $1,000 + 10% Instant Rakeback",
            type: "WELCOME",
            bonusCode: "VIPSTAKE",
            minDeposit: "$50",
            wagering: "40x",
            maxCashout: "No Limit",
            exclusive: true,
            claimUrl: "https://stake.com/?c=demo_affiliate",
            terms: "Wager requirement covers deposit + bonus. Valid on slots and Stake Originals.",
          },
        ],
      },
      paymentMethods: {
        create: [{ paymentMethodId: btc.id }, { paymentMethodId: usdt.id }],
      },
      providers: {
        create: [{ providerId: pragmatic.id }, { providerId: hacksaw.id }, { providerId: playngo.id }],
      },
    },
  });

  // 3. LeoVegas
  const leovegas = await prisma.casino.create({
    data: {
      name: "LeoVegas",
      slug: "leovegas",
      logoUrl: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=160&auto=format&fit=crop&q=80",
      rating: 9.5,
      safetyIndex: 9.8,
      safetyTier: "VERY_HIGH",
      status: "ACTIVE",
      establishedYear: 2012,
      license: "Malta Gaming Authority (MGA) & UKGC",
      minDeposit: "€10",
      payoutSpeed: "12 - 24 hours",
      withdrawalLimit: "€50,000 / month",
      supportTypes: "24/7 Live Chat & Phone Call",
      websiteUrl: "https://www.leovegas.com",
      affiliateUrl: "https://www.leovegas.com/?ref=demo_affiliate",
      pros: JSON.stringify([
        "Dual UKGC and MGA tier-1 regulatory licenses",
        "King of Mobile: Award-winning native iOS and Android apps",
        "LeoSafePlay responsible gambling portal and limits",
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
      bonuses: {
        create: [
          {
            title: "100% Cash Match up to €1,000 + 200 Free Spins",
            type: "WELCOME",
            minDeposit: "€10",
            wagering: "20x Wager-to-unlock",
            maxCashout: "No Limit",
            exclusive: false,
            claimUrl: "https://www.leovegas.com/?ref=demo_affiliate",
            terms: "Real money wagering required before bonus cash is released without wagering restrictions.",
          },
        ],
      },
      paymentMethods: {
        create: [{ paymentMethodId: visa.id }, { paymentMethodId: interac.id }, { paymentMethodId: skrill.id }],
      },
      providers: {
        create: [{ providerId: netent.id }, { providerId: evolution.id }, { providerId: playngo.id }],
      },
    },
  });

  // 4. Rogue / Blacklisted Casino (Watchdog Warning feature like Casinomeister / Casino Guru)
  await prisma.casino.create({
    data: {
      name: "RogueJackpot Casino (SCAM WARNING)",
      slug: "roguejackpot-warning",
      logoUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=160&auto=format&fit=crop&q=80",
      rating: 1.2,
      safetyIndex: 1.1,
      safetyTier: "BLACKLISTED",
      status: "BLACKLISTED",
      blacklistReason:
        "Flagged by independent auditors for pirated/fake NetEnt and Novomatic software, predatory withdrawal terms, and ignoring over 45 legitimate player payout complaints.",
      establishedYear: 2021,
      license: "Fake / Unverified License",
      minDeposit: "$50",
      payoutSpeed: "Indefinite Delay / Withheld",
      withdrawalLimit: "Zero / Predatory Terms",
      supportTypes: "Unresponsive Support",
      websiteUrl: "https://example.com/scam-alert",
      affiliateUrl: "#blacklisted",
      pros: JSON.stringify([]),
      cons: JSON.stringify([
        "CONFIRMED PIRATED / CLONED GAMES with altered RTP",
        "Confiscating player balances under fabricated rule violations",
        "Fake regulatory seal on website footer",
      ]),
      summary:
        "DO NOT DEPOSIT. Blacklisted across watchdog networks for falsified software licenses and unpaid player withdrawals.",
      fullReview:
        "Our investigation verified that this operator hosts counterfeit game scripts copied from NetEnt and Pragmatic servers. Numerous players report account closures immediately after requesting withdrawals above $1,000. Avoid this casino at all costs.",
      featured: false,
      cryptoFriendly: false,
      vpnFriendly: false,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
