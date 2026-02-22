import Link from "next/link";
import { SectionReveal } from "./section-reveal";

/* ─── Brand logos using proper SVG paths ─── */

function GopuffLogo() {
  return (
    <svg viewBox="0 0 80 22" className="w-[58px]">
      <text x="40" y="17" fill="#00247D" fontSize="17" fontWeight="800" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="-0.5">gopuff</text>
    </svg>
  );
}

function CocaColaLogo() {
  return (
    <svg viewBox="0 0 100 24" className="w-[62px]">
      <text x="50" y="19" fill="#F40009" fontSize="16" fontWeight="700" fontFamily="'Georgia', serif" textAnchor="middle" fontStyle="italic" letterSpacing="-0.5">Coca-Cola</text>
    </svg>
  );
}

function SnapchatLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-[36px]" fill="#FFFC00">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
    </svg>
  );
}

function McDonaldsLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-[36px]" fill="#FFC72C">
      <path d="M17.243 3.006c2.066 0 3.742 8.714 3.742 19.478H24c0-11.588-3.042-20.968-6.766-20.968-2.127 0-4.007 2.81-5.248 7.227-1.241-4.416-3.121-7.227-5.231-7.227C3.031 1.516 0 10.888 0 22.476h3.014c0-10.763 1.658-19.47 3.724-19.47 2.066 0 3.741 8.05 3.741 17.98h2.997c0-9.93 1.684-17.98 3.75-17.98Z"/>
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 24 16" className="w-[40px]">
      <circle cx="8.5" cy="8" r="7" fill="#EB001B"/>
      <circle cx="15.5" cy="8" r="7" fill="#F79E1B"/>
      <path d="M12 2.4a7 7 0 0 1 0 11.2 7 7 0 0 1 0-11.2z" fill="#FF5F00"/>
    </svg>
  );
}

function KalshiLogo() {
  return (
    <svg viewBox="0 0 70 22" className="w-[56px]">
      <text x="35" y="17" fill="#1A1A1A" fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="-0.3">Kalshi</text>
    </svg>
  );
}

function BrexLogo() {
  return (
    <svg viewBox="0 0 50 22" className="w-[44px]">
      <text x="25" y="17" fill="white" fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="-0.3">Brex</text>
    </svg>
  );
}

function TikTokLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-[30px]" fill="#000000">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

function AllyLogo() {
  return (
    <svg viewBox="0 0 42 22" className="w-[40px]">
      <text x="21" y="17" fill="#6F2DA8" fontSize="18" fontWeight="800" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="-0.3">ally</text>
    </svg>
  );
}

function LegoLogo() {
  return (
    <svg viewBox="0 0 60 22" className="w-[52px]">
      <text x="30" y="17" fill="white" fontSize="17" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="2">LEGO</text>
    </svg>
  );
}

/* ─── Rightsholder logos ─── */

function LafcLogo() {
  return (
    <svg viewBox="0 0 50 20" className="w-[44px]">
      <text x="25" y="16" fill="#C39E6D" fontSize="14" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="1">LAFC</text>
    </svg>
  );
}

function SerieALogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-[36px]">
      <path d="M18.7 8.6c-.2-1.4-1-2.6-2.2-3.3C15 4.3 13 4 11.5 4.8c-1 .5-1.7 1.3-2.2 2.3-.6 1.3-.6 2.8-.1 4.1.4 1 1.1 1.9 2 2.5.5.3.6.5.5.8-.2.7-.5 1.3-.8 2-.2.3-.3.4-.6.2-1.3-.7-2.3-1.7-3-3.1-1.1-2.2-1.2-4.5-.3-6.8C8 4.3 10 2.6 12.7 2.1c2.3-.5 4.4 0 6.1 1.5 1.3 1.1 2 2.6 2.2 4.3.2 2.5-.5 4.6-2.2 6.4-.9 1-2 1.6-3.3 2-.4.1-.5 0-.5-.4 0-.7 0-1.3.1-2 0-.3.1-.4.4-.5 1.3-.4 2.2-1.2 2.8-2.4.6-1.1.6-2.3.4-3.4z" fill="#024494"/>
    </svg>
  );
}

function SxswLogo() {
  return (
    <svg viewBox="0 0 68 20" className="w-[54px]">
      <text x="34" y="16" fill="#1A1A1A" fontSize="16" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="1.5">SXSW</text>
    </svg>
  );
}

function WeBelongHereLogo() {
  return (
    <svg viewBox="0 0 52 30" className="w-[44px]">
      <text x="26" y="10" fill="#1A1A1A" fontSize="9" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.5">WE</text>
      <text x="26" y="19" fill="#1A1A1A" fontSize="7" fontWeight="800" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.3">BELONG</text>
      <text x="26" y="28" fill="#1A1A1A" fontSize="9" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.5">HERE</text>
    </svg>
  );
}

function AtpTourLogo() {
  return (
    <svg viewBox="0 0 50 26" className="w-[42px]">
      <text x="25" y="15" fill="#00237D" fontSize="16" fontWeight="900" fontFamily="Georgia, serif" textAnchor="middle" fontStyle="italic">ATP</text>
      <text x="25" y="24" fill="#00237D" fontSize="7" fontWeight="600" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="2">TOUR</text>
    </svg>
  );
}

function PgaLogo() {
  return (
    <svg viewBox="0 0 40 20" className="w-[36px]">
      <text x="20" y="16" fill="white" fontSize="14" fontWeight="800" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.5">PGA</text>
    </svg>
  );
}

function NascarLogo() {
  return (
    <svg viewBox="0 0 80 18" className="w-[60px]">
      <text x="40" y="15" fill="#1A1A1A" fontSize="14" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" fontStyle="italic" letterSpacing="0.5">NASCAR</text>
    </svg>
  );
}

function RockiesLogo() {
  return (
    <svg viewBox="0 0 30 22" className="w-[30px]">
      <text x="15" y="18" fill="white" fontSize="17" fontWeight="900" fontFamily="Georgia, serif" textAnchor="middle" fontStyle="italic">CR</text>
    </svg>
  );
}

function OutsideLandsLogo() {
  return (
    <svg viewBox="0 0 66 22" className="w-[52px]">
      <text x="33" y="10" fill="#2D5A27" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif" textAnchor="middle">Outside</text>
      <text x="33" y="20" fill="#2D5A27" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif" textAnchor="middle">Lands</text>
    </svg>
  );
}

function ArtBaselLogo() {
  return (
    <svg viewBox="0 0 70 16" className="w-[56px]">
      <text x="35" y="13" fill="#1A1A1A" fontSize="14" fontWeight="700" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="-0.3">Art Basel</text>
    </svg>
  );
}

/* ─── Hex cell — optional fill color for branded hexes ─── */

function HexCell({ children, hexFill }: { children: React.ReactNode; hexFill?: string }) {
  return (
    <div className="w-[110px] h-[124px] flex-shrink-0 relative flex items-center justify-center">
      {/* Hex shape background */}
      <svg viewBox="0 0 80 90" className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.04))" }}>
        <path
          d="M36.4 4.6a12 12 0 0 1 7.2 0l22.2 12a12 12 0 0 1 6.2 10.5v23.8a12 12 0 0 1-6.2 10.5l-22.2 12a12 12 0 0 1-7.2 0L14.2 61.4A12 12 0 0 1 8 50.9V27.1a12 12 0 0 1 6.2-10.5Z"
          fill={hexFill || "white"}
          stroke={hexFill ? "transparent" : "#e4e4e7"}
          strokeWidth="1"
        />
      </svg>
      {/* Logo — centered on hex visual center and constrained */}
      <div className="relative z-10 flex items-center justify-center w-[70px] h-[70px] overflow-hidden -mt-3">
        {children}
      </div>
    </div>
  );
}

/* ─── Hex grid layout ─── */

interface HexItem {
  logo: React.ReactNode;
  hexFill?: string;
}

function HexGrid({ rows }: { rows: HexItem[][] }) {
  return (
    <div className="flex flex-col items-center -space-y-6 mt-6 mb-8">
      {rows.map((row, ri) => (
        <div key={ri} className="flex items-center justify-center -space-x-2">
          {row.map((item, ci) => (
            <HexCell key={ci} hexFill={item.hexFill}>{item.logo}</HexCell>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Brand rows: 3-4-3 ─── */
const brandRows: HexItem[][] = [
  [
    { logo: <GopuffLogo /> },
    { logo: <CocaColaLogo /> },
    { logo: <SnapchatLogo /> },
  ],
  [
    { logo: <McDonaldsLogo /> },
    { logo: <MastercardLogo /> },
    { logo: <KalshiLogo /> },
    { logo: <BrexLogo />, hexFill: "#1A1A1A" },
  ],
  [
    { logo: <TikTokLogo /> },
    { logo: <AllyLogo /> },
    { logo: <LegoLogo />, hexFill: "#D01012" },
  ],
];

/* ─── Rightsholder rows: 3-4-3 ─── */
const rightsholderRows: HexItem[][] = [
  [
    { logo: <LafcLogo />, hexFill: "#1A1A1A" },
    { logo: <SerieALogo /> },
    { logo: <SxswLogo /> },
  ],
  [
    { logo: <WeBelongHereLogo /> },
    { logo: <AtpTourLogo /> },
    { logo: <PgaLogo />, hexFill: "#00205B" },
    { logo: <NascarLogo /> },
  ],
  [
    { logo: <RockiesLogo />, hexFill: "#33006F" },
    { logo: <OutsideLandsLogo /> },
    { logo: <ArtBaselLogo /> },
  ],
];

export function ForBrandsRightsholders() {
  return (
    <section className="py-20 px-4 bg-zinc-50">
      <SectionReveal>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For Brands */}
          <div className="group rounded-2xl bg-zinc-100/80 border border-zinc-200 p-8 pb-6 flex flex-col overflow-hidden">
            <h2 className="text-2xl font-normal tracking-[-0.02em] text-center text-zinc-900">
              For Brands
            </h2>
            <p className="mt-3 text-sm text-muted-foreground text-center leading-relaxed">
              Anvara puts premium sponsorships just a few clicks away. Built for
              speed. Free to explore.
            </p>
            <div className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 flex-1">
              <HexGrid rows={brandRows} />
            </div>
            <div className="-mt-40 flex justify-center relative z-20">
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-md"
              >
                Anvara for Brands
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* For Rightsholders */}
          <div className="group rounded-2xl bg-zinc-100/80 border border-zinc-200 p-8 pb-6 flex flex-col overflow-hidden">
            <h2 className="text-2xl font-normal tracking-[-0.02em] text-center text-zinc-900">
              For Rightsholders
            </h2>
            <p className="mt-3 text-sm text-muted-foreground text-center leading-relaxed">
              Anvara puts premium sponsorships just a few clicks away. Built for
              speed. Free to explore.
            </p>
            <div className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 flex-1">
              <HexGrid rows={rightsholderRows} />
            </div>
            <div className="-mt-40 flex justify-center relative z-20">
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-md"
              >
                Anvara for Rightsholders
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
