import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SavedAgents } from './SavedAgents';
import type { SavedAgent, AgentData } from '../../agent-types';

interface SavedAgentsSectionProps {
  savedAgents: SavedAgent[];
  data: AgentData | null;
  onLoadAgent: (agent: SavedAgent) => void;
  onDeleteAgent: (index: number) => void;
  onClearAll: () => void;
}

export const SavedAgentsSection: React.FC<SavedAgentsSectionProps> = ({
  savedAgents,
  data,
  onLoadAgent,
  onDeleteAgent,
  onClearAll
}) => {
  return (
    <AnimatePresence>
      {savedAgents.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5 }}
        >
          <SavedAgents
            agents={savedAgents}
            data={data}
            onLoad={onLoadAgent}
            onDelete={onDeleteAgent}
            onClearAll={onClearAll}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
