import { useState, useEffect, useRef } from "react";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

import type { AgentData, SavedAgent } from "./agent-types";
import { Header } from "./components/layout/Header";
import { ConfigOptions } from "./components/builder/ConfigOptions";
import { AgentPreview } from "./components/preview/AgentPreview";
import { SavedAgentsSection } from "./components/saved/SavedAgentsSection";
import { DeveloperAgent } from "./components/layout/DeveloperAgent";
import { useBuilderHistory } from "./hooks/useBuilderHistory";

function App() {
  const [data, setData] = useState<AgentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Selection states
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLayers, setSelectedLayers] = useState<string[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [agentName, setAgentName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [savedAgents, setSavedAgents] = useState<SavedAgent[]>([]);
  const [sessionTime, setSessionTime] = useState(0);

  // History Hook
  const { canUndo, canRedo, undo, redo, saveToHistory } = useBuilderHistory({
    profileId: "",
    skillIds: [],
    layerIds: [],
  });

  const agentNameRef = useRef(agentName);
  useEffect(() => {
    agentNameRef.current = agentName;
  }, [agentName]);

  // Core Effects
  useEffect(() => {
    const interval = setInterval(() => setSessionTime((p) => p + 1), 1000);
    const analytics = setInterval(() => {
      console.log(
        `[Heartbeat] Working on: "${agentNameRef.current || "Draft"}"`,
      );
    }, 8000);
    return () => {
      clearInterval(interval);
      clearInterval(analytics);
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("savedAgents");
    if (saved)
      try {
        setSavedAgents(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
  }, []);

  const fetchAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const delay = Math.floor(Math.random() * 1000) + 1000;
      await new Promise((r) => setTimeout(r, delay));
      const res = await fetch("/data.json");
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const jsonData: AgentData = await res.json();
      setData(jsonData);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Fetch failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // Handler Wrappers
  const updateProfile = (id: string) => {
    setSelectedProfile(id);
    saveToHistory({
      profileId: id,
      skillIds: selectedSkills,
      layerIds: selectedLayers,
    });
  };

  const updateSkills = (update: string[] | ((prev: string[]) => string[])) => {
    setSelectedSkills((prev) => {
      const next = typeof update === "function" ? update(prev) : update;
      saveToHistory({
        profileId: selectedProfile,
        skillIds: next,
        layerIds: selectedLayers,
      });
      return next;
    });
  };

  const updateLayers = (update: string[] | ((prev: string[]) => string[])) => {
    setSelectedLayers((prev) => {
      const next = typeof update === "function" ? update(prev) : update;
      saveToHistory({
        profileId: selectedProfile,
        skillIds: selectedSkills,
        layerIds: next,
      });
      return next;
    });
  };

  const handleSaveAgent = () => {
    if (!agentName.trim() || !selectedProfile) {
      toast.error("Incomplete deployment configuration.");
      return;
    }
    const newAgent: SavedAgent = {
      name: agentName,
      profileId: selectedProfile,
      skillIds: selectedSkills,
      layerIds: selectedLayers,
      provider: selectedProvider,
    };
    const updated = [newAgent, ...savedAgents];
    setSavedAgents(updated);
    localStorage.setItem("savedAgents", JSON.stringify(updated));
    setAgentName("");
    toast.success(`Unit ${newAgent.name} commissioned.`, {
      icon: <span>⚡</span>,
    });
  };

  const handleLoadAgent = (agent: SavedAgent) => {
    setSelectedProfile(agent.profileId || "");
    setSelectedSkills(agent.skillIds || []);
    setSelectedLayers(agent.layerIds || []);
    setAgentName(agent.name);
    setSelectedProvider(agent.provider || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.info(`Loaded: ${agent.name}`);
  };

  const handleDeleteAgent = (idx: number) => {
    const updated = savedAgents.filter((_, i) => i !== idx);
    setSavedAgents(updated);
    localStorage.setItem("savedAgents", JSON.stringify(updated));
    toast.error("Unit decommissioned.");
  };

  // SweetAlert2 Implementation for Fleet Decommissioning
  const handleClearAll = () => {
    Swal.fire({
      title: "Decommission Fleet?",
      text: "This protocol will terminate all active units and purge the database. This action is irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5", // Indigo-600
      cancelButtonColor: "#ef4444", // Red-500
      confirmButtonText: "Yes, terminate fleet",
      background: "#ffffff",
      customClass: {
        popup: "rounded-[2rem]",
        confirmButton: "rounded-xl font-bold px-6 py-3",
        cancelButton: "rounded-xl font-bold px-6 py-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setSavedAgents([]);
        localStorage.removeItem("savedAgents");
        toast.error("Fleet database purged.");
        Swal.fire({
          title: "Purged!",
          text: "The entire fleet has been decommissioned.",
          icon: "success",
          confirmButtonColor: "#4f46e5",
          customClass: { popup: "rounded-[2rem]" },
        });
      }
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setIsDragging(false);
    if (!over) return;
    const [type, id] = (active.id as string).split(":");
    if (
      type === "skill" &&
      over.id === "skills-drop" &&
      !selectedSkills.includes(id)
    ) {
      updateSkills((prev) => [...prev, id]);
      toast.success(`Integrated: ${active.data.current?.name}`, {
        autoClose: 1000,
      });
    } else if (
      type === "layer" &&
      over.id === "layers-drop" &&
      !selectedLayers.includes(id)
    ) {
      updateLayers((prev) => [...prev, id]);
      toast.success(`Applied Filter: ${active.data.current?.name}`, {
        autoClose: 1000,
      });
    }
  };

  return (
    <DndContext
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen selection:bg-indigo-100 selection:text-indigo-900 pb-20 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Header
              loading={loading}
              onReload={fetchAPI}
              sessionTime={sessionTime}
            />
          </motion.div>

          {error && (
            <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-700 shadow-sm font-black uppercase tracking-tighter italic text-left">
              Critical Error: {error}
            </div>
          )}

          {!loading && (
            <div className="flex gap-2 mb-6">
              <button
                onClick={() =>
                  undo(setSelectedProfile, setSelectedSkills, setSelectedLayers)
                }
                disabled={!canUndo}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 disabled:opacity-30 transition-all flex items-center gap-2 shadow-sm hover:bg-slate-50"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Undo
              </button>
              <button
                onClick={() =>
                  redo(setSelectedProfile, setSelectedSkills, setSelectedLayers)
                }
                disabled={!canRedo}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 disabled:opacity-30 transition-all flex items-center gap-2 shadow-sm hover:bg-slate-50"
              >
                Redo
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6"
                  />
                </svg>
              </button>
            </div>
          )}

          <main className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5 xl:col-span-4 h-[750px]">
              <ConfigOptions
                data={data}
                loading={loading}
                selectedProfile={selectedProfile}
                setSelectedProfile={updateProfile}
                selectedProvider={selectedProvider}
                setSelectedProvider={setSelectedProvider}
              />
            </div>
            <div className="lg:col-span-7 xl:col-span-8 h-[750px]">
              <AgentPreview
                data={data}
                loading={loading}
                selectedProfile={selectedProfile}
                selectedSkills={selectedSkills}
                selectedLayers={selectedLayers}
                selectedProvider={selectedProvider}
                agentName={agentName}
                setAgentName={setAgentName}
                setSelectedSkills={updateSkills}
                setSelectedLayers={updateLayers}
                onSave={handleSaveAgent}
                isDragging={isDragging}
              />
            </div>
          </main>

          <SavedAgentsSection
            savedAgents={savedAgents}
            data={data}
            onLoadAgent={handleLoadAgent}
            onDeleteAgent={handleDeleteAgent}
            onClearAll={handleClearAll}
          />

          <DeveloperAgent />
        </div>
        <ToastContainer position="top-right" theme="light" />
      </div>
    </DndContext>
  );
}

export default App;
