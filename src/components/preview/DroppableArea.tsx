import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableAreaProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isActive: boolean;
}

export const DroppableArea: React.FC<DroppableAreaProps> = ({ id, title, children, isActive }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col h-full
        ${isOver 
          ? 'bg-indigo-50 border-indigo-400 border-solid scale-[1.02]' 
          : 'bg-white border-slate-100 border-dashed'}
        ${isActive && !isOver ? 'border-indigo-200 bg-indigo-50/30' : ''}
      `}
    >
      <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mb-4 px-1">{title}</h3>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};
