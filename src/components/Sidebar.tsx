'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Gavel, TrendingUp, Trophy, Settings } from 'lucide-react';

const sidebarItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/auctions', label: 'Active Auctions', icon: Gavel },
  { href: '/bids', label: 'My Bids', icon: TrendingUp },
  { href: '/won', label: 'Won Auctions', icon: Trophy },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Gavel className="w-8 h-8 text-blue-400" />
          BidsRush
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700 text-sm text-slate-400">
        <p>BidsRush © 2024</p>
      </div>
    </aside>
  );
}
