'use client';

import { LayoutGrid, Bell } from 'lucide-react';

interface TopBarProps {
  stepInfo?: string;
}

export default function TopBar({ stepInfo }: TopBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-main border-b border-main z-50 px-6 flex items-center justify-between" style={{ height: 'var(--header-height)' }}>
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center text-white font-bold">
          <LayoutGrid size={20} />
        </div>
        <h1 className="font-bold text-lg tracking-tight text-main" style={{ fontFamily: 'var(--font-serif)' }}>AI Resume Builder</h1>
      </div>

      {/* Center */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ left: '50%', transform: 'translateX(-50%)' }}>
        <span className="text-sm font-medium text-muted">Project 3</span>
        {stepInfo && (
          <>
            <span className="mx-2 text-muted">—</span>
            <span className="text-sm font-medium text-main">{stepInfo}</span>
          </>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="badge">
          Active
        </div>
        <button className="text-muted hover:text-main transition-colors">
          <Bell size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-card border border-main flex items-center justify-center text-xs font-bold text-muted">
          U
        </div>
      </div>
    </header>
  );
}
