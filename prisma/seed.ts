import { config } from "dotenv";
config({ path: ".env.local" });
import { PrismaClient } from "./generated/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DIRECT_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Clear existing data — delete in reverse FK order for idempotency
  await prisma.message.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.thread.deleteMany();
  await prisma.package.deleteMany();
  await prisma.property.deleteMany();

  // 2. Create properties with nested packages
  const lafc = await prisma.property.create({
    data: {
      slug: "lafc",
      name: "LAFC (Los Angeles FC)",
      tagline: "The most passionate soccer club in MLS",
      category: "sports",
      subcategory: "soccer",
      location: "Los Angeles, CA",
      region: "west",
      imageUrl: "https://picsum.photos/seed/lafc/800/600",
      description:
        "LAFC is the fastest-growing club in Major League Soccer with one of the most passionate fanbases in North American sports. With an average attendance of 22,000+ at BMO Stadium and a global broadcast footprint, LAFC offers brands a premium platform in the largest media market in the U.S. The club's demographic skews young (18–34), multicultural, and affluent — a highly desirable cohort for consumer and lifestyle brands.",
      audienceTotalReach: 1200000,
      audienceAgeRange: "18–34",
      audienceGender: "62% male, 38% female",
      audienceIncome: "premium",
      priceFrom: 25000,
      availability: "Limited Availability — Q2 & Q3 2026",
      featured: true,
      tags: [
        "MLS",
        "soccer",
        "Los Angeles",
        "sports",
        "multicultural",
        "millennial",
      ],
      packages: {
        create: [
          {
            name: "Founding Partner",
            priceUsd: 125000,
            inclusions: [
              "Primary kit sleeve logo (home & away)",
              "Naming rights on Club Training Ground activation zone",
              "In-stadium LED board presence every home match",
              "30-second broadcast spot on Apple TV MLS Season Pass (10 matches)",
              "Dedicated social media integration — 4 posts per month across club accounts",
              "20 VIP box seats per home match + 2 player meet-and-greet events annually",
            ],
            maxSponsors: 1,
          },
          {
            name: "Gold Partner",
            priceUsd: 55000,
            inclusions: [
              "Secondary logo on training kit",
              "Matchday in-stadium announcement (all home games)",
              "LED perimeter board presence during 5 home matches",
              "2 co-branded social posts per month",
              "10 premium seats per home match",
              "Logo on club website and digital match programs",
            ],
            maxSponsors: 3,
          },
          {
            name: "Community Partner",
            priceUsd: 25000,
            inclusions: [
              "Logo in digital match day program",
              "1 co-branded social post per month",
              "4 premium seats per home match",
              "Inclusion in Partner section of club website",
            ],
            maxSponsors: 12,
          },
        ],
      },
    },
  });

  const nyJets = await prisma.property.create({
    data: {
      slug: "ny-jets",
      name: "New York Jets",
      tagline: "New York's team on the rise",
      category: "sports",
      subcategory: "football",
      location: "East Rutherford, NJ",
      region: "east",
      imageUrl: "https://picsum.photos/seed/ny-jets/800/600",
      description:
        "The New York Jets represent one of the most storied franchises in the NFL, playing to sold-out crowds at MetLife Stadium in the nation's #1 media market. With 80,000 fans per game and national broadcast deals on CBS and ESPN, sponsorship with the Jets delivers unmatched reach to the tri-state area and beyond. The team has seen significant investment and momentum heading into the 2026 season.",
      audienceTotalReach: 4800000,
      audienceAgeRange: "25–54",
      audienceGender: "67% male, 33% female",
      audienceIncome: "mass-market",
      priceFrom: 75000,
      availability: "Available — 2026 Season Packages",
      featured: true,
      tags: ["NFL", "football", "New York", "sports", "broadcast", "stadium"],
      packages: {
        create: [
          {
            name: "Presenting Sponsor",
            priceUsd: 350000,
            inclusions: [
              "Title designation: 'Jets Game Presented by [Brand]' (3 regular season games)",
              "In-game on-field activation opportunities (halftime)",
              "Branded video board features (30-second spots) each presenting game",
              "Suite access (20 seats) for all presenting games",
              "Co-branded media campaign with Jets social channels (8M+ followers)",
              "Exclusive pregame field access and player interaction event",
            ],
            maxSponsors: 1,
          },
          {
            name: "Official Partner",
            priceUsd: 150000,
            inclusions: [
              "Category exclusivity in designated product/service category",
              "Stadium signage presence in 2 permanent locations",
              "4 co-branded social posts across season",
              "12 club-level tickets per home game",
              "Logo on team digital platforms and app",
            ],
            maxSponsors: 4,
          },
          {
            name: "Team Backer",
            priceUsd: 75000,
            inclusions: [
              "Logo in digital gameday program",
              "1 co-branded social post per month (September–January)",
              "8 club-level tickets per home game",
              "Brand mention in 2 press releases",
            ],
            maxSponsors: 10,
          },
        ],
      },
    },
  });

  const miamiOpen = await prisma.property.create({
    data: {
      slug: "miami-open",
      name: "Miami Open",
      tagline: "World-class tennis in the heart of South Florida",
      category: "sports",
      subcategory: "tennis",
      location: "Miami Gardens, FL",
      region: "south",
      imageUrl: "https://picsum.photos/seed/miami-open/800/600",
      description:
        "The Miami Open is one of the premier ATP and WTA Masters 1000 events in the world, drawing 400,000 attendees and a global television audience of 100M+ over two weeks. Held at Hard Rock Stadium, the event brings together the best tennis players in the world and attracts an affluent international audience. The festival atmosphere and Marquee South Florida setting make it a unique platform for premium brand storytelling.",
      audienceTotalReach: 3200000,
      audienceAgeRange: "28–55",
      audienceGender: "55% female, 45% male",
      audienceIncome: "affluent",
      priceFrom: 50000,
      availability: "Available — March 2027 Event",
      featured: true,
      tags: [
        "tennis",
        "ATP",
        "WTA",
        "Miami",
        "luxury",
        "international",
        "sports",
      ],
      packages: {
        create: [
          {
            name: "Tournament Presenting Partner",
            priceUsd: 250000,
            inclusions: [
              "Tournament naming designation across all marketing materials",
              "On-court logo placement visible in all broadcast footage",
              "Dedicated brand lounge (1,200 sq ft) on tournament grounds",
              "Full-page ad in official tournament program",
              "Player appearance coordination (1 top-10 player per event day)",
              "40 hospitality passes per day (2-week event)",
              "30-second ad in tournament broadcast feed (ATP and WTA networks)",
            ],
            maxSponsors: 1,
          },
          {
            name: "Official Supplier",
            priceUsd: 85000,
            inclusions: [
              "Category exclusivity (e.g., Official Hydration Partner)",
              "Product sampling station with branded booth (1,000 sq ft)",
              "Logo on player towels and courtside branding",
              "20 premium daily passes for duration of tournament",
              "2 social media features on @MiamiOpen accounts",
            ],
            maxSponsors: 5,
          },
          {
            name: "Fan Zone Sponsor",
            priceUsd: 50000,
            inclusions: [
              "Branded fan activation area in general admission zone",
              "Product sampling or interactive experience (brand-provided)",
              "Logo on fan zone signage and digital screens",
              "10 daily passes for event duration",
            ],
            maxSponsors: 8,
          },
        ],
      },
    },
  });

  const austinFC = await prisma.property.create({
    data: {
      slug: "austin-fc",
      name: "Austin FC",
      tagline: "The capital of Texas has a club of its own",
      category: "sports",
      subcategory: "soccer",
      location: "Austin, TX",
      region: "south",
      imageUrl: "https://picsum.photos/seed/austin-fc/800/600",
      description:
        "Austin FC is MLS's fastest-growing club in one of America's most dynamic and rapidly expanding cities. Q2 Stadium consistently sells out with 20,500 passionate supporters, and the brand draws heavily from Austin's tech-forward, entrepreneurial demographic. With strong digital engagement and a civic pride narrative, Austin FC is an ideal platform for brands seeking authentic connection with the coveted 24–38 age group.",
      audienceTotalReach: 780000,
      audienceAgeRange: "24–38",
      audienceGender: "58% male, 42% female",
      audienceIncome: "premium",
      priceFrom: 15000,
      availability: "Available Q2–Q4 2026",
      featured: false,
      tags: ["MLS", "soccer", "Austin", "tech", "sports", "millennial"],
      packages: {
        create: [
          {
            name: "Verde Partner",
            priceUsd: 65000,
            inclusions: [
              "Primary logo on supporter section signage (all home matches)",
              "Co-branded Austin FC digital content series (4 episodes)",
              "In-stadium branded activation space per match (250 sq ft)",
              "15 club-level seats per home game",
              "4 co-branded social posts per month",
            ],
            maxSponsors: 2,
          },
          {
            name: "Supporter Sponsor",
            priceUsd: 15000,
            inclusions: [
              "Logo in matchday digital program",
              "1 co-branded social post per month",
              "6 general admission tickets per home game",
              "Inclusion on club website partner page",
            ],
            maxSponsors: 15,
          },
        ],
      },
    },
  });

  const coachella = await prisma.property.create({
    data: {
      slug: "coachella",
      name: "Coachella Valley Music & Arts Festival",
      tagline: "The world's most influential music and culture festival",
      category: "music",
      subcategory: "festival",
      location: "Indio, CA",
      region: "west",
      imageUrl: "https://picsum.photos/seed/coachella/800/600",
      description:
        "Coachella is the defining cultural moment of the year for the 18–30 demographic, drawing 125,000 attendees daily across two weekends in April. With a global social media footprint exceeding 5B annual impressions and live streams reaching 40M viewers, Coachella offers brand partners an unrivaled platform for cultural relevance and authentic youth engagement. Activation opportunities range from experiential installations to digital integrations with the festival's award-winning content team.",
      audienceTotalReach: 5000000,
      audienceAgeRange: "18–30",
      audienceGender: "52% female, 48% male",
      audienceIncome: "premium",
      priceFrom: 100000,
      availability: "Sold Out — 2026 Waitlist Open",
      featured: true,
      tags: ["music", "festival", "California", "culture", "Gen-Z", "luxury"],
      packages: {
        create: [
          {
            name: "Experiential Partner",
            priceUsd: 500000,
            inclusions: [
              "Branded activation space on festival grounds (5,000 sq ft)",
              "Official partner designation across all festival marketing",
              "Custom co-branded content series with Coachella's creative team",
              "Brand integration in festival live stream (reaching 40M+ viewers)",
              "50 artist compound passes + 100 VIP passes per weekend",
              "Dedicated @Coachella social features (Instagram, TikTok) — 4 per festival",
            ],
            maxSponsors: 2,
          },
          {
            name: "Stage Sponsor",
            priceUsd: 200000,
            inclusions: [
              "Stage naming rights for one of 5 secondary stages",
              "On-stage logo during all performances on sponsored stage",
              "Broadcast logo placement during stage coverage",
              "20 VIP passes per weekend + backstage passes for 5",
              "2 co-branded social posts from @Coachella accounts",
            ],
            maxSponsors: 5,
          },
          {
            name: "Brand Camp",
            priceUsd: 100000,
            inclusions: [
              "Branded product/service booth in Brand Camp zone (1,500 sq ft)",
              "Sampling or activation rights for festival attendees",
              "Logo on festival app and digital maps",
              "10 VIP passes per weekend",
            ],
            maxSponsors: 12,
          },
        ],
      },
    },
  });

  const rollingLoud = await prisma.property.create({
    data: {
      slug: "rolling-loud",
      name: "Rolling Loud Miami",
      tagline: "The world's largest hip-hop festival",
      category: "music",
      subcategory: "festival",
      location: "Miami, FL",
      region: "south",
      imageUrl: "https://picsum.photos/seed/rolling-loud/800/600",
      description:
        "Rolling Loud is the world's largest hip-hop music festival, producing events in Miami, New York, Los Angeles, and internationally. The Miami flagship event draws 200,000+ attendees over three days and commands a digital audience in the hundreds of millions through live streams and social media. With a core demographic of multicultural 18–28-year-olds with high discretionary spending, Rolling Loud is unmatched for brands targeting the hip-hop generation.",
      audienceTotalReach: 2800000,
      audienceAgeRange: "18–28",
      audienceGender: "55% male, 45% female",
      audienceIncome: "mass-market",
      priceFrom: 45000,
      availability: "Limited Availability — July 2026",
      featured: false,
      tags: [
        "hip-hop",
        "music",
        "festival",
        "Miami",
        "Gen-Z",
        "multicultural",
      ],
      packages: {
        create: [
          {
            name: "Title Sponsor",
            priceUsd: 225000,
            inclusions: [
              "Festival title designation: 'Rolling Loud Miami Presented by [Brand]'",
              "Main stage naming rights and logo on all stage backdrops",
              "3 x 60-second spots in live stream broadcast",
              "Branded hospitality suite (capacity 50) for festival duration",
              "Artist collaboration opportunity (1 established artist)",
              "6 social media integrations across Rolling Loud channels",
            ],
            maxSponsors: 1,
          },
          {
            name: "Official Brand",
            priceUsd: 45000,
            inclusions: [
              "Branded activation zone in festival grounds (2,000 sq ft)",
              "Logo on official festival poster and digital materials",
              "2 co-branded social posts from Rolling Loud accounts",
              "20 VIP passes for festival duration",
            ],
            maxSponsors: 8,
          },
        ],
      },
    },
  });

  const jazzLincoln = await prisma.property.create({
    data: {
      slug: "jazz-lincoln-center",
      name: "Jazz at Lincoln Center",
      tagline: "Where jazz lives — New York's cultural crown jewel",
      category: "music",
      subcategory: "performing-arts",
      location: "New York, NY",
      region: "east",
      imageUrl: "https://picsum.photos/seed/jazz-lincoln-center/800/600",
      description:
        "Jazz at Lincoln Center is the world's leading institution dedicated to jazz music, presenting more than 100 concerts annually at Frederick P. Rose Hall and touring the globe with world-class performances. Its audience skews highly educated, culturally engaged, and affluent — with household incomes well above the national median. Sponsorship with Jazz at Lincoln Center delivers meaningful brand prestige and authentic alignment with culture, creativity, and excellence.",
      audienceTotalReach: 380000,
      audienceAgeRange: "35–65",
      audienceGender: "53% female, 47% male",
      audienceIncome: "affluent",
      priceFrom: 20000,
      availability: "Available — 2026–2027 Season",
      featured: false,
      tags: [
        "jazz",
        "classical",
        "music",
        "New York",
        "luxury",
        "culture",
        "arts",
      ],
      packages: {
        create: [
          {
            name: "Season Presenting Partner",
            priceUsd: 95000,
            inclusions: [
              "Presenting designation for 5 flagship concerts of the season",
              "Full-page program ad in all presenting concert programs",
              "Named in all digital and print promotion for presenting concerts",
              "Private pre-concert reception for 30 guests (catered, backstage access)",
              "20 premium seats per presenting concert",
              "Social media features on @JazzatLincolnCenter channels",
            ],
            maxSponsors: 1,
          },
          {
            name: "Concert Series Sponsor",
            priceUsd: 20000,
            inclusions: [
              "Logo in digital program for sponsored concert series",
              "Brand acknowledgment from stage at each concert",
              "8 premium seats per concert in the sponsored series",
              "1 co-branded social post per month during series",
            ],
            maxSponsors: 6,
          },
        ],
      },
    },
  });

  const artBasel = await prisma.property.create({
    data: {
      slug: "art-basel-miami",
      name: "Art Basel Miami Beach",
      tagline: "The world's premier modern and contemporary art fair",
      category: "arts",
      subcategory: "art-fair",
      location: "Miami Beach, FL",
      region: "south",
      imageUrl: "https://picsum.photos/seed/art-basel-miami/800/600",
      description:
        "Art Basel Miami Beach is the most prestigious art fair in the Americas, attracting 93,000 collectors, curators, artists, and tastemakers from 90+ countries over 6 days in December. The event generates $500M+ in art sales annually and commands an audience with household incomes averaging $400,000+. For luxury brands, Art Basel Miami is the single highest-density gathering of ultra-high-net-worth individuals in North America.",
      audienceTotalReach: 650000,
      audienceAgeRange: "30–65",
      audienceGender: "56% female, 44% male",
      audienceIncome: "affluent",
      priceFrom: 40000,
      availability: "Available — December 2026",
      featured: false,
      tags: ["art", "luxury", "culture", "Miami", "international", "UHNW"],
      packages: {
        create: [
          {
            name: "Presenting Patron",
            priceUsd: 180000,
            inclusions: [
              "Brand lounge at fair venue (2,000 sq ft, fully branded)",
              "Presenting designation for 1 flagship fair program/event",
              "Invitation-only collector dinner sponsorship (100 guests)",
              "Full-page ad in official Art Basel catalog (distributed globally)",
              "30 VIP passes for fair duration",
              "Artist commission opportunity — bespoke installation",
            ],
            maxSponsors: 1,
          },
          {
            name: "Cultural Partner",
            priceUsd: 40000,
            inclusions: [
              "Brand presence in partner lounge area",
              "Logo in official fair digital program and app",
              "12 VIP passes for fair duration",
              "1 co-branded Instagram post from @ArtBasel account",
            ],
            maxSponsors: 8,
          },
        ],
      },
    },
  });

  const tribeca = await prisma.property.create({
    data: {
      slug: "tribeca-film-festival",
      name: "Tribeca Film Festival",
      tagline: "Celebrating storytelling, independent voices, and innovation",
      category: "arts",
      subcategory: "film",
      location: "New York, NY",
      region: "east",
      imageUrl: "https://picsum.photos/seed/tribeca-film-festival/800/600",
      description:
        "Founded in the wake of 9/11 as a catalyst to revitalize Lower Manhattan, Tribeca has grown into one of the most influential film festivals in the world. Over 10 days in June, Tribeca presents 100+ films, 50+ talks and panels, and a Tribeca X program dedicated to branded entertainment. With 150,000 annual attendees and a premium media and entertainment audience, Tribeca is where culture, technology, and storytelling converge.",
      audienceTotalReach: 420000,
      audienceAgeRange: "25–50",
      audienceGender: "54% female, 46% male",
      audienceIncome: "premium",
      priceFrom: 30000,
      availability: "Available — June 2026",
      featured: false,
      tags: ["film", "storytelling", "New York", "culture", "arts", "media"],
      packages: {
        create: [
          {
            name: "Festival Sponsor",
            priceUsd: 120000,
            inclusions: [
              "Category exclusivity at festival",
              "Branded screening venue naming rights (1 venue)",
              "30-second spot on festival streaming platform",
              "Tribeca X branded entertainment panel (logo + co-host option)",
              "25 festival passes + 5 VIP gala invitations",
              "Logo on all festival signage, digital programs, and outdoor advertising",
            ],
            maxSponsors: 2,
          },
          {
            name: "Screening Sponsor",
            priceUsd: 30000,
            inclusions: [
              "Presenting sponsor designation for 2 screenings",
              "Logo in screening programs and on pre-show slides",
              "10 tickets to each sponsored screening",
              "Social media feature from @TribecaFilm account",
            ],
            maxSponsors: 10,
          },
        ],
      },
    },
  });

  const nycWineFood = await prisma.property.create({
    data: {
      slug: "nyc-wine-food-festival",
      name: "NYC Wine & Food Festival",
      tagline: "NYC's premier culinary event — tastings, talks, and celebrities",
      category: "food",
      subcategory: "culinary",
      location: "New York, NY",
      region: "east",
      imageUrl: "https://picsum.photos/seed/nyc-wine-food/800/600",
      description:
        "The NYC Wine & Food Festival is a four-day culinary extravaganza featuring 80+ events, 500+ chefs and sommeliers, and 50,000 food-obsessed attendees. Proceeds benefit God's Love We Deliver and No Kid Hungry, giving sponsors a compelling purpose-driven narrative. The audience skews upscale food enthusiasts with household incomes averaging $180,000 — prime targets for premium food, beverage, hospitality, and lifestyle brands.",
      audienceTotalReach: 290000,
      audienceAgeRange: "28–52",
      audienceGender: "60% female, 40% male",
      audienceIncome: "affluent",
      priceFrom: 18000,
      availability: "Available — October 2026",
      featured: false,
      tags: [
        "food",
        "wine",
        "culinary",
        "New York",
        "luxury",
        "charity",
        "hospitality",
      ],
      packages: {
        create: [
          {
            name: "Grand Tasting Sponsor",
            priceUsd: 85000,
            inclusions: [
              "Presenting designation for Grand Tasting marquee event (4,000 attendees)",
              "Branded sampling station inside Grand Tasting (500 sq ft)",
              "Celebrity chef cooking demonstration co-sponsorship",
              "Logo on all Grand Tasting materials and signage",
              "20 Grand Tasting tickets + 5 VIP access wristbands",
              "Full-page ad in official festival program",
            ],
            maxSponsors: 1,
          },
          {
            name: "Event Sponsor",
            priceUsd: 35000,
            inclusions: [
              "Presenting sponsorship of 1 festival event (cocktail class, tasting dinner, etc.)",
              "Logo in event program and on event signage",
              "10 tickets to sponsored event",
              "Inclusion in festival-wide digital promotion",
            ],
            maxSponsors: 5,
          },
          {
            name: "Festival Friend",
            priceUsd: 18000,
            inclusions: [
              "Logo on festival website and app",
              "8 general tasting passes",
              "Brand acknowledgment in festival newsletter (40,000 subscribers)",
            ],
            maxSponsors: 15,
          },
        ],
      },
    },
  });

  const tasteChicago = await prisma.property.create({
    data: {
      slug: "taste-of-chicago",
      name: "Taste of Chicago",
      tagline: "The world's largest food festival — 1M visitors, endless flavor",
      category: "food",
      subcategory: "culinary",
      location: "Chicago, IL",
      region: "midwest",
      imageUrl: "https://picsum.photos/seed/taste-of-chicago/800/600",
      description:
        "Taste of Chicago is the world's largest food festival, drawing over 1 million visitors to Grant Park over 5 summer days. With 80+ Chicago restaurants and vendors and live entertainment on multiple stages, the event is the defining civic gathering of Chicago's summer. For consumer brands seeking mass-market reach with Midwest authenticity and a genuine sense of community and joy, Taste of Chicago delivers unrivaled scale.",
      audienceTotalReach: 1800000,
      audienceAgeRange: "21–55",
      audienceGender: "mixed",
      audienceIncome: "mass-market",
      priceFrom: 12000,
      availability: "Available — July 2026",
      featured: false,
      tags: [
        "food",
        "festival",
        "Chicago",
        "mass-market",
        "family",
        "community",
      ],
      packages: {
        create: [
          {
            name: "Main Stage Partner",
            priceUsd: 55000,
            inclusions: [
              "Co-presenting designation on main entertainment stage",
              "Stage logo placement visible in all live stream coverage",
              "Branded activation tent near main stage (1,500 sq ft)",
              "In-festival announcements (20 per day)",
              "20 VIP hospitality passes for all 5 days",
            ],
            maxSponsors: 2,
          },
          {
            name: "Neighborhood Sponsor",
            priceUsd: 25000,
            inclusions: [
              "Branded zone designation in one festival neighborhood area",
              "Branded product sampling station (500 sq ft)",
              "Logo on neighborhood signage and digital screens",
              "10 VIP passes per day for festival duration",
            ],
            maxSponsors: 6,
          },
          {
            name: "Local Partner",
            priceUsd: 12000,
            inclusions: [
              "Logo on festival website and app",
              "Brand mention in daily stage announcements (1 per day)",
              "6 general admission passes per day",
            ],
            maxSponsors: 20,
          },
        ],
      },
    },
  });

  const xGames = await prisma.property.create({
    data: {
      slug: "x-games",
      name: "X Games Aspen",
      tagline: "The pinnacle of action sports — where legends are made",
      category: "lifestyle",
      subcategory: "action-sports",
      location: "Aspen, CO",
      region: "west",
      imageUrl: "https://picsum.photos/seed/x-games/800/600",
      description:
        "X Games Aspen is the world's premier action sports event, held each January at Buttermilk Mountain with 100,000+ on-site attendees and a global ESPN broadcast reaching 30M+ viewers across 190 countries. Featuring skateboarding, snowboarding, skiing, and moto disciplines, X Games attracts the most authentic action sports audience on the planet — passionate, brand-loyal, and highly influential within their peer networks.",
      audienceTotalReach: 3500000,
      audienceAgeRange: "16–34",
      audienceGender: "65% male, 35% female",
      audienceIncome: "premium",
      priceFrom: 35000,
      availability: "Available — January 2027",
      featured: false,
      tags: [
        "action-sports",
        "extreme",
        "Aspen",
        "ESPN",
        "youth",
        "lifestyle",
        "broadcast",
      ],
      packages: {
        create: [
          {
            name: "Gold Medal Sponsor",
            priceUsd: 175000,
            inclusions: [
              "Podium and medal ceremony presenting designation (category)",
              "Athlete apparel logo placement (helmet sticker) for 3 athletes",
              "30-second ad in ESPN broadcast (X Games Aspen prime time)",
              "On-mountain branded viewing deck (capacity 100)",
              "Co-branded athlete social content (3 athletes, 2 posts each)",
              "30 VIP hospitality passes for full event",
            ],
            maxSponsors: 1,
          },
          {
            name: "Trick Sponsor",
            priceUsd: 70000,
            inclusions: [
              "Branded best trick competition in one discipline",
              "Live announcer shout-outs during competition",
              "Logo on competition signage and event backdrops",
              "Athlete meet-and-greet event for 20 guests",
              "15 VIP passes for full event",
            ],
            maxSponsors: 3,
          },
          {
            name: "Fan Zone Sponsor",
            priceUsd: 35000,
            inclusions: [
              "Branded activation in fan zone (1,000 sq ft)",
              "Product sampling or interactive experience",
              "Logo on fan zone signage",
              "10 VIP passes for full event",
            ],
            maxSponsors: 8,
          },
        ],
      },
    },
  });

  // 3. Create threads with realistic conversations
  // Thread 1: LAFC — advertiser interested in Gold package
  const threadLAFC = await prisma.thread.create({
    data: {
      subject: "LAFC Gold Partner Inquiry — Q3 Activation",
      propertyId: lafc.id,
      messages: {
        create: [
          {
            sender: "advertiser",
            isAI: false,
            content:
              "Hi, we're a mid-size consumer tech brand looking to expand our presence in the Los Angeles market. We've been following LAFC for a couple of seasons and we're very interested in the Gold Partner package for the 2026 MLS season. Could you share more detail on the social media deliverables and any flexibility on the premium seat allocation?",
          },
          {
            sender: "property",
            isAI: true,
            content:
              "Thanks for reaching out — great to hear from a brand interested in partnering with LAFC! The Gold Partner package's social media component includes two co-branded posts per month across our Instagram (2.1M followers), Twitter/X (890K), and TikTok (650K) accounts. Our content team works with partners to develop posts that feel authentic to our club voice while showcasing your brand story. On premium seat allocation, the package includes 10 seats per home match — we have some flexibility on upgrading specific high-profile matches (like the El Tráfico rivalry match against LA Galaxy) to suite access for 2–3 of those. Would a call with our partnerships director this week work for you?",
          },
          {
            sender: "advertiser",
            isAI: false,
            content:
              "That's really helpful, thank you. The social media reach and El Tráfico suite option is very appealing. We'd love to set up a call. We're also curious whether there's an option to add a digital display activation in the South End of the stadium — our product has a strong resonance with the LAFC supporter culture. Is that something that could be added to the Gold tier?",
          },
        ],
      },
    },
  });

  // Thread 2: Coachella — negotiating custom activation
  const threadCoachella = await prisma.thread.create({
    data: {
      subject: "Coachella 2026 Experiential Partnership Discussion",
      propertyId: coachella.id,
      messages: {
        create: [
          {
            sender: "advertiser",
            isAI: false,
            content:
              "Hello — we represent a global premium beauty brand and we're exploring a major Coachella activation for 2026. We're interested in the Experiential Partner package, but we have a specific vision: a 6,000 sq ft immersive beauty pavilion combining product experiences, artist collaborations, and social content capture. We understand the listed package includes 5,000 sq ft — is there room to negotiate the footprint given our investment level?",
          },
          {
            sender: "property",
            isAI: true,
            content:
              "Thank you for your interest in Coachella 2026 — this sounds like a compelling vision and right in line with the caliber of activations we feature at the festival. To address your footprint question directly: yes, we do have capacity for enhanced space arrangements when the creative vision warrants it. Our brand partnership team works closely with Experiential Partners to identify the right location and layout. A 6,000 sq ft pavilion is achievable and we've done similar footprints for select partners in previous years. The additional square footage would be a negotiated addition to the base package, typically ranging from $40–80K depending on location preference (proximity to main stage is a premium). Would you like to schedule a creative briefing with our activations team? We'd want to review your pavilion concept before confirming the proposal.",
          },
          {
            sender: "advertiser",
            isAI: false,
            content:
              "That's encouraging! We're absolutely prepared to proceed with a creative briefing. Our internal activation budget is $580,000 all-in (including production). Given that, would the enhanced footprint, the live stream integration, and the artist collaboration component all be achievable within that range? We want to make sure we structure this correctly before briefing our CMO.",
          },
          {
            sender: "property",
            isAI: true,
            content:
              "Based on the budget you've outlined, we can build a compelling proposal. Here's a rough structure: Experiential Partner base at $500,000 (which includes the standard 5,000 sq ft, official designation, live stream integration, and 50 artist compound passes) + footprint upgrade to 6,000 sq ft at approximately $50,000, depending on final location. That puts you at $550,000 in rights fees, leaving $30,000 for ancillary activation support from our team. The artist collaboration piece is included as a part of the Experiential package — our brand partnerships team connects partners with one emerging or mid-tier artist for a co-branded creative moment. We're ready to move forward with the briefing — can you share your brand name and a brief creative deck ahead of the meeting?",
          },
        ],
      },
    },
  });

  // Thread 3: Art Basel — initial inquiry about presenting sponsorship
  const threadArtBasel = await prisma.thread.create({
    data: {
      subject: "Art Basel Miami Beach — Presenting Patron Inquiry",
      propertyId: artBasel.id,
      messages: {
        create: [
          {
            sender: "advertiser",
            isAI: false,
            content:
              "Good afternoon. We're a luxury Swiss watchmaker exploring cultural partnerships in North America for Q4 2026. Art Basel Miami Beach has long been a venue where our target clientele — ultra-high-net-worth collectors and tastemakers — congregate, and the alignment with craftsmanship, permanence, and artistry is a natural fit for our brand values. We'd like to understand what the Presenting Patron experience looks like in practice, particularly the invitation-only collector dinner component.",
          },
          {
            sender: "property",
            isAI: true,
            content:
              "Thank you for reaching out — the alignment you describe is exactly what draws so many of our most prestigious partners to Art Basel Miami Beach. The Presenting Patron package is our most bespoke offering, and we approach it as a genuine collaboration rather than a standard sponsorship. The invitation-only collector dinner is held on the Thursday evening of the fair (peak night, typically 300 collectors and art world leaders in attendance) with one Presenting Patron per dinner — your brand would have full presenting rights including branding, a welcome address by your CEO or brand ambassador, and seating coordination with our curatorial team to ensure you're alongside the most relevant collector profiles. Beyond the dinner, the bespoke installation component — where we commission an artist to create a work that reflects both the fair's ethos and your brand's heritage — has been one of the most talked-about activations in recent years. We'd be delighted to share case studies from previous Presenting Patrons under NDA.",
          },
        ],
      },
    },
  });

  // Thread 4: Taste of Chicago — community package discussion
  const threadTasteChicago = await prisma.thread.create({
    data: {
      subject: "Taste of Chicago — Local Partner Package",
      propertyId: tasteChicago.id,
      messages: {
        create: [
          {
            sender: "advertiser",
            isAI: false,
            content:
              "Hi there! We're a Chicago-based craft beverage company — non-alcoholic, natural ingredients — and we're seriously interested in the Local Partner package for Taste of Chicago 2026. We love the community angle and think our brand fits perfectly with the festival's spirit. One question: are there any product sampling add-ons available for Local Partners, or is that reserved for higher tiers?",
          },
          {
            sender: "property",
            isAI: true,
            content:
              "Welcome — we love seeing Chicago-based brands engage with Taste of Chicago, it's a perfect fit! To answer your question: product sampling is primarily included in the Neighborhood Sponsor tier and above, but we do offer a sampling add-on for Local Partners at $4,500 per day (minimum 2 days). That would give you a 200 sq ft sampling table with your branded setup in a designated area, running for your chosen days of the festival. Many of our Local Partners find this a great way to convert festival awareness into trial. Combined with the Local Partner base, you'd be looking at $12,000 + $9,000 for 2 sample days = $21,000 total — still well below the Neighborhood tier. Would that work for your team's budget?",
          },
          {
            sender: "advertiser",
            isAI: false,
            content:
              "That's really great to know — the add-on model works well for us. We'd likely want days 3, 4, and 5 of the festival (the weekend days with highest foot traffic). At 3 days that would be $12,000 + $13,500 = $25,500 total. Are there any other activation options at that budget level we should know about before we finalize?",
          },
        ],
      },
    },
  });

  // Thread 5: X Games — advertiser sending an offer
  const threadXGames = await prisma.thread.create({
    data: {
      subject: "X Games Aspen — Fan Zone Sponsorship Offer",
      propertyId: xGames.id,
      messages: {
        create: [
          {
            sender: "advertiser",
            isAI: false,
            content:
              "Hi — we're an energy drink brand well established in Europe, entering the US market in Q4 2026. X Games Aspen is exactly the right launchpad for us — the action sports audience is our core demographic and the ESPN broadcast reach is exactly what we need to build national brand awareness quickly. We'd like to activate at the Fan Zone level for January 2027. Given we're committing early (7 months out), would you consider a slight discount on the $35,000 Fan Zone package?",
          },
          {
            sender: "property",
            isAI: true,
            content:
              "Welcome to the X Games ecosystem — your timing is great, we still have Fan Zone slots available for Aspen 2027 and early commitments are valued by our team. On pricing: we typically hold firm on standard package rates as our sponsor community expects pricing parity, but for early commitment with a multi-year conversation, we can often add value rather than discount — for example, an additional athlete ambassador Instagram story or a featured placement in our pre-event digital preview content reaching 1.2M subscribers. If a multi-year deal (Aspen 2027 + Aspen 2028) is on the table, we'd be open to structuring a two-year rate that reflects that commitment. Would you like to put together a formal offer for us to review?",
          },
        ],
      },
    },
  });

  // 4. Create an offer on the X Games thread
  await prisma.offer.create({
    data: {
      threadId: threadXGames.id,
      amount: 33000,
      terms:
        "Fan Zone Sponsor — X Games Aspen January 2027. Includes 1,000 sq ft branded activation zone, product sampling rights for full event duration (4 days), logo on fan zone signage and digital screens, 10 VIP passes. Early commitment discount applied ($2,000 off standard rate). Brand name: [REDACTED — under NDA pending countersign]. Payment: 50% on contract execution, 50% 60 days prior to event.",
      status: "pending",
    },
  });

  // Second offer on Coachella thread — counter from property side
  await prisma.offer.create({
    data: {
      threadId: threadCoachella.id,
      amount: 550000,
      terms:
        "Coachella 2026 Experiential Partner — Enhanced footprint. Includes 6,000 sq ft branded pavilion (location: adjacent to Sahara Stage, confirmed), official Presenting Partner designation across all marketing, live stream integration (both weekends), emerging artist collaboration (TBD — selection in November 2025), 50 artist compound passes + 100 VIP wristbands per weekend. Production support from Coachella activations team (10 hours). Payment schedule: 30% on execution, 40% January 15 2026, 30% March 1 2026.",
      status: "pending",
    },
  });

  console.log("Seed complete");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
