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
    <section className="mt-12">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Agent Fleet</h2>
          <p className="text-slate-500">Your previously deployed AI units</p>
        </div>
        <button
          onClick={onClearAll}
          className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
        >
          Decommission All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map((agent, index) => (
          <div 
            key={index} 
            className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                {agent.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-full uppercase tracking-tighter">
                {agent.provider || 'AI'}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors truncate">
              {agent.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium mb-4">
              Base: {data?.agentProfiles.find(p => p.id === agent.profileId)?.name || 'Standard'}
            </p>

            <div className="flex gap-2 mb-6">
              <div className="flex-1 px-2 py-1.5 bg-slate-50 rounded-lg border border-slate-100 text-center">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Skills</span>
                <span className="text-sm font-bold text-slate-700">{agent.skillIds?.length || 0}</span>
              </div>
              <div className="flex-1 px-2 py-1.5 bg-slate-50 rounded-lg border border-slate-100 text-center">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Layers</span>
                <span className="text-sm font-bold text-slate-700">{agent.layerIds?.length || 0}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onLoad(agent)}
                className="flex-1 py-2 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Re-load
              </button>
              <button
                onClick={() => onDelete(index)}
                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
