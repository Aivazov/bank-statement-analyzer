import { parseStatement } from '@/lib/csvParser';
import { ChangeEvent, useState } from 'react';
import { Transaction } from '../schemas/transactionSchema';

export const useStatement = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [skippedCount, setSkippedCount] = useState(0);

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { data, errors } = await parseStatement(file as File);

      setTransactions(data);
      setSkippedCount(errors);
    } catch (err) {
      console.log('Помилка парсингу:', err);
    }
  };

  const filterTransactions = () => {
    switch (filterType) {
      case 'income':
        return transactions.filter((t) => t.amount > 0);
      case 'expense':
        return transactions.filter((t) => t.amount < 0);

      default:
        return transactions;
    }
  };

  const handleSearchQuery = (query: string) => {
    const filteredData = filterTransactions();
    return filteredData.filter((t) => {
      const counterpartyLowered = t.counterparty?.toLowerCase() || '';
      const descriptionLowered = t.description?.toLowerCase() || '';

      const queryLowered = query.toLowerCase();

      return (
        counterpartyLowered.includes(queryLowered) ||
        descriptionLowered.includes(queryLowered)
      );
    });
  };

  return {
    uploadFile,
    skippedCount,
    transactions,
    setFilterType,
    searchQuery,
    setSearchQuery,
    handleSearchQuery,
  };
};
