import { Link, useLocation } from 'react-router-dom';

interface LayoutProps { children: React.ReactNode; }

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isChat = location.pathname === '/chat' || location.pathname === '/';
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">

      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-slate-200 flex flex-col flex-shrink-0">
        {/* Branding */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link to="/chat" className="flex items-center gap-3 decoration-transparent">
            <div className="w-8 h-8 rounded bg-krmu-blue text-white flex items-center justify-center font-bold text-sm shadow-sm-soft">
              K
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-slate-800 leading-tight">SOET AI</span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Academic Portal</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link
            to="/chat"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${isChat ? 'bg-krmu-blue-lt text-krmu-blue' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Chat
          </Link>
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${isAdmin ? 'bg-krmu-blue-lt text-krmu-blue' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Admin Analytics
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative">
        {children}
      </main>
    </div>
  );
}