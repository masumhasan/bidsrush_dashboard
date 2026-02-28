import { recentBidsData } from '@/lib/mockData';

const getStatusBadgeColor = (status: 'Won' | 'Active' | 'Lost') => {
  switch (status) {
    case 'Won':
      return 'bg-green-100 text-green-800';
    case 'Active':
      return 'bg-blue-100 text-blue-800';
    case 'Lost':
      return 'bg-red-100 text-red-800';
  }
};

export default function RecentBidsTable() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Recent Bids</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                Item
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                Bid Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {recentBidsData.map((bid, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                  {bid.item}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 font-semibold">
                  {bid.bidAmount}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                      bid.status
                    )}`}
                  >
                    {bid.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {bid.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
