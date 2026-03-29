import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export interface BuilderState {
  profileId: string;
  skillIds: string[];
  layerIds: string[];
}

export const useBuilderHistory = (initialState: BuilderState) => {
  const [history, setHistory] = useState<BuilderState[]>([initialState]);
  const [redoStack, setRedoStack] = useState<BuilderState[]>([]);

  const saveToHistory = useCallback((newState: BuilderState) => {
    setHistory(prev => [...prev, newState]);
    setRedoStack([]); // Clear redo stack on new action
  }, []);

  const undo = useCallback((
    setCurrentProfile: (id: string) => void,
    setCurrentSkills: (ids: string[]) => void,
    setCurrentLayers: (ids: string[]) => void
  ) => {
    if (history.length <= 1) {
      setCurrentProfile("");
      setCurrentSkills([]);
      setCurrentLayers([]);
      setHistory([initialState]);
      return;
    }

    const current = history[history.length - 1];
    const previous = history[history.length - 2];
    
    setRedoStack(prev => [current, ...prev]);
    setHistory(prev => prev.slice(0, -1));
    
    setCurrentProfile(previous.profileId);
    setCurrentSkills(previous.skillIds);
    setCurrentLayers(previous.layerIds);
    toast.info("Undo: Reverted last action", { autoClose: 1000 });
  }, [history, initialState]);

  const redo = useCallback((
    setCurrentProfile: (id: string) => void,
    setCurrentSkills: (ids: string[]) => void,
    setCurrentLayers: (ids: string[]) => void
  ) => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setRedoStack(prev => prev.slice(1));
    setHistory(prev => [...prev, next]);
    
    setCurrentProfile(next.profileId);
    setCurrentSkills(next.skillIds);
    setCurrentLayers(next.layerIds);
    toast.info("Redo: Restored action", { autoClose: 1000 });
  }, [redoStack]);

  return {
    canUndo: history.length > 1,
    canRedo: redoStack.length > 0,
    undo,
    redo,
    saveToHistory
  };
};
