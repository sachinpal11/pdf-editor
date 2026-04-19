'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

interface Props {
  onGetStarted: () => void;
}

const links = ['Features', 'Pricing', 'Tools', 'Blog'];

export default function Navbar({ onGetStarted }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-[14px] backdrop-blur-[16px]">
      <Logo />

      {/* Center links */}
      <div className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
        {links.map((l) => (
          <a key={l} href="#" className="text-[13px] font-normal text-[#e8e8e8] hover:text-white transition-colors duration-150 no-underline">
            {l}
          </a>
        ))}
      </div>

      {/* Right actions */}
      <div className="hidden md:flex items-center">
        <button
          onClick={onGetStarted}
          className="rounded-xl text-[12px] font-normal text-white cursor-pointer transition-all duration-150 hover:shadow-[0_0_20px_rgba(245,82,12,0.6),0_4px_10px_rgba(0,0,0,0.2)]"
          style={{ background: 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)', padding: '8px 12px', border: '1.5px solid rgba(255,154,100,0.79)' }}
        >
          Get Started Free
        </button>
      </div>

      {/* Mobile hamburger */}
      <button className="md:hidden bg-transparent border-none cursor-pointer text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu" aria-expanded={menuOpen}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile sidebar overlay */}
      <div
        className="md:hidden fixed inset-0 z-[199] transition-opacity duration-300"
        style={{ pointerEvents: menuOpen ? 'auto' : 'none', opacity: menuOpen ? 1 : 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile sidebar panel */}
      <div
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className="md:hidden fixed top-0 right-0 h-screen z-[200] flex flex-col w-[260px] border-l border-white/[0.07] bg-[#0A0A0A]"
        style={{ padding: '24px 20px', gap: 8, transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <button className="bg-transparent border-none cursor-pointer text-[#888888]" onClick={() => setMenuOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {links.map((l) => (
          <a
            key={l}
            href="#"
            className="text-[15px] text-[#AAAAAA] no-underline px-3 py-[10px] rounded-lg transition-colors duration-150 hover:text-white hover:bg-white/5"
          >
            {l}
          </a>
        ))}

        <button
          onClick={() => { setMenuOpen(false); onGetStarted(); }}
          className="mt-auto rounded-[10px] text-[14px] font-semibold text-white cursor-pointer"
          style={{ background: 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)', padding: '12px 20px', border: '1.5px solid rgba(255,154,100,0.79)' }}
        >
          Get Started Free
        </button>
      </div>
    </nav>
  );
}
