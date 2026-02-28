'use client';

import { mockBids } from '@/lib/mockData';
import { Filter, Download } from 'lucide-react';
import { useState } from 'react';

const getStatusColor = (status: 'Won' | 'Active' | 'Lost') => {
  switch (status) {
    case 'Won':
      return 'bg-green-100 text-green-800';
    case 'Active':
      return 'bg-blue-100 text-blue-800';
    case 'Lost':
      return 'bg-red-100 text-red-800';
  }
};

export default function BidsPage() {
  const [filterStatus, setFilterStatus] = useState<'All' | 'Won' | 'Active' | 'Lost'>('All');

  const filteredBids =
    filterStatus === 'All'
      ? mockBids
      : mockBids.filter((bid) => bid.status === filterStatus);

  const wonBids = mockBids.filter((bid) => bid.status === 'Won').length;
  const activeBids = mockBids.filter((bid) => bid.status === 'Active').length;
  const lostBids = mockBids.filter((bid) => bid.status === 'Lost').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Bids</h1>
        <p className="text-slate-600">
          View and manage all your bids across {mockBids.length} auctions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="bg-green-50 border border-green-200 rounded-lg p-4 cursor-pointer hover:bg-green-100 transition-colors"
          onClick={() => setFilterStatus('Won')}
        >
          <p className="text-green-600 text-sm font-semibold">Won Bids</p>
          <p className="text-3xl font-bold text-green-900">{wonBids}</p>
        </div>
        <div
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 cursor-pointer hover:bg-blue-100 transition-colors"
          onClick={() => setFilterStatus('Active')}
        >
          <p className="text-blue-600 text-sm font-semibold">Active Bids</p>
          <p className="text-3xl font-bold text-blue-900">{activeBids}</p>
        </div>
        <div
          className="bg-red-50 border border-red-200 rounded-lg p-4 cursor-pointer hover:bg-red-100 transition-colors"
          onClick={() => setFilterStatus('Lost')}
        >
          <p className="text-red-600 text-sm font-semibold">Lost Bids</p>
          <p className="text-3xl font-bold text-red-900">{lostBids}</p>
        </div>
      </div>

      {/* Filter and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-600" />
          <span className="text-slate-600 font-medium">Filter:</span>
          <div className="flex gap-2">
            {(['All', 'Won', 'Active', 'Lost'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Bids Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Item
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Bid Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Time Remaining
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Placed At
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredBids.map((bid) => (
                <tr
                  key={bid.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {bid.item}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    ${bid.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        bid.status
                      )}`}
                    >
                      {bid.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {bid.time}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {bid.placedAt}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {bid.status === 'Active' ? (
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Increase Bid
                      </button>
                    ) : (
                      <button className="text-slate-400 cursor-not-allowed">
                        -
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-lg p-6 border border-slate-200">
        <div>
          <p className="text-slate-600 text-sm font-medium mb-2">
            Total Amount Bid
          </p>
          <p className="text-2xl font-bold text-slate-900">
            ${mockBids.reduce((sum, bid) => sum + bid.amount, 0).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-slate-600 text-sm font-medium mb-2">
            Average Bid
          </p>
          <p className="text-2xl font-bold text-slate-900">
            ${Math.round(
              mockBids.reduce((sum, bid) => sum + bid.amount, 0) / mockBids.length
            ).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-slate-600 text-sm font-medium mb-2">Win Rate</p>
          <p className="text-2xl font-bold text-slate-900">
            {Math.round((wonBids / mockBids.length) * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
}
