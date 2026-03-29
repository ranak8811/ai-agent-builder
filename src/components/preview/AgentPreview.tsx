import React from 'react';
import type { AgentData } from '../../agent-types';
import { DroppableArea } from './DroppableArea';

interface AgentPreviewProps {
  data: AgentData | null;
  selectedProfile: string;
  selectedSkills: string[];
  selectedLayers: string[];
  selectedProvider: string;
  agentName: string;
  setAgentName: (name: string) => void;
  setSelectedSkills: (ids: string[] | ((prev: string[]) => string[])) => void;
  setSelectedLayers: (ids: string[] | ((prev: string[]) => string[])) => void;
  onSave: () => void;
  isDragging: boolean;
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
  onSave,
  isDragging
}) => {
  const profile = data?.agentProfiles.find(p => p.id === selectedProfile);

  return (
    <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 h-full flex flex-col relative overflow-hidden">
      {/* Visual background gradient */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
      
      <div className="p-6 border-b border-slate-100 flex justify-between items-center relative z-10">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl shadow-md shadow-indigo-200 flex items-center justify-center">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          Blueprint Configuration
        </h2>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Ready for assembly
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar relative z-10">
        {/* Core Intelligence Card */}
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] uppercase tracking-widest text-indigo-600 font-extrabold">System Architecture</span>
            <div className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[8px] font-bold text-slate-400">CORE-X</div>
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            {profile?.name || 'Initialize Core...'}
          </h3>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed font-medium">
            {profile?.description || 'Drop a base intelligence profile to define the fundamental logic gates and behavioral constraints.'}
          </p>
        </div>

        {/* Integration Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DroppableArea id="skills-drop" title="Capability Integration" isActive={isDragging}>
            <div className="space-y-2 min-h-[100px]">
              {selectedSkills.length > 0 ? (
                selectedSkills.map(id => {
                  const skill = data?.skills.find(s => s.id === id);
                  return (
                    <div key={id} className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm group">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                        <span className="text-sm font-bold text-slate-700">{skill?.name}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedSkills(prev => prev.filter(s => s !== id))}
                        className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-6 border border-slate-100 rounded-xl bg-slate-50/50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Awaiting Skills</p>
                </div>
              )}
            </div>
          </DroppableArea>

          <DroppableArea id="layers-drop" title="Behavioral Filters" isActive={isDragging}>
            <div className="space-y-2 min-h-[100px]">
              {selectedLayers.length > 0 ? (
                selectedLayers.map(id => {
                  const layer = data?.layers.find(l => l.id === id);
                  return (
                    <div key={id} className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm group">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span className="text-sm font-bold text-slate-700">{layer?.name}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedLayers(prev => prev.filter(l => l !== id))}
                        className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-6 border border-slate-100 rounded-xl bg-slate-50/50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Awaiting Layers</p>
                </div>
              )}
            </div>
          </DroppableArea>
        </div>
      </div>

      {/* Assembly Terminal */}
      <div className="p-6 bg-slate-50 border-t border-slate-100 relative z-10">
        <div className="mb-4">
          <label className="block text-[10px] uppercase tracking-widest font-extrabold text-slate-400 mb-2 px-1">Deployment Identifier</label>
          <input
            type="text"
            placeholder="E.g., NEXUS-PRIME-7"
            value={agentName}
            onChange={e => setAgentName(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-bold shadow-sm"
          />
        </div>
        <button
          onClick={onSave}
          className="w-full group bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          disabled={!agentName || !selectedProfile}
        >
          <svg className="h-5 w-5 text-indigo-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Initialize Deployment
        </button>
      </div>
    </section>
  );
};
