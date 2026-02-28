'use client';

import Image from 'next/image';
import { Heart, Clock, Gavel } from 'lucide-react';
import { Auction } from '@/types';

interface AuctionCardProps {
  auction: Auction;
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-slate-200 overflow-hidden group">
        <Image
          src={auction.image}
          alt={auction.itemName}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
          <Heart className="w-5 h-5 text-slate-400 hover:text-red-500" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-900 text-lg mb-3 line-clamp-2">
          {auction.itemName}
        </h3>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-sm">Current Bid</span>
            <span className="text-xl font-bold text-slate-900">
              ${auction.currentBid.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Total Bids</span>
            <span className="font-medium text-slate-900">{auction.bids}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{auction.timeRemaining} left</span>
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Gavel className="w-4 h-4" />
          Place Bid
        </button>
      </div>
    </div>
  );
}
