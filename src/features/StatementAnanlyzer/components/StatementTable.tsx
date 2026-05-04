import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Transaction } from '../schemas/transactionSchema';

type StatementTableProps = {
  filteredTransactions: Transaction[];
};

const StatementTable = ({ filteredTransactions }: StatementTableProps) => {
  return (
    <section className='bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl'>
      <Table>
        <TableHeader className='bg-zinc-800/50'>
          <TableRow className='border-zinc-800 hover:bg-transparent'>
            <TableHead className='text-zinc-400 font-medium'>Дата</TableHead>
            <TableHead className='text-zinc-400 font-medium'>
              Контрагент
            </TableHead>
            <TableHead className='text-zinc-400 font-medium'>Опис</TableHead>
            <TableHead className='text-right text-zinc-400 font-medium'>
              Сума
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map(
            ({ date, counterparty, description, amount }, idx) => (
              <TableRow
                key={idx}
                className='border-zinc-800 hover:bg-zinc-800/30 transition-colors'
              >
                <TableCell className='font-medium text-zinc-500'>
                  {date}
                </TableCell>
                <TableCell className='font-medium text-zinc-200'>
                  {counterparty}
                </TableCell>
                <TableCell>{description}</TableCell>
                <TableCell
                  className={`text-right font-bold ${amount > 0 ? 'text-emerald-400' : 'text-zinc-200'}`}
                >
                  {amount} ₴
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default StatementTable;
