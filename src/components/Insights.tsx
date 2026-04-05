import { TrendingUp, TrendingDown, AlertCircle, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  getHighestSpendingCategory,
  getMonthlyComparison,
  formatCurrency,
} from '../utils/calculations';

export function Insights() {
  const { transactions } = useApp();

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Financial Insights
        </h2>
        <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
          Add transactions to see insights
        </div>
      </div>
    );
  }

  const highestCategory = getHighestSpendingCategory(transactions);
  const monthlyComparison = getMonthlyComparison(transactions);

  const currentMonthNet =
    monthlyComparison.currentMonth.income - monthlyComparison.currentMonth.expenses;
  const previousMonthNet =
    monthlyComparison.previousMonth.income - monthlyComparison.previousMonth.expenses;

  const netChange = currentMonthNet - previousMonthNet;
  const netChangePercentage =
    previousMonthNet !== 0 ? (netChange / Math.abs(previousMonthNet)) * 100 : 0;

  const expenseChange =
    monthlyComparison.currentMonth.expenses - monthlyComparison.previousMonth.expenses;
  const expenseChangePercentage =
    monthlyComparison.previousMonth.expenses !== 0
      ? (expenseChange / monthlyComparison.previousMonth.expenses) * 100
      : 0;

  const insights = [
    {
      icon: Target,
      title: 'Top Spending Category',
      description: highestCategory
        ? `Your highest expense category is ${highestCategory.category} with ${formatCurrency(highestCategory.amount)} spent.`
        : 'No expense data available.',
      color: 'blue',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: netChange >= 0 ? TrendingUp : TrendingDown,
      title: 'Monthly Net Change',
      description: `Your net balance ${netChange >= 0 ? 'increased' : 'decreased'} by ${formatCurrency(Math.abs(netChange))} (${Math.abs(netChangePercentage).toFixed(1)}%) compared to last month.`,
      color: netChange >= 0 ? 'green' : 'red',
      iconBg:
        netChange >= 0
          ? 'bg-green-100 dark:bg-green-900/30'
          : 'bg-red-100 dark:bg-red-900/30',
      iconColor:
        netChange >= 0
          ? 'text-green-600 dark:text-green-400'
          : 'text-red-600 dark:text-red-400',
    },
    {
      icon: AlertCircle,
      title: 'Expense Trend',
      description:
        expenseChange >= 0
          ? `Your expenses increased by ${formatCurrency(expenseChange)} (${expenseChangePercentage.toFixed(1)}%) this month. Consider reviewing your spending habits.`
          : `Great job! Your expenses decreased by ${formatCurrency(Math.abs(expenseChange))} (${Math.abs(expenseChangePercentage).toFixed(1)}%) this month.`,
      color: expenseChange >= 0 ? 'yellow' : 'green',
      iconBg:
        expenseChange >= 0
          ? 'bg-yellow-100 dark:bg-yellow-900/30'
          : 'bg-green-100 dark:bg-green-900/30',
      iconColor:
        expenseChange >= 0
          ? 'text-yellow-600 dark:text-yellow-400'
          : 'text-green-600 dark:text-green-400',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Financial Insights
      </h2>

      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div
              key={insight.title}
              className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className={`${insight.iconBg} p-3 rounded-lg flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${insight.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {insight.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
