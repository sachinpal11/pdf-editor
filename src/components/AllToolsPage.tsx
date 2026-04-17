'use client';

import { useRouter } from 'next/navigation';
import Navbar from './landing/Navbar';
import { FileEdit, FilePlus, FileX, FileSearch, FileSignature, FileArchive, FileOutput, FileLock } from 'lucide-react';

const tools = [
  { icon: FileEdit, label: 'Edit PDF', desc: 'Click any text to edit it', route: '/upload', active: true },
  { icon: FilePlus, label: 'Merge PDF', desc: 'Combine multiple PDFs into one', route: null },
  { icon: FileX, label: 'Split PDF', desc: 'Extract pages from a PDF', route: null },
  { icon: FileOutput, label: 'PDF to Word', desc: 'Convert PDF to editable Word', route: null },
  { icon: FileSearch, label: 'Compress PDF', desc: 'Reduce PDF file size', route: null },
  { icon: FileSignature, label: 'Sign PDF', desc: 'Add your signature to a PDF', route: null },
  { icon: FileArchive, label: 'PDF to ZIP', desc: 'Archive PDFs into a ZIP', route: null },
  { icon: FileLock, label: 'Protect PDF', desc: 'Password-protect your PDF', route: null },
];

export default function AllToolsPage() {
  const router = useRouter();

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', fontFamily: "'Nimbus Sans Thai', sans-serif", color: '#FFFFFF' }}>
      <Navbar onGetStarted={() => router.push('/all-tools')} />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '120px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#F5520C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>All Tools</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Everything you need for PDFs
          </h1>
          <p style={{ fontSize: 15, color: '#666666', maxWidth: 480 }}>
            Powerful PDF tools that run entirely in your browser. No uploads, no accounts.
          </p>
        </div>

        {/* Tools grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: 16 }}
        >
          {tools.map(({ icon: Icon, label, desc, route, active }) => (
            <div
              key={label}
              onClick={() => active && route && router.push(route)}
              className="transition-all duration-200"
              style={{
                background: '#111111',
                border: active ? '1px solid rgba(245,82,12,0.3)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
                padding: 24,
                cursor: active ? 'pointer' : 'default',
                position: 'relative',
                opacity: active ? 1 : 0.5,
              }}
              onMouseEnter={(e) => {
                if (!active) return;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(245,82,12,0.6)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                if (!active) return;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(245,82,12,0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Active badge */}
              {active && (
                <span style={{
                  position: 'absolute', top: 14, right: 14,
                  background: 'rgba(245,82,12,0.15)', color: '#F5520C',
                  border: '1px solid rgba(245,82,12,0.3)',
                  borderRadius: 999, padding: '2px 8px',
                  fontSize: 10, fontWeight: 600,
                }}>
                  Available
                </span>
              )}

              {/* Coming soon badge */}
              {!active && (
                <span style={{
                  position: 'absolute', top: 14, right: 14,
                  background: 'rgba(255,255,255,0.05)', color: '#555555',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 999, padding: '2px 8px',
                  fontSize: 10, fontWeight: 600,
                }}>
                  Soon
                </span>
              )}

              {/* Icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 12, marginBottom: 16,
                background: active ? 'rgba(245,82,12,0.15)' : 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={20} color={active ? '#F5520C' : '#444444'} />
              </div>

              <p style={{ fontSize: 14, fontWeight: 700, color: active ? '#FFFFFF' : '#555555', marginBottom: 6 }}>{label}</p>
              <p style={{ fontSize: 12, color: active ? '#666666' : '#3A3A3A', lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
