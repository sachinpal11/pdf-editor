const navColumns = [
  {
    header: 'Resources',
    links: ['Pricing', 'Blog', 'Support'],
  },
  {
    header: 'Legal',
    links: ['Terms of use', 'Privacy policy', 'Cookie policy'],
  },
  {
    header: 'Socials',
    links: ['X (Twitter)', 'Facebook', 'LinkedIn'],
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0A0A0A] overflow-hidden">
      {/* Bottom-left radial glow */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          inset: 0,
          background: 'radial-gradient(ellipse 600px 500px at 12% 90%, rgba(160,55,15,0.65) 0%, rgba(90,25,5,0.25) 50%, transparent 75%)',
        }}
      />

      {/* TOP ZONE */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start px-6 md:px-12 lg:px-[72px] pt-12 gap-16 lg:gap-0">

        {/* LEFT — Newsletter */}
        <div className="w-full lg:max-w-[420px]">
          <h2 className="text-[18px] font-medium text-white leading-[1.2] m-0">
            Join our newsletter
          </h2>
          <p className="text-[13px] font-normal text-[#9A9A9A] mt-1 leading-[1.4]">
            Stay updated with the latest PDF tools, features, and tips.
          </p>

          {/* Input row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-[#1C1C1C] border border-white/[0.08] rounded-[10px] px-4 py-[11px] text-[14px] text-white placeholder-[#555555] outline-none focus:border-white/20 transition-colors duration-150"
            />
            <button
              className="whitespace-nowrap text-white text-[14px] font-semibold rounded-xl px-5 py-[11px] cursor-pointer transition-all duration-150 hover:shadow-[0_0_20px_rgba(245,82,12,0.5)] hover:-translate-y-px"
              style={{ background: 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)', border: '1.5px solid rgba(255,154,100,0.79)' }}
            >
              Subscribe
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-[#555555] mt-3">
            By subscribing you agree to with our{' '}
            <a
              href="#"
              className="text-[#888888] underline underline-offset-2 hover:text-white transition-colors duration-150"
            >
              Privacy Policy
            </a>
          </p>
        </div>

        {/* RIGHT — Nav columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-10 lg:flex lg:flex-row lg:gap-20 lg:ml-auto w-full lg:w-auto">
          {navColumns.map((col) => (
            <div key={col.header}>
              <p className="text-[13px] font-medium text-white mb-4">{col.header}</p>
              <div className="flex flex-col">
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[13px] font-normal text-[#7a7a7a] no-underline leading-[2.0] hover:text-white transition-colors duration-150"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM ZONE — Wordmark */}
      <div className="relative z-10 w-full text-center pt-20 pb-10 overflow-hidden">
        <p
          className="font-black font-medium whitespace-nowrap leading-[0.85] tracking-[-0.025em] text-white"
          style={{ fontSize: 'clamp(48px, 15vw, 210px)' }}
        >
          OnTheGo<span
            style={{
              background: 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >PDF</span>
        </p>
      </div>
    </footer>
  );
}
