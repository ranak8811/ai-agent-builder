import React from 'react';

export const SkeletonLoader: React.FC<{ type: 'list' | 'preview' }> = ({ type }) => {
  if (type === 'list') {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-slate-100 rounded-2xl animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="h-32 bg-slate-100 rounded-2xl animate-pulse" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-40 bg-slate-100 rounded-2xl animate-pulse" />
        <div className="h-40 bg-slate-100 rounded-2xl animate-pulse" />
      </div>
      <div className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
    </div>
  );
};
