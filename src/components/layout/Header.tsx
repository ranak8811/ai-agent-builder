import React from 'react';

interface HeaderProps {
  loading: boolean;
  onReload: () => void;
  sessionTime: number;
}

export const Header: React.FC<HeaderProps> = ({ loading, onReload, sessionTime }) => {
  return (
    <header className="mb-10 flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-slate-200 pb-8">
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          System v2.4.0 Active
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          AI Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Orchestrator</span>
        </h1>
        <p className="text-slate-500 mt-1 font-medium">Professional grade autonomous agent assembly interface.</p>
      </div>
      
      <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
        <div className="px-4 py-2 border-r border-slate-100">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Uptime</p>
          <p className="text-sm font-mono font-bold text-slate-700">{sessionTime}s</p>
        </div>
        <button
          onClick={onReload}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-200
            ${loading 
              ? 'bg-slate-50 text-slate-400 cursor-not-allowed' 
              : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg active:scale-95'}`}
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          {loading ? 'Syncing...' : 'Sync Data'}
        </button>
      </div>
    </header>
  );
};
