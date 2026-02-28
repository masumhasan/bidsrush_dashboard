'use client';

import { mockBids } from '@/lib/mockData';
import { Package, Award, Calendar } from 'lucide-react';

export default function WonPage() {
  const wonBids = mockBids.filter((bid) => bid.status === 'Won');
  const totalWon = wonBids.reduce((sum, bid) => sum + bid.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Won Auctions</h1>
        <p className="text-slate-600">
          View all {wonBids.length} auctions you have successfully won
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-600 text-sm font-medium mb-2">Total Won</p>
              <p className="text-3xl font-bold text-green-600">{wonBids.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-slate-500">All-time wins</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-600 text-sm font-medium mb-2">
                Total Spent
              </p>
              <p className="text-3xl font-bold text-blue-600">
                ${totalWon.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Average: ${Math.round(totalWon / wonBids.length).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-600 text-sm font-medium mb-2">
                Win Rate
              </p>
              <p className="text-3xl font-bold text-purple-600">
                {Math.round((wonBids.length / mockBids.length) * 100)}%
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-slate-500">
            {wonBids.length} of {mockBids.length} bids
          </p>
        </div>
      </div>

      {/* Won Items Grid */}
      {wonBids.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wonBids.map((bid) => (
            <div
              key={bid.id}
              className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 text-lg flex-1">
                    {bid.item}
                  </h3>
                  <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    Won
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-600 text-sm">Winning Bid</span>
                    <span className="font-bold text-slate-900">
                      ${bid.amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-600 text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Won At
                    </span>
                    <span className="text-slate-900 text-sm">
                      {bid.placedAt.split(' ')[0]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">
                      Congratulations! You won this auction.
                    </span>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">No won auctions yet</p>
          <p className="text-slate-500 text-sm mt-1">
            Start bidding to win your first auction!
          </p>
        </div>
      )}
    </div>
  );
}
