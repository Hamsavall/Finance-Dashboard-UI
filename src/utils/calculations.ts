import type { Transaction } from '../lib/database.types';

export function calculateTotalBalance(transactions: Transaction[]): number {
  return transactions.reduce((acc, transaction) => {
    return transaction.type === 'Income'
      ? acc + Number(transaction.amount)
      : acc - Number(transaction.amount);
  }, 0);
}

export function calculateTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'Income')
    .reduce((acc, t) => acc + Number(t.amount), 0);
}

export function calculateTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'Expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);
}

export function getSpendingByCategory(transactions: Transaction[]): { category: string; amount: number }[] {
  const categoryMap = new Map<string, number>();

  transactions
    .filter((t) => t.type === 'Expense')
    .forEach((t) => {
      const current = categoryMap.get(t.category) || 0;
      categoryMap.set(t.category, current + Number(t.amount));
    });

  return Array.from(categoryMap.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

export function getBalanceTrendByMonth(transactions: Transaction[]): { month: string; balance: number }[] {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const monthlyData = new Map<string, number>();
  let runningBalance = 0;

  sortedTransactions.forEach((t) => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (t.type === 'Income') {
      runningBalance += Number(t.amount);
    } else {
      runningBalance -= Number(t.amount);
    }

    monthlyData.set(monthKey, runningBalance);
  });

  return Array.from(monthlyData.entries()).map(([month, balance]) => ({
    month: formatMonthYear(month),
    balance,
  }));
}

export function formatMonthYear(monthKey: string): string {
  const [year, month] = monthKey.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getHighestSpendingCategory(transactions: Transaction[]): { category: string; amount: number } | null {
  const spending = getSpendingByCategory(transactions);
  return spending.length > 0 ? spending[0] : null;
}

export function getMonthlyComparison(transactions: Transaction[]): {
  currentMonth: { income: number; expenses: number };
  previousMonth: { income: number; expenses: number };
} {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const previousMonthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() === previousMonth && date.getFullYear() === previousYear;
  });

  return {
    currentMonth: {
      income: calculateTotalIncome(currentMonthTransactions),
      expenses: calculateTotalExpenses(currentMonthTransactions),
    },
    previousMonth: {
      income: calculateTotalIncome(previousMonthTransactions),
      expenses: calculateTotalExpenses(previousMonthTransactions),
    },
  };
}
