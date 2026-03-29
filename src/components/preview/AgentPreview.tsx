import React from 'react';
import type { AgentData } from '../../agent-types';
import { DroppableArea } from './DroppableArea';
import { SkeletonLoader } from '../layout/SkeletonLoader';
import { motion } from 'framer-motion';

interface AgentPreviewProps {
  data: AgentData | null;
  loading: boolean;
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
  loading,
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

  // Computed Stats (Demonstrates Advanced Derived State)
  const stats = React.useMemo(() => {
    const skillCount = selectedSkills.length;
    const layerCount = selectedLayers.length;
    const baseIntelligence = selectedProfile ? 40 : 0;
    const intelligenceScore = Math.min(100, baseIntelligence + (skillCount * 12) + (layerCount * 8));
    const systemLoad = Math.min(100, (skillCount * 15) + (layerCount * 10));
    const neuralLatency = Math.max(5, 50 - (intelligenceScore / 2));

    return { intelligenceScore, systemLoad, neuralLatency };
  }, [selectedProfile, selectedSkills, selectedLayers]);

  const handleExportJSON = () => {
    const config = {
      name: agentName || 'Unnamed Agent',
      timestamp: new Date().toISOString(),
      architecture: {
        profile: profile?.name || 'None',
        provider: selectedProvider || 'Auto',
        skills: selectedSkills.map(id => data?.skills.find(s => s.id === id)?.name),
        layers: selectedLayers.map(id => data?.layers.find(l => l.id === id)?.name)
      },
      stats
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.name.replace(/\s+/g, '_')}_config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 h-full flex flex-col relative overflow-hidden transition-all">
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
        <button 
          onClick={handleExportJSON}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-[10px] font-bold text-slate-600 uppercase tracking-tighter transition-all"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Export JSON
        </button>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar relative z-10">
        {loading ? (
          <SkeletonLoader type="preview" />
        ) : (
          <>
            {/* System Stats Gauge */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Intelligence</p>
                <p className="text-xl font-black text-indigo-600">{stats.intelligenceScore}%</p>
                <div className="mt-2 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${stats.intelligenceScore}%` }} className="h-full bg-indigo-500" />
                </div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">System Load</p>
                <p className="text-xl font-black text-blue-600">{stats.systemLoad}%</p>
                <div className="mt-2 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${stats.systemLoad}%` }} className="h-full bg-blue-500" />
                </div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Latency</p>
                <p className="text-xl font-black text-cyan-600">{stats.neuralLatency}ms</p>
                <div className="mt-2 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${100 - stats.neuralLatency}%` }} className="h-full bg-cyan-500" />
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] uppercase tracking-widest text-indigo-600 font-extrabold text-left">System Architecture</span>
                <div className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[8px] font-bold text-slate-400">CORE-X</div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-left">
                {profile?.name || 'Initialize Core...'}
              </h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed font-medium text-left">
                {profile?.description || 'Drop a base intelligence profile to define the fundamental logic gates.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DroppableArea id="skills-drop" title="Capability Integration" isActive={isDragging}>
                <div className="space-y-2 min-h-[100px]">
                  {selectedSkills.length > 0 ? (
                    selectedSkills.map(id => {
                      const skill = data?.skills.find(s => s.id === id);
                      return (
                        <motion.div layout key={id} className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm group">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                            <span className="text-sm font-bold text-slate-700">{skill?.name}</span>
                          </div>
                          <button 
                            onClick={() => setSelectedSkills(prev => prev.filter(s => s !== id))}
                            className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </motion.div>
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
                        <motion.div layout key={id} className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm group">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            <span className="text-sm font-bold text-slate-700">{layer?.name}</span>
                          </div>
                          <button 
                            onClick={() => setSelectedLayers(prev => prev.filter(l => l !== id))}
                            className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </motion.div>
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
          </>
        )}
      </div>

      {!loading && (
        <div className="p-6 bg-slate-50 border-t border-slate-100 relative z-10">
          <div className="mb-4">
            <label className="block text-[10px] uppercase tracking-widest font-extrabold text-slate-400 mb-2 px-1 text-left">Deployment Identifier</label>
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
            <svg className="h-5 w-5 text-indigo-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Initialize Deployment
          </button>
        </div>
      )}
    </section>
  );
};
