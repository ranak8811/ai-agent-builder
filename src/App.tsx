import { useState, useEffect, useRef } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Drag state
  const [isDragging, setIsDragging] = useState(false);

  // Saving states
  const [savedAgents, setSavedAgents] = useState<SavedAgent[]>([]);
  const [agentName, setAgentName] = useState("");

  // Sensors for better DND experience
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

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
      const delay = Math.floor(Math.random() * 800) + 400;
      await new Promise((resolve) => setTimeout(resolve, delay));

      const response = await fetch("/data.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData: AgentData = await response.json();
      setData(jsonData);
    } catch (err: unknown) {
      console.error("Error fetching data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch agent data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleSaveAgent = () => {
    if (!agentName.trim()) {
      toast.error("Identity required. Please enter an agent name.", {
        className: "font-bold",
      });
      return;
    }

    if (!selectedProfile) {
      toast.warning(
        "Architecture incomplete. Select a base intelligence core.",
        {
          className: "font-bold",
        },
      );
      return;
    }

    const newAgent: SavedAgent = {
      name: agentName,
      profileId: selectedProfile,
      skillIds: selectedSkills,
      layerIds: selectedLayers,
      provider: selectedProvider,
    };

    const updatedAgents = [newAgent, ...savedAgents]; // Newest first
    setSavedAgents(updatedAgents);
    localStorage.setItem("savedAgents", JSON.stringify(updatedAgents));
    setAgentName("");

    toast.success(`Unit ${newAgent.name} successfully commissioned.`, {
      icon: <span>⚡</span>,
      className: "font-bold rounded-2xl shadow-2xl",
    });
  };

  const handleLoadAgent = (agent: SavedAgent) => {
    setSelectedProfile(agent.profileId || "");
    setSelectedSkills(agent.skillIds || []);
    setSelectedLayers([...(agent.layerIds || [])]);
    setAgentName(agent.name);
    setSelectedProvider(agent.provider || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.info(`Hot-loading: ${agent.name}`, {
      className: "font-bold rounded-2xl",
    });
  };

  const handleDeleteAgent = (indexToRemove: number) => {
    const agentToDelete = savedAgents[indexToRemove];
    const updatedAgents = savedAgents.filter(
      (_, index) => index !== indexToRemove,
    );
    setSavedAgents(updatedAgents);
    localStorage.setItem("savedAgents", JSON.stringify(updatedAgents));
    toast.error(`Unit ${agentToDelete.name} decommissioned.`, {
      className: "font-bold rounded-2xl",
    });
  };

  const handleClearAll = () => {
    if (
      confirm("Decommission entire fleet? All active units will be terminated.")
    ) {
      setSavedAgents([]);
      localStorage.removeItem("savedAgents");
      toast.error("Fleet terminated. All data purged.", {
        className: "font-bold rounded-2xl",
      });
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setIsDragging(false);

    if (!over) return;

    const [type, id] = (active.id as string).split(":");
    const itemName = active.data.current?.name;

    if (type === "skill" && over.id === "skills-drop") {
      if (!selectedSkills.includes(id)) {
        setSelectedSkills((prev) => [...prev, id]);
        toast.success(`Integrated: ${itemName}`, {
          autoClose: 1000,
          hideProgressBar: true,
          className: "font-bold rounded-xl",
        });
      } else {
        toast.info(`${itemName} is already integrated.`, {
          autoClose: 1000,
          hideProgressBar: true,
          className: "font-bold rounded-xl",
        });
      }
    } else if (type === "layer" && over.id === "layers-drop") {
      if (!selectedLayers.includes(id)) {
        setSelectedLayers((prev) => [...prev, id]);
        toast.success(`Applied Filter: ${itemName}`, {
          autoClose: 1000,
          hideProgressBar: true,
          className: "font-bold rounded-xl",
        });
      } else {
        toast.info(`${itemName} is already active.`, {
          autoClose: 1000,
          hideProgressBar: true,
          className: "font-bold rounded-xl",
        });
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen selection:bg-indigo-100 selection:text-indigo-900 pb-20">
        <div className="max-w-7xl mx-auto px-6 pt-10">
          <Header
            loading={loading}
            onReload={fetchAPI}
            sessionTime={sessionTime}
          />

          {error && (
            <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-700 shadow-sm animate-bounce">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <span className="font-black uppercase tracking-tighter italic">
                Critical Error: {error}
              </span>
            </div>
          )}

          <main className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5 xl:col-span-4 h-[750px]">
              <ConfigOptions
                data={data}
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
                selectedProvider={selectedProvider}
                setSelectedProvider={setSelectedProvider}
              />
            </div>

            <div className="lg:col-span-7 xl:col-span-8 h-[750px]">
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
                isDragging={isDragging}
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
        <ToastContainer
          position="top-right"
          theme="light"
          toastClassName={() =>
            "relative flex p-1 min-h-10 rounded-2xl justify-between overflow-hidden cursor-pointer bg-white border border-slate-100 shadow-2xl mb-4 p-4"
          }
        />
      </div>
    </DndContext>
  );
}

export default App;
