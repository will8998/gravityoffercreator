export type Lead = {
  slug: string;
  name: string;
  firstName: string;
  title: string;
  project: string;
  handle: string;
  profileUrl: string;
  fundingNote: string;
  narrative: string;
  observation: string;
  hook: string;
  voiceSampleUrl: string;
  voiceSampleLabel: string;
  podcastAppearance: string;
  embed?: {
    kind: "spotify" | "apple" | "youtube" | "buzzsprout";
    src: string;
  };
  sources: { label: string; url: string }[];
};

export const leads: Lead[] = [
  {
    slug: "david-tse",
    name: "David Tse",
    firstName: "David",
    title: "Co-Founder",
    project: "Babylon Chain",
    handle: "@dntse",
    profileUrl: "https://x.com/dntse",
    fundingNote:
      "Stanford professor. Babylon pioneered Bitcoin staking — a category now worth $20B+ in secured TVL.",
    narrative: "Bitcoin restaking",
    observation:
      "Appeared on Castle Island, Chainalysis Public Key, Blocklayer and Medici — five+ podcasts in twelve months — yet Babylon's own channel is silent. Your voice is already out there; no one has stitched it into a founder show.",
    hook:
      "You've explained Bitcoin staking five different ways on five different podcasts. We think the sixth should be yours — daily, in your voice, on autopilot.",
    voiceSampleUrl:
      "https://podcasts.apple.com/us/podcast/david-tse-babylon-on-bitcoin-staking/id1480586463?i=1000658437285",
    voiceSampleLabel: "David on Castle Island — 'Bitcoin Staking' (EP.535)",
    podcastAppearance: "Castle Island / On The Brink, June 2024",
    embed: {
      kind: "apple",
      src: "https://embed.podcasts.apple.com/us/podcast/david-tse-babylon-on-bitcoin-staking/id1480586463?i=1000658437285",
    },
    sources: [
      {
        label: "Castle Island VC — EP.535",
        url: "https://castleisland.vc/david-tse-babylon-on-bitcoin-staking-ep-535/",
      },
      { label: "David Tse on X", url: "https://x.com/dntse" },
    ],
  },
  {
    slug: "jason-badeaux",
    name: "Jason Badeaux",
    firstName: "Jason",
    title: "Co-Founder & CEO",
    project: "Daylight",
    handle: "@jasonbadeaux",
    profileUrl: "https://x.com/jasonbadeaux",
    fundingNote:
      "Raised $9M Series A led by a16z crypto, followed by $75M equity + debt round led by Framework.",
    narrative: "DePIN · Energy · Base",
    observation:
      "$75M in the door, and Daylight's narrative is still buried on founder interviews. The energy DePIN category is heating up — whoever owns the narrative first wins the next cycle.",
    hook:
      "You raised $75M on a thesis most of crypto still doesn't understand. Daylight shouldn't need a follow-up round for people to get it — a daily founder podcast will.",
    voiceSampleUrl:
      "https://www.buzzsprout.com/2375468/episodes/15582953-jason-badeaux-daylight-protocol-and-meltem-demirors",
    voiceSampleLabel: "Jason on Token Warrant with Meltem Demirors",
    podcastAppearance: "Token Warrant (with Meltem Demirors)",
    embed: {
      kind: "buzzsprout",
      src: "https://www.buzzsprout.com/2375468/15582953?client_source=small_player&iframe=true",
    },
    sources: [
      {
        label: "The Block — $75M round",
        url: "https://www.theblock.co/post/374951/depin-daylight-raises-75-million-led-by-framework",
      },
      {
        label: "Token Warrant episode",
        url: "https://www.buzzsprout.com/2375468/episodes/15582953-jason-badeaux-daylight-protocol-and-meltem-demirors",
      },
    ],
  },
  {
    slug: "manolis-nikiforakis",
    name: "Manolis Nikiforakis",
    firstName: "Manolis",
    title: "Co-Founder & CEO",
    project: "WeatherXM",
    handle: "LinkedIn: /in/mnikiforakis",
    profileUrl: "https://gr.linkedin.com/in/mnikiforakis",
    fundingNote:
      "$7.7M Series A led by Lightspeed Faction. One of the fastest-growing physical DePIN networks — a real-world use case regulators already respect.",
    narrative: "DePIN · Weather · Physical infra",
    observation:
      "DePINed episode #9 is the one long-form on your voice. Meanwhile WeatherXM shipped a real, hardware-backed network that regulators actually respect. Nobody outside DePIN Twitter knows your story — and DePIN Twitter is only 8,000 accounts.",
    hook:
      "The hardest DePIN story to tell — real sensors, real data, real revenue — shouldn't depend on conference keynotes. We'll make it a daily drip, in your voice.",
    voiceSampleUrl: "https://open.spotify.com/episode/2ST3zBlfzzJxkxwSqqA6Dx",
    voiceSampleLabel:
      "Manolis on DePINed #9 — 'Building a Global Decentralized Weather Network'",
    podcastAppearance: "DePINed Podcast #9",
    embed: {
      kind: "spotify",
      src: "https://open.spotify.com/embed/episode/2ST3zBlfzzJxkxwSqqA6Dx",
    },
    sources: [
      {
        label: "DePINed Podcast #9",
        url: "https://open.spotify.com/episode/2ST3zBlfzzJxkxwSqqA6Dx",
      },
      { label: "WeatherXM About", url: "https://weatherxm.com/about-us/" },
    ],
  },
  {
    slug: "sean-neville",
    name: "Sean Neville",
    firstName: "Sean",
    title: "Co-Founder & CEO",
    project: "Catena Labs",
    handle: "catenalabs.com",
    profileUrl: "https://catenalabs.com/team",
    fundingNote:
      "$18M seed led by a16z crypto. Co-founder of Circle. Invented USDC. Building the first AI-native bank — for agents, not humans.",
    narrative: "AI-native finance · Agentic commerce",
    observation:
      "You invented the stablecoin that half of crypto runs on. The AI-agent economy is the next trillion-dollar category and Catena is early. Yet since stealth launch in May 2025 there's one Fortune piece and a Businesswire. That's a waste of a rare founder story.",
    hook:
      "You built USDC. You're now building the bank for AI agents. 'First AI-native financial institution' is a story only you can tell — and right now it's living in one Fortune article and a press release.",
    voiceSampleUrl:
      "https://fortune.com/crypto/2025/05/20/sean-neville-catena-labs-18-million-a16z-breyer-circle-coinbase-tom-brady/",
    voiceSampleLabel: "Fortune — Sean on building the AI-native bank",
    podcastAppearance: "Fortune Crypto exclusive, May 2025",
    sources: [
      {
        label: "Businesswire — Catena out of stealth",
        url: "https://www.businesswire.com/news/home/20250520361792/en/Circle-Co-Founder-Sean-Neville-Takes-Catena-Labs-Out-of-Stealth-with-Plans-to-Build-the-First-AI-Native-Financial-Institution",
      },
      {
        label: "a16z crypto — Investing in Catena",
        url: "https://a16zcrypto.com/posts/article/investing-in-catena-labs/",
      },
    ],
  },
  {
    slug: "neil-chatterjee",
    name: "Neil Chatterjee",
    firstName: "Neil",
    title: "Founder & CEO",
    project: "Andrena / DAWN",
    handle: "@neilc_dawn",
    profileUrl: "https://x.com/neilc_dawn",
    fundingNote:
      "$18M round led by Dragonfly. Princeton EE. Ex-Meta. Already serving 10,000+ households real low-cost internet — DePIN with actual users.",
    narrative: "DePIN · Broadband · Solana",
    observation:
      "Real customers, real hardware, 10k households on live service — and yet DAWN's story competes with dozens of vaporware DePINs for the same mindshare. You have receipts; we'll make sure everyone hears them weekly, in your voice.",
    hook:
      "Most DePIN projects have a pitch deck. DAWN has 10,000 paying customers. The only reason crypto Twitter doesn't know is that no one is telling them — daily, in your voice. Let's fix that.",
    voiceSampleUrl: "https://www.youtube.com/watch?v=4QARNi4--2s",
    voiceSampleLabel: "Neil on 'The Future of the Internet & DePIN' (EP #133)",
    podcastAppearance: "DePIN podcast — EP #133",
    embed: {
      kind: "youtube",
      src: "https://www.youtube.com/embed/4QARNi4--2s",
    },
    sources: [
      {
        label: "The Block — Andrena $18M",
        url: "https://www.theblock.co/post/309917/solana-depin-andrena-dawn-funding",
      },
      { label: "YouTube interview", url: "https://www.youtube.com/watch?v=4QARNi4--2s" },
    ],
  },
  {
    slug: "anurag-arjun",
    name: "Anurag Arjun",
    firstName: "Anurag",
    title: "Co-Founder",
    project: "Avail",
    handle: "@anuragarjun",
    profileUrl: "https://x.com/anuragarjun",
    fundingNote:
      "Co-founder of Polygon. Spun Avail out in 2023 as a neutral modular DA layer. Avail is one of the three DA leaders alongside Celestia and EigenDA.",
    narrative: "Modular · Data availability · L2 scaling",
    observation:
      "You've been a guest on a dozen DA and modular podcasts in the last 18 months — Hashing It Out, Epicenter, Decentralounge, Crypto News Podcast twice. That's a founder with range. But Avail's own narrative lives on other people's shows. When Celestia iterates daily on their Twitter, Avail's silence costs you mindshare.",
    hook:
      "You helped build Polygon to $10B+ TVL. You spun out Avail on the thesis that modular wins. The thesis is right — your daily voice telling it is the missing distribution layer.",
    voiceSampleUrl:
      "https://podcasts.apple.com/ca/podcast/338-anurag-arjun-co-founder-of-avail-on-scaling/id1559291408?i=1000656870262",
    voiceSampleLabel: "Anurag on Crypto News Podcast #338 — 'Scaling Ethereum & The Future of L2s'",
    podcastAppearance: "Crypto News Podcast #338 & #500",
    embed: {
      kind: "apple",
      src: "https://embed.podcasts.apple.com/ca/podcast/338-anurag-arjun-co-founder-of-avail-on-scaling/id1559291408?i=1000656870262",
    },
    sources: [
      {
        label: "Crypto News — Episode #338",
        url: "https://podcasts.apple.com/ca/podcast/338-anurag-arjun-co-founder-of-avail-on-scaling/id1559291408?i=1000656870262",
      },
      {
        label: "Cointelegraph — Hashing It Out",
        url: "https://cointelegraph.com/news/hashing-it-out-navigating-next-wave-web3-avail-anurag-arjun",
      },
    ],
  },
  {
    slug: "mike-silagadze",
    name: "Mike Silagadze",
    firstName: "Mike",
    title: "Co-Founder & CEO",
    project: "ether.fi",
    handle: "@MikeSilagadze",
    profileUrl: "https://x.com/MikeSilagadze",
    fundingNote:
      "5th largest protocol on Ethereum. Liquid restaking leader. Previously scaled Top Hat (edtech) to 500 employees. Rare operator-founder who has already done it before.",
    narrative: "Restaking · AVS · Ethereum",
    observation:
      "You're one of three or four founders who can explain restaking without losing the room. You did 238 of Crypto News Podcast, The Defiant, The Edge, Decentralised. Yet ether.fi's content engine is still a cadence of protocol announcements — not a daily voice. The restaking narrative is still being written; whoever speaks into it weekly owns the next chapter.",
    hook:
      "You built Top Hat. You're now running ether.fi. That's a two-chapter founder story and crypto Twitter only knows one of them. Daily podcast, in your voice, no extra hours — let's tell the rest.",
    voiceSampleUrl: "https://open.spotify.com/episode/47lpVN8V0IASWH0QS73eXn",
    voiceSampleLabel: "Mike on Crypto News Podcast #238 — 'ETH, Re-Staking & Building Start-Ups'",
    podcastAppearance: "Crypto News Podcast #238, The Defiant, The Edge",
    embed: {
      kind: "spotify",
      src: "https://open.spotify.com/embed/episode/47lpVN8V0IASWH0QS73eXn",
    },
    sources: [
      {
        label: "Crypto News Podcast #238",
        url: "https://podcasts.apple.com/ca/podcast/238-mike-silagadze-ceo-of-ether-fi-on-eth-re-staking/id1559291408?i=1000616604174",
      },
      {
        label: "The Defiant — AVSs",
        url: "https://thedefiant.io/podcasts-and-videos/podcast/really-crazy-stuff-will-happen-with-avss-ether-fi-founder-mike-silagadze",
      },
    ],
  },
  {
    slug: "chris-yin",
    name: "Chris Yin",
    firstName: "Chris",
    title: "Co-Founder & CEO",
    project: "Plume Network",
    handle: "@chrisyinsf",
    profileUrl: "https://x.com/chrisyinsf",
    fundingNote:
      "First permissionless full-stack L2 built for real-world assets (RWAfi). 180+ native apps. Rare founder with a literal door-to-door sales origin story.",
    narrative: "RWA · L2 · Tokenized assets",
    observation:
      "You went from door-to-door sales to building the RWA layer. That's a story most founders can't pay enough to have. You're already on Crypto News #518, Amberdata, Block-by-Block, Talking Tokens — but that's a drop a month. The RWA narrative doesn't have a dominant founder voice yet. You should be it.",
    hook:
      "You've got a once-in-a-decade founder origin (door-to-door → RWA L2) and you're telling it on other people's podcasts. Yours should be daily, and it should be yours.",
    voiceSampleUrl:
      "https://podcasts.apple.com/us/podcast/518-chris-yin-ceo-of-plume-network-on-optimizing/id1559291408?i=1000749938983",
    voiceSampleLabel: "Chris on Crypto News Podcast #518 — 'Optimizing Looping & RWAs'",
    podcastAppearance: "Crypto News Podcast #518, Amberdata, Block-by-Block",
    embed: {
      kind: "apple",
      src: "https://embed.podcasts.apple.com/us/podcast/518-chris-yin-ceo-of-plume-network-on-optimizing/id1559291408?i=1000749938983",
    },
    sources: [
      {
        label: "Crypto News Podcast #518",
        url: "https://podcasts.apple.com/us/podcast/518-chris-yin-ceo-of-plume-network-on-optimizing/id1559291408?i=1000749938983",
      },
      {
        label: "Block-by-Block — RWA revolution",
        url: "https://www.blockbyblock.show/2437435/episodes/17424556-audio-chris-yin-how-plume-network-is-leading-the-real-world-asset-rwa-revolution-in-crypto",
      },
    ],
  },
  {
    slug: "sy-lee",
    name: "S.Y. Lee",
    firstName: "S.Y.",
    title: "Co-Founder & CEO",
    project: "Story (PIP Labs)",
    handle: "@seungyoonlee",
    profileUrl: "https://x.com/seungyoonlee",
    fundingNote:
      "$143M raised from a16z crypto (three rounds) and Polychain. $2.25B valuation. Previously founded Radish, acquired by Kakao for $440M. Backed by Paris Hilton, David Goyer, Endeavor.",
    narrative: "IP · AI · Consumer crypto",
    observation:
      "You sold a consumer-fiction company to Kakao for $440M before most of crypto had a second startup under their belt. You're now building the IP layer for AI, backed by Paris Hilton and David Goyer. That's a story the AI-meets-crypto narrative desperately needs — and it's not being told daily by you.",
    hook:
      "Kakao bought your last company for $440M. A16z has now funded Story three times over. That's a founder crypto should already know cold — and yet most of crypto Twitter still can't place you. A daily podcast solves that without asking for more of your time.",
    voiceSampleUrl:
      "https://a16zcrypto.com/posts/article/investing-in-story-protocol/",
    voiceSampleLabel: "a16z crypto — 'Why we invested in Story Protocol'",
    podcastAppearance: "a16z crypto essay, TechCrunch, Variety interviews",
    sources: [
      {
        label: "a16z crypto — Investing in Story",
        url: "https://a16zcrypto.com/posts/article/investing-in-story-protocol/",
      },
      {
        label: "TechCrunch — $80M Series B",
        url: "https://techcrunch.com/2024/08/21/story-raises-83m-at-a-2-25b-valuation-to-build-a-blockchain-for-the-business-of-content-ip-in-the-age-of-ai/",
      },
    ],
  },
  {
    slug: "howard-wu",
    name: "Howard Wu",
    firstName: "Howard",
    title: "Co-Founder",
    project: "Aleo",
    handle: "@1HowardWu",
    profileUrl: "https://x.com/1HowardWu",
    fundingNote:
      "Berkeley-trained. 14 years in crypto. Co-founder of Aleo (privacy L1) and Provable. Shipped SnarkVM, SnarkOS, Leo language, ZPass. One of the most technically credible ZK founders alive.",
    narrative: "ZK · Privacy · L1",
    observation:
      "You've spent 14 years quietly building the infrastructure crypto keeps claiming to want. ZK Podcast has interviewed you three times. House of ZK traced your entire arc. And yet, outside of 2,000 ZK researchers, nobody knows the story. The next cycle will be ZK — and the founder who explains it daily will own that cycle.",
    hook:
      "You've put 14 years into making crypto private. The cycle ZK promises is finally arriving. You shouldn't be the quiet founder this time — let your voice run daily while you keep building.",
    voiceSampleUrl: "https://zeroknowledge.fm/podcast/307/",
    voiceSampleLabel: "Howard on ZK Podcast #307 — 'The Evolution of Aleo'",
    podcastAppearance: "ZK Podcast #144 & #307, House of ZK #64",
    sources: [
      {
        label: "ZK Podcast #307",
        url: "https://zeroknowledge.fm/podcast/307/",
      },
      {
        label: "House of ZK #64",
        url: "https://x.com/HouseofZK/status/1953466007667814582",
      },
    ],
  },
];

export function getLead(slug: string): Lead | undefined {
  return leads.find((l) => l.slug === slug);
}

export function getAllLeadSlugs(): string[] {
  return leads.map((l) => l.slug);
}
