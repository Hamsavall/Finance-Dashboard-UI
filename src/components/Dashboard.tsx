import { SummaryCards } from './SummaryCards';
import { BalanceTrendChart } from './BalanceTrendChart';
import { SpendingByCategory } from './SpendingByCategory';
import { Insights } from './Insights';
import { TransactionList } from './TransactionList';
import { useApp } from '../context/AppContext';
import { Loader2 } from 'lucide-react';

export function Dashboard() {
  const { loading } = useApp();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <SummaryCards />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BalanceTrendChart />
            <SpendingByCategory />
          </div>

          <Insights />

          <TransactionList />
        </div>
      </main>
    </div>
  );
}
