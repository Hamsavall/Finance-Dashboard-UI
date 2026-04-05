import { useApp } from '../context/AppContext';
import { getBalanceTrendByMonth, formatCurrency } from '../utils/calculations';

export function BalanceTrendChart() {
  const { transactions } = useApp();
  const trendData = getBalanceTrendByMonth(transactions);

  if (trendData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Balance Trend
        </h2>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  const maxBalance = Math.max(...trendData.map((d) => d.balance));
  const minBalance = Math.min(...trendData.map((d) => d.balance), 0);
  const range = maxBalance - minBalance || 1;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Balance Trend Over Time
      </h2>

      <div className="space-y-4">
        {trendData.map((data, index) => {
          const heightPercentage = ((data.balance - minBalance) / range) * 100;
          const isPositive = data.balance >= 0;

          return (
            <div key={data.month} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">
                  {data.month}
                </span>
                <span className={`font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatCurrency(data.balance)}
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3 ${
                    isPositive
                      ? 'bg-gradient-to-r from-green-400 to-green-600'
                      : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                  style={{
                    width: `${Math.max(heightPercentage, 5)}%`,
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <span className="text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {heightPercentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
