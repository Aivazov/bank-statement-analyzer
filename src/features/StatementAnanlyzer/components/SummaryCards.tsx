import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type SummaryCardsProps = {
  summary: {
    totalIncome: number;
    totalExpense: number;
    netResult: number;
    transactionsCount: number;
  };
};

const SummaryCards = ({ summary }: SummaryCardsProps) => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {[
        {
          title: 'Загальний дохід',
          value: summary.totalIncome,
          color: 'text-emerald-400',
        },
        {
          title: 'Загальні витрати',
          value: summary.totalExpense,
          color: 'text-rose-400',
        },
        {
          title: 'Чистий результат',
          value: summary.netResult,
          color: summary.netResult >= 0 ? 'text-emerald-400' : 'text-rose-400',
        },
        {
          title: 'Кількість транзакцій',
          value: summary.transactionsCount,
          color: 'text-zinc-100',
        },
      ].map((item, idx) => (
        <Card key={idx} className='bg-zinc-900 border-zinc-800 shadow-xl'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xs font-medium text-zinc-400 uppercase tracking-wider'>
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${item.color}`}>
              {typeof item.value === 'number' && idx < 3
                ? `${item.value.toLocaleString()} ₴`
                : item.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default SummaryCards;
