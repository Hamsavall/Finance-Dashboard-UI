import { useApp } from '../context/AppContext';
import { getSpendingByCategory, formatCurrency } from '../utils/calculations';

const COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-teal-500',
];

export function SpendingByCategory() {
  const { transactions } = useApp();
  const categoryData = getSpendingByCategory(transactions);

  if (categoryData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Spending by Category
        </h2>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No expense data available
        </div>
      </div>
    );
  }

  const totalSpending = categoryData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Spending by Category
      </h2>

      <div className="space-y-4">
        {categoryData.map((item, index) => {
          const percentage = (item.amount / totalSpending) * 100;
          const colorClass = COLORS[index % COLORS.length];

          return (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${colorClass}`} />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 dark:text-gray-400">
                    {percentage.toFixed(1)}%
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white min-w-[100px] text-right">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${colorClass} rounded-full transition-all duration-500`}
                  style={{
                    width: `${percentage}%`,
                    animationDelay: `${index * 100}ms`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Total Expenses
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatCurrency(totalSpending)}
          </span>
        </div>
      </div>
    </div>
  );
}
