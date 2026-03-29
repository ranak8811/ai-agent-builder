import React from 'react';
import type { AgentData } from '../../agent-types';

interface AgentPreviewProps {
  data: AgentData | null;
  selectedProfile: string;
  selectedSkills: string[];
  selectedLayers: string[];
  selectedProvider: string;
  agentName: string;
  setAgentName: (name: string) => void;
  setSelectedSkills: (ids: string[]) => void;
  setSelectedLayers: (ids: string[]) => void;
  onSave: () => void;
}

export const AgentPreview: React.FC<AgentPreviewProps> = ({
  data,
  selectedProfile,
  selectedSkills,
  selectedLayers,
  selectedProvider,
  agentName,
  setAgentName,
  setSelectedSkills,
  setSelectedLayers,
  onSave
}) => {
  const profile = data?.agentProfiles.find(p => p.id === selectedProfile);

  return (
    <section className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center text-sm">2</span>
        Agent Blueprint
      </h2>

      <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        {/* Profile Card */}
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
          <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Base Intelligence</span>
          <h3 className="text-lg font-semibold mt-1">{profile?.name || 'Undefined'}</h3>
          <p className="text-slate-400 text-sm mt-1 leading-relaxed">
            {profile?.description || 'Select a base profile to begin architecture.'}
          </p>
        </div>

        {/* Skills List */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Loaded Skills</h3>
          {selectedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map(id => {
                const skill = data?.skills.find(s => s.id === id);
                return (
                  <div key={id} className="group flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-medium text-indigo-300">
                    {skill?.name}
                    <button 
                      onClick={() => setSelectedSkills(selectedSkills.filter(s => s !== id))}
                      className="hover:text-white transition-colors opacity-50 group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-slate-600 text-xs italic">No skills integrated.</p>
          )}
        </div>

        {/* Layers List */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Personality Matrix</h3>
          <div className="space-y-2">
            {selectedLayers.length > 0 ? (
              selectedLayers.map(id => {
                const layer = data?.layers.find(l => l.id === id);
                return (
                  <div key={id} className="group flex justify-between items-center p-2.5 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                    <div>
                      <span className="text-sm font-medium text-slate-200">{layer?.name}</span>
                      <span className="ml-2 text-[10px] text-slate-500 uppercase">{layer?.type}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedLayers(selectedLayers.filter(l => l !== id))}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-slate-600 text-xs italic">Default personality active.</p>
            )}
          </div>
        </div>

        {/* Provider Info */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-medium italic">Host Provider</span>
            <span className="text-sm font-bold text-indigo-400">{selectedProvider || 'Automatic Selection'}</span>
          </div>
        </div>
      </div>

      {/* Save Section */}
      <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
        <input
          type="text"
          placeholder="Deployment Name..."
          value={agentName}
          onChange={e => setAgentName(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        <button
          onClick={onSave}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!agentName || !selectedProfile}
        >
          Initialize Agent
        </button>
      </div>
    </section>
  );
};
