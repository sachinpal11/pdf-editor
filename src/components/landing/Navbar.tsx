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
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between"
      style={{
        background: 'transparent',
        backdropFilter: 'blur(16px)',
        // borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '14px 40px',
      }}
    >
      <Logo />

      {/* Center links */}
      <div
        className="hidden md:flex items-center"
        style={{ gap: 36, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
      >
        {links.map((l) => (
          <a
            key={l}
            href="#"
            className="transition-colors duration-150"
            style={{ fontSize: 13, fontWeight: 400, color: '#e8e8e8ff', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#e8e8e8ff')}
          >
            {l}
          </a>
        ))}
      </div>

      {/* Right actions */}
      <div className="hidden md:flex items-center">
        <button
          onClick={onGetStarted}
          className="transition-all duration-150 w-full  sm:w-auto rounded-xl "
          style={{
            background: 'linear-gradient(0deg, #F5520C 0%, #FF823E 100%)',
            padding: '8px 12px', fontSize: 12, fontWeight: 400, color: 'white',
            border: '1.5px solid rgba(255, 154, 100, 0.79)', cursor: 'pointer',
            // boxShadow: '0 0 40px rgba(245,82,12,0.45), 0 4px 20px rgba(0,0,0,0.3)',
            maxWidth: 320,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(245,82,12,0.6), 0 4px 10px rgba(0,0,0,0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }} //reset to boxshadow none
        >
          Get Started Free
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile sidebar overlay */}
      <div
        className="md:hidden fixed inset-0 z-[199] transition-opacity duration-300"
        style={{
          pointerEvents: menuOpen ? 'auto' : 'none',
          opacity: menuOpen ? 1 : 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile sidebar panel */}
      <div
        className="md:hidden fixed top-0 right-0 h-[100vh] bottom-0 z-[200] flex flex-col"
        style={{
          width: 260,
          background: '#0A0A0A',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          padding: '24px 20px',
          gap: 8,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 32 }}>
          <Logo />
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888888' }}
            onClick={() => setMenuOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Links */}
        {links.map((l) => (
          <a
            key={l}
            href="#"
            style={{
              fontSize: 15, color: '#AAAAAA', textDecoration: 'none',
              padding: '10px 12px', borderRadius: 8,
              transition: 'color 150ms, background 150ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#AAAAAA'; e.currentTarget.style.background = 'transparent'; }}
          >
            {l}
          </a>
        ))}

        {/* CTA */}
        <button
          onClick={() => { setMenuOpen(false); onGetStarted(); }}
          style={{
            marginTop: 'auto',
            background: 'linear-gradient(0deg, #F5520C 0%, #FF823E 100%)',
            borderRadius: 10, padding: '12px 20px',
            fontSize: 14, fontWeight: 600, color: 'white',
            border: '1.5px solid rgba(255,154,100,0.79)', cursor: 'pointer',
          }}
        >
          Get Started Free
        </button>
      </div>
    </nav>
  );
}
