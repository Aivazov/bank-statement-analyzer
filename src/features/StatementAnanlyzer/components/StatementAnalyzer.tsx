'use client';

import { Input } from '@/components/ui/input';
import {
  handleSummary,
  handleTopFiveCounterpartiesExpenses,
} from '@/lib/statement';
import { useStatement } from '../hooks/useStatement';
import SummaryCards from './SummaryCards';
import StatementTable from './StatementTable';
import TopFiveList from './TopFiveList';
import ParseErrorNotifier from './ParseErrorNotifier';
import FileUploader from './FileUploader';
import FilterSelector from './FilterSelector';

const StatementAnalyzer = () => {
  const {
    uploadFile,
    skippedCount,
    transactions,
    setFilterType,
    searchQuery,
    setSearchQuery,
    handleSearchQuery,
  } = useStatement();

  const filteredTransactions = handleSearchQuery(searchQuery);
  const summary = handleSummary(transactions);
  const topFive = handleTopFiveCounterpartiesExpenses(transactions);

  return (
    <div className='min-h-screen bg-zinc-800 text-zinc-300 p-6 flex flex-col gap-6'>
      {/* UPLOADER */}
      <FileUploader uploadFile={uploadFile} />

      {/* Parsing Errors Handler */}
      {skippedCount > 0 && <ParseErrorNotifier skippedCount={skippedCount} />}

      {transactions.length > 0 && (
        <>
          {/* SUMMARY CARDS */}
          <SummaryCards summary={summary} />

          {/* FILTER Selector & SearchBar */}
          <section className='flex flex-col sm:row flex-wrap gap-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800'>
            <div className='flex gap-3 w-full'>
              <FilterSelector setFilterType={setFilterType} />

              <Input
                placeholder='Пошук контрагента або опису...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='bg-zinc-900 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-zinc-700'
              />
            </div>
          </section>

          {/* TABLE */}
          <StatementTable filteredTransactions={filteredTransactions} />

          {/* Top FIVE */}
          <TopFiveList topFive={topFive} />
        </>
      )}
    </div>
  );
};

export default StatementAnalyzer;
