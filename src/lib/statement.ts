import { Transaction } from '@/features/StatementAnanlyzer/schemas/transactionSchema';

export const handleSummary = (arr: Transaction[]) => {
  let totalIncome = 0;
  let totalExpense = 0;

  totalIncome = arr
    .filter((t) => t.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);
  totalExpense = arr
    .filter((t) => t.amount < 0)
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  return {
    totalIncome,
    totalExpense,
    netResult: totalIncome - totalExpense,
    transactionsCount: arr.length,
  };
};

export const handleTopFiveCounterpartiesExpenses = (arr: Transaction[]) => {
  const expenses = arr.filter((t) => {
    const filtered = t.amount < 0;
    return filtered;
  });

  const grouped = expenses.reduce((acc: Record<string, number>, curr) => {
    acc[curr.counterparty] =
      (acc[curr.counterparty] || 0) + Math.abs(curr.amount);
    return acc;
  }, {});

  const result = Object.entries(grouped)
    .map(([counterparty, total]) => ({
      counterparty,
      total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
  return result;
};
