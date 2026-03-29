import React from 'react';

interface HeaderProps {
  loading: boolean;
  onReload: () => void;
  sessionTime: number;
}

export const Header: React.FC<HeaderProps> = ({ loading, onReload, sessionTime }) => {
  return (
    <header className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Agent <span className="text-indigo-600">Builder</span>
          </h1>
          <p className="text-slate-500 mt-1">Design your custom AI personality and capability set.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-sm font-medium text-slate-600">
              Session Active: <span className="text-indigo-600 font-mono">{sessionTime}s</span>
            </span>
          </div>
          <button
            onClick={onReload}
            disabled={loading}
            className={`px-5 py-2 rounded-xl font-semibold transition-all duration-200 shadow-sm
              ${loading 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Syncing...
              </span>
            ) : 'Reload Data'}
          </button>
        </div>
      </div>
    </header>
  );
};
