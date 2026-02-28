'use client';

import { Bell, User } from 'lucide-react';
import { currentUser } from '@/lib/mockData';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-8 py-4">
        <h2 className="text-2xl font-bold text-slate-900">BidsRush Dashboard</h2>

        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">{currentUser.name}</p>
              <p className="text-xs text-slate-500">{currentUser.email}</p>
            </div>
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
