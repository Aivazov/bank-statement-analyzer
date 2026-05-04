import React from 'react';

type TopFiveListProps = {
  topFive: {
    counterparty: string;
    total: number;
  }[];
};

const TopFiveList = ({ topFive }: TopFiveListProps) => {
  return (
    <section className='mt-4'>
      <h3 className='text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4'>
        Топ витрат за контрагентами
      </h3>
      <div className='flex flex-col justify-between items-center w-full gap-2'>
        {topFive.map(({ counterparty, total }, idx) => (
          <div
            key={idx}
            className='flex w-full justify-between items-center p-4 bg-zinc-900 border border-zinc-800 rounded-xl'
          >
            <span className='text-zinc-300 font-medium truncate mr-2'>
              {counterparty}
            </span>
            <span className='text-rose-400 font-bold whitespace-nowrap'>
              {total.toLocaleString()} ₴
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopFiveList;
