'use client';

import StatCard from '@/components/StatCard';
import AuctionCard from '@/components/AuctionCard';
import RecentBidsTable from '@/components/RecentBidsTable';
import { dashboardStats, mockAuctions } from '@/lib/mockData';
import {
  TrendingUp,
  Gavel,
  Trophy,
  DollarSign,
} from 'lucide-react';

export default function Home() {
  const topAuctions = mockAuctions.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bids"
          value={dashboardStats.totalBids}
          icon={<TrendingUp className="w-6 h-6" />}
          trend={12}
        />
        <StatCard
          title="Active Auctions"
          value={dashboardStats.activeAuctions}
          icon={<Gavel className="w-6 h-6" />}
          trend={5}
        />
        <StatCard
          title="Won Auctions"
          value={dashboardStats.wonAuctions}
          icon={<Trophy className="w-6 h-6" />}
          trend={8}
        />
        <StatCard
          title="Total Spent"
          value={`$${dashboardStats.totalSpent.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6" />}
          trend={15}
        />
      </div>

      {/* Recent Bids Table */}
      <RecentBidsTable />

      {/* Active Auctions Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Featured Auctions
          </h2>
          <a
            href="/auctions"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </div>
    </div>
  );
}
