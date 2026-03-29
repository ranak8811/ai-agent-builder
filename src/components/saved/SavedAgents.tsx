import React from 'react';
import type { SavedAgent, AgentData } from '../../agent-types';

interface SavedAgentsProps {
  agents: SavedAgent[];
  data: AgentData | null;
  onLoad: (agent: SavedAgent) => void;
  onDelete: (index: number) => void;
  onClearAll: () => void;
}

export const SavedAgents: React.FC<SavedAgentsProps> = ({
  agents,
  data,
  onLoad,
  onDelete,
  onClearAll
}) => {
  if (agents.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">ACTIVE FLEET</h2>
          <div className="h-1 w-20 bg-indigo-600 rounded-full mt-1"></div>
        </div>
        <button
          onClick={onClearAll}
          className="px-4 py-2 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all uppercase tracking-widest border border-red-100"
        >
          Decommission Entire Fleet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent, index) => (
          <div 
            key={index} 
            className="group relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <span className="px-2 py-1 bg-slate-900 text-white text-[8px] font-black rounded uppercase tracking-widest">
                {agent.provider || 'STANDALONE'}
              </span>
            </div>
            
            <div className="p-8">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-black mb-6 shadow-inner border border-indigo-100">
                {agent.name.charAt(0).toUpperCase()}
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-1 truncate">{agent.name}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">
                Core: {data?.agentProfiles.find(p => p.id === agent.profileId)?.name || 'Standard'}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Modules</span>
                  <span className="text-lg font-black text-slate-700 leading-none">{agent.skillIds?.length || 0}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Filters</span>
                  <span className="text-lg font-black text-slate-700 leading-none">{agent.layerIds?.length || 0}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onLoad(agent)}
                  className="flex-1 py-3 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95"
                >
                  Hot Reload
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
