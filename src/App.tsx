import { useState, useEffect, useRef } from "react";
import type { AgentData, SavedAgent } from "./agent-types";
import { Header } from "./components/layout/Header";
import { ConfigOptions } from "./components/builder/ConfigOptions";
import { AgentPreview } from "./components/preview/AgentPreview";
import { SavedAgents } from "./components/saved/SavedAgents";

function App() {
  const [data, setData] = useState<AgentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Selection states
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLayers, setSelectedLayers] = useState<string[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");

  // Saving states
  const [agentName, setAgentName] = useState("");
  const [savedAgents, setSavedAgents] = useState<SavedAgent[]>([]);

  // Ref to track agentName for the analytics heartbeat
  const agentNameRef = useRef(agentName);
  useEffect(() => {
    agentNameRef.current = agentName;
  }, [agentName]);

  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("savedAgents");
    if (saved) {
      try {
        setSavedAgents(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved agents", e);
      }
    }
  }, []);

  useEffect(() => {
    const analyticsInterval = setInterval(() => {
      const currentName = agentNameRef.current;
      if (currentName !== "") {
        console.log(
          `[Analytics Heartbeat] User is working on agent named: "${currentName}"`,
        );
      } else {
        console.log(
          `[Analytics Heartbeat] User is working on an unnamed agent draft...`,
        );
      }
    }, 8000);

    return () => clearInterval(analyticsInterval);
  }, []);

  const fetchAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const delay = Math.floor(Math.random() * 1000) + 500;
      await new Promise((resolve) => setTimeout(resolve, delay));

      const response = await fetch("/data.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData: AgentData = await response.json();
      setData(jsonData);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to fetch agent data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleLayerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const layerId = e.target.value;
    if (layerId && !selectedLayers.includes(layerId)) {
      setSelectedLayers((prev) => [...prev, layerId]);
    }
    e.target.value = "";
  };

  const handleSkillSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skillId = e.target.value;
    if (skillId && !selectedSkills.includes(skillId)) {
      setSelectedSkills((prev) => [...prev, skillId]);
    }
    e.target.value = "";
  };

  const handleSaveAgent = () => {
    if (!agentName.trim()) {
      alert("Please enter a name for your agent.");
      return;
    }

    const newAgent: SavedAgent = {
      name: agentName,
      profileId: selectedProfile,
      skillIds: selectedSkills,
      layerIds: selectedLayers,
      provider: selectedProvider,
    };

    const updatedAgents = [...savedAgents, newAgent];
    setSavedAgents(updatedAgents);
    localStorage.setItem("savedAgents", JSON.stringify(updatedAgents));
    setAgentName("");
    alert(`Agent "${newAgent.name}" successfully deployed!`);
  };

  const handleLoadAgent = (agent: SavedAgent) => {
    setSelectedProfile(agent.profileId || "");
    setSelectedSkills(agent.skillIds || []);
    setSelectedLayers([...(agent.layerIds || [])]);
    setAgentName(agent.name);
    setSelectedProvider(agent.provider || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteAgent = (indexToRemove: number) => {
    const updatedAgents = savedAgents.filter(
      (_, index) => index !== indexToRemove,
    );
    setSavedAgents(updatedAgents);
    localStorage.setItem("savedAgents", JSON.stringify(updatedAgents));
  };

  const handleClearAll = () => {
    if (
      confirm("Decommission the entire fleet? This action is irreversible.")
    ) {
      setSavedAgents([]);
      localStorage.removeItem("savedAgents");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header
          loading={loading}
          onReload={fetchAPI}
          sessionTime={sessionTime}
        />

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">System Error: {error}</span>
          </div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 xl:col-span-4">
            <ConfigOptions
              data={data}
              selectedProfile={selectedProfile}
              setSelectedProfile={setSelectedProfile}
              selectedProvider={selectedProvider}
              setSelectedProvider={setSelectedProvider}
              onSkillSelect={handleSkillSelect}
              onLayerSelect={handleLayerSelect}
            />
          </div>

          <div className="lg:col-span-7 xl:col-span-8 h-full">
            <AgentPreview
              data={data}
              selectedProfile={selectedProfile}
              selectedSkills={selectedSkills}
              selectedLayers={selectedLayers}
              selectedProvider={selectedProvider}
              agentName={agentName}
              setAgentName={setAgentName}
              setSelectedSkills={setSelectedSkills}
              setSelectedLayers={setSelectedLayers}
              onSave={handleSaveAgent}
            />
          </div>
        </main>

        <SavedAgents
          agents={savedAgents}
          data={data}
          onLoad={handleLoadAgent}
          onDelete={handleDeleteAgent}
          onClearAll={handleClearAll}
        />
      </div>
    </div>
  );
}

export default App;
