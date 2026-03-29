import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface DraggableItemProps {
  id: string;
  name: string;
  type: 'skill' | 'layer';
  category?: string;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ id, name, type, category }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${type}:${id}`,
    data: { id, type, name }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 100 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-4 bg-white border border-slate-200 rounded-2xl shadow-sm 
        cursor-grab active:cursor-grabbing hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-50
        transition-all flex items-center justify-between group
        ${isDragging ? 'opacity-50 ring-2 ring-indigo-500 scale-95 shadow-2xl' : ''}
      `}
    >
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{name}</span>
        {category && <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{category}</span>}
      </div>
      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
        <svg className="h-4 w-4 text-slate-300 group-hover:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </div>
    </div>
  );
};
