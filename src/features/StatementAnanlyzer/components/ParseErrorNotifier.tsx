import React from 'react';

type ParseErrorNotifierProps = {
  skippedCount: number;
};

const ParseErrorNotifier = ({ skippedCount }: ParseErrorNotifierProps) => {
  return (
    <div className='bg-red-950/30 border border-red-900/50 p-4 rounded-xl text-red-400 text-sm'>
      <p className=''>
        Увага: <strong>{skippedCount}</strong> ряд
        {skippedCount === 1 || skippedCount === 21 || skippedCount === 31
          ? 'ок'
          : skippedCount > 1 && skippedCount < 5
            ? 'ка'
            : 'ків'}{' '}
        було пропущено через помилки валідації.
      </p>
    </div>
  );
};

export default ParseErrorNotifier;
