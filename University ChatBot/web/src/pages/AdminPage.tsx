import { useEffect, useState } from 'react';
import { healthCheck } from '../api/client';

export function AdminPage() {
  const [isApiOnline, setIsApiOnline] = useState<boolean | null>(null);

  // Ping the FastAPI backend on load
  useEffect(() => {
    healthCheck().then(status => setIsApiOnline(status));
  }, []);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-6 lg:p-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-10 animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-sm text-slate-400">Manage knowledge bases and monitor system analytics.</p>
        </div>

        {/* Real-time Server Status */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">API Status</span>
          <div className="flex items-center gap-2">
            {isApiOnline === null ? (
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500 animate-pulse" />
            ) : isApiOnline ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] animate-pulse" />
                <span className="text-sm font-medium text-emerald-400">Online</span>
              </>
            ) : (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                <span className="text-sm font-medium text-red-500">Offline</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-10 space-y-6">

        {/* Top Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {[
            { label: 'Total Queries (24h)', value: '1,248', trend: '+12%', color: 'text-emerald-400' },
            { label: 'Active Sessions', value: '42', trend: '+5%', color: 'text-emerald-400' },
            { label: 'Avg. Response Time', value: '1.2s', trend: '-0.3s', color: 'text-[#5BB3E8]' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">{stat.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-white">{stat.value}</span>
                <span className={`text-sm font-medium ${stat.color}`}>{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Knowledge Base Management */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Active Knowledge Base</h2>
              <p className="text-xs text-slate-400 mt-1">Vector DB initialized • Chroma SQLite</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-[#0060AA]/20 border border-[#0060AA]/50 text-[#5BB3E8] text-sm font-medium hover:bg-[#0060AA]/40 transition-colors">
              Ingest New Data
            </button>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {[
              { name: 'B._Sc._Cyber_Security_handbook.pdf', status: 'Indexed', date: 'Just now' },
              { name: 'B._Tech_CSE_Handbook.pdf', status: 'Indexed', date: '2 hours ago' },
              { name: 'BCA_AI_&_DS_handbook.pdf', status: 'Indexed', date: '2 hours ago' },
            ].map((doc, i) => (
              <div key={i} className="py-4 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E31E24]/10 border border-[#E31E24]/20 text-[#E31E24] flex items-center justify-center">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200 group-hover:text-[#5BB3E8] transition-colors">{doc.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Uploaded {doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                  <span className="text-xs font-medium text-slate-400">{doc.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}