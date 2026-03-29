import React, { useState } from 'react';
import type { AgentData } from '../../agent-types';
import { DraggableItem } from './DraggableItem';

interface ConfigOptionsProps {
  data: AgentData | null;
  selectedProfile: string;
  setSelectedProfile: (id: string) => void;
  selectedProvider: string;
  setSelectedProvider: (provider: string) => void;
}

export const ConfigOptions: React.FC<ConfigOptionsProps> = ({
  data,
  selectedProfile,
  setSelectedProfile,
  selectedProvider,
  setSelectedProvider
}) => {
  const [activeTab, setActiveTab] = useState<'skills' | 'layers'>('skills');

  if (!data) return null;

  const providers = ['Gemini', 'ChatGPT', 'Claude', 'DeepSeek', 'Llama 3'];

  return (
    <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden flex flex-col h-full">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
            <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          Module Library
        </h2>
      </div>

      <div className="p-6 space-y-8 flex-1 flex flex-col overflow-hidden">
        {/* Profile & Provider Selectors */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2 px-1">Host Engine</label>
            <div className="flex flex-wrap gap-2">
              {providers.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedProvider(p)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all
                    ${selectedProvider === p 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2 px-1">Base Intelligence</label>
            <select
              value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none font-medium text-slate-700"
            >
              <option value="">-- Choose System Core --</option>
              {data.agentProfiles.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabbed Components Section */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0 border border-slate-100 rounded-2xl">
          <div className="flex bg-slate-50 p-1 border-b border-slate-100">
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'skills' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Skills ({data.skills.length})
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'layers' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Layers ({data.layers.length})
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-white">
            {activeTab === 'skills' ? (
              <div className="grid grid-cols-1 gap-3">
                {data.skills.map((s) => (
                  <DraggableItem key={s.id} id={s.id} name={s.name} type="skill" category={s.category} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {data.layers.map((l) => (
                  <DraggableItem key={l.id} id={l.id} name={l.name} type="layer" category={l.type} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50/50 border-t border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 013 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v2" />
          </svg>
        </div>
        <p className="text-[10px] font-bold text-slate-500 leading-tight">
          DRAG MODULES FROM THE LIBRARY <br/> INTO THE SYSTEM ARCHITECTURE
        </p>
      </div>
    </section>
  );
};
