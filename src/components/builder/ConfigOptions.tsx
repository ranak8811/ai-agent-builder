import React from 'react';
import type { AgentData } from '../../agent-types';

interface ConfigOptionsProps {
  data: AgentData | null;
  selectedProfile: string;
  setSelectedProfile: (id: string) => void;
  selectedProvider: string;
  setSelectedProvider: (provider: string) => void;
  onSkillSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onLayerSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ConfigOptions: React.FC<ConfigOptionsProps> = ({
  data,
  selectedProfile,
  setSelectedProfile,
  selectedProvider,
  setSelectedProvider,
  onSkillSelect,
  onLayerSelect
}) => {
  if (!data) return null;

  const providers = ['Gemini', 'ChatGPT', 'Claude', 'DeepSeek', 'Llama 3'];

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm">1</span>
        Configuration Options
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Base Profile</label>
          <select
            value={selectedProfile}
            onChange={(e) => setSelectedProfile(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
          >
            <option value="">-- Select a Profile --</option>
            {data.agentProfiles.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Capabilities</label>
          <select
            onChange={onSkillSelect}
            defaultValue=""
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="" disabled>+ Add a Skill</option>
            {data.skills.map((s) => (
              <option key={s.id} value={s.id}>{s.name} • {s.category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Personality Layers</label>
          <select
            onChange={onLayerSelect}
            defaultValue=""
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="" disabled>+ Add a Layer</option>
            {data.layers.map((l) => (
              <option key={l.id} value={l.id}>{l.name} • {l.type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">AI Engine</label>
          <div className="grid grid-cols-2 gap-2">
            {providers.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedProvider(p)}
                className={`p-2 text-sm font-medium rounded-lg border transition-all
                  ${selectedProvider === p 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 ring-1 ring-indigo-200' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
