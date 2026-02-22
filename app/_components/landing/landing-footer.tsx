const footerLinks = {
  Product: ["Marketplace", "Intelligence", "Analytics", "Pricing"],
  "For Rightsholders": ["List Property", "Dashboard", "Resources"],
  "For Agencies": ["Agency Tools", "Contact Us"],
  Company: ["About", "Careers", "Privacy"],
};

export function LandingFooter() {
  return (
    <footer>
      {/* Tagline + Watermark section */}
      <div className="bg-white overflow-hidden">
        {/* Tagline row */}
        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xl font-semibold text-zinc-800">
            Opportunities don&rsquo;t chase you.
          </p>
          <p className="text-xl font-semibold text-zinc-800">
            Discover them with Anvara.
          </p>
        </div>

        {/* Large watermark text */}
        <div className="relative flex items-end justify-center overflow-hidden select-none pointer-events-none" style={{ height: "160px" }}>
          <span
            className="absolute bottom-0 text-zinc-200 font-black leading-none tracking-tighter"
            style={{ fontSize: "clamp(80px, 18vw, 200px)", lineHeight: 1 }}
          >
            anvara
          </span>
        </div>
      </div>

      {/* Dark footer section */}
      <div className="bg-zinc-950 text-white pt-14 pb-6 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Link columns + Newsletter */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-white/10">
            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
                  {category}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <span className="text-sm text-white/60 hover:text-white cursor-pointer transition-colors">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
                Newsletter
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  readOnly
                  className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none cursor-default"
                />
                <button
                  type="button"
                  className="bg-primary text-white text-xs font-semibold px-3 py-2 rounded-md whitespace-nowrap hover:opacity-90 transition-opacity cursor-default"
                >
                  Get Started
                </button>
              </div>
              <p className="mt-2 text-xs text-white/30">
                We won&rsquo;t spam you. Only the important stuff.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-4 text-xs text-white/30">
              <span>2025 Anvara</span>
              <span>·</span>
              <span>Prototype by Max Beato</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/30">
              <span className="hover:text-white/60 cursor-pointer transition-colors">
                LinkedIn
              </span>
              <span className="hover:text-white/60 cursor-pointer transition-colors">
                Terms and Conditions
              </span>
              <span className="hover:text-white/60 cursor-pointer transition-colors">
                Privacy Policy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky prototype badge */}
      <div className="fixed bottom-3 right-3 z-50 px-4 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 text-[11px] text-white/50 pointer-events-none">
        Prototype by Max Beato
      </div>
    </footer>
  );
}
