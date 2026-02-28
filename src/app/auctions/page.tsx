'use client';

import AuctionCard from '@/components/AuctionCard';
import { mockAuctions } from '@/lib/mockData';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function AuctionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAuctions = mockAuctions.filter((auction) =>
    auction.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Active Auctions
        </h1>
        <p className="text-slate-600">
          Browse {mockAuctions.length} active auctions and place your bids
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search auctions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter and Sort Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Collectibles</option>
          <option>Jewelry</option>
          <option>Art & Antiques</option>
        </select>

        <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Sort by Time Left</option>
          <option>Sort by Bid Amount (Low to High)</option>
          <option>Sort by Bid Amount (High to Low)</option>
          <option>Sort by Number of Bids</option>
        </select>
      </div>

      {/* Auctions Grid */}
      {filteredAuctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg">
            No auctions found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}
