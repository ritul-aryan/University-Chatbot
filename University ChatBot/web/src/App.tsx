import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ChatPage } from './pages/ChatPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname.startsWith('/admin') ? 'admin' : 'chat';

  return (
    <div className="h-screen w-screen flex font-sans text-white overflow-hidden bg-[#020305] relative">

      {/* 🌊 ACCELERATED & VISIBLE OCEAN SWELLS 🌊 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

        {/* 1. KRMU BLUE SWELL (Left Side) */}
        {/* Ellipse creates a natural curved wave face */}
        <div
          className="absolute mix-blend-screen animate-ocean-blue will-change-transform"
          style={{
            top: '-20vh',
            left: '-80vw', // Safe buffer outside the left edge
            width: '200vw',
            height: '140vh',
            background: 'radial-gradient(45% 100% at 0% 50%, rgba(0,96,170,0.85) 0%, transparent 100%)',
            filter: 'blur(90px)',
          }}
        />

        {/* 2. KRMU RED CREST (Right Side) */}
        {/* Highly visible, sweeps to 75%, never exposes the right edge */}
        <div
          className="absolute mix-blend-screen animate-ocean-red will-change-transform"
          style={{
            top: '-20vh',
            right: '-80vw', // Safe buffer outside the right edge
            width: '200vw',
            height: '140vh',
            background: 'radial-gradient(40% 100% at 100% 50%, rgba(227,30,36,0.85) 0%, transparent 100%)',
            filter: 'blur(90px)',
          }}
        />

        {/* 3. DEEP CYAN/BLUE DEPTH (Bottom Upwelling) */}
        <div
          className="absolute mix-blend-screen animate-ocean-depth will-change-transform"
          style={{
            bottom: '-50vh',
            left: '0vw',
            width: '100vw',
            height: '150vh',
            background: 'radial-gradient(100% 50% at 50% 100%, rgba(26,126,196,0.6) 0%, transparent 100%)',
            filter: 'blur(100px)'
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          SLEEK SIDEBAR
      ══════════════════════════════════════════════════════ */}
      <aside className="flex-shrink-0 flex flex-col z-20 w-[220px] px-3 py-6 border-r border-white/[0.04] bg-[#030408]/50 backdrop-blur-xl">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#1A7EC4] to-[#0060AA] shadow-[0_0_20px_rgba(0,96,170,0.5)] border border-white/20">
            <span className="font-bold text-white text-[14px]">K</span>
          </div>
          <div>
            <p className="font-semibold text-[13px] text-white leading-tight tracking-wide">SOET AI</p>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1.5">
          <button
            onClick={() => navigate('/chat')}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 border ${activeTab === 'chat'
                ? 'bg-white/[0.08] border-white/10 text-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]'
              }`}
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="font-medium text-[13px]">Chat</span>
          </button>

          <button
            onClick={() => navigate('/admin')}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 border ${activeTab === 'admin'
                ? 'bg-white/[0.08] border-white/10 text-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]'
              }`}
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="font-medium text-[13px]">Admin Analytics</span>
          </button>
        </nav>
      </aside>

      {/* ══════════════════════════════════════════════════════
          MAIN PANEL
      ══════════════════════════════════════════════════════ */}
      <main className="flex-1 relative p-3 lg:p-5 z-10 flex">
        <div className="w-full h-full rounded-[24px] overflow-hidden flex flex-col bg-[#07090E]/65 backdrop-blur-[45px] border border-white/[0.08] shadow-[0_0_60px_-15px_rgba(0,0,0,0.7)]">
          <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </main>

      {/* Embedded CSS for Calming Ocean Dynamics */}
      <style>{`
        /* The Blue Swell */
        @keyframes ocean-blue {
          0% { transform: translate3d(0vw, 0vh, 0); opacity: 0.40; }
          100% { transform: translate3d(70vw, 0vh, 0); opacity: 0.75; }
        }

        /* The Red Crest */
        @keyframes ocean-red {
          0% { transform: translate3d(0vw, 0vh, 0); opacity: 0.30; }
          100% {
            /* Moves inward exactly 75vw. Because the buffer is 80vw,
               the extreme right edge stays safely 5vw off-screen! */
            transform: translate3d(-75vw, 0vh, 0);
            opacity: 0.70;
          }
        }

        /* The Depth */
        @keyframes ocean-depth {
          0% { transform: translate3d(0vw, 0vh, 0); opacity: 0.30; }
          100% { transform: translate3d(0vw, -20vh, 0); opacity: 0.60; }
        }

        /* Accelerated timings (8 to 12s) so the UI feels immediately responsive */
        .animate-ocean-blue { animation: ocean-blue 8s ease-in-out infinite alternate; }
        .animate-ocean-red { animation: ocean-red 10s ease-in-out infinite alternate; }
        .animate-ocean-depth { animation: ocean-depth 12s ease-in-out infinite alternate-reverse; }

        .will-change-transform { will-change: transform, opacity; }
      `}</style>
    </div>
  );
}