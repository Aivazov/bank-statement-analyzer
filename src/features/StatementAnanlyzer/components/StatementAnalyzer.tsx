'use client';
import Papa from 'papaparse';
import React, { ChangeEvent, useState } from 'react';
import { File } from 'zod/v4/core';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Transaction } from '../schemas/transactionSchema';
import { Input } from '@/components/ui/input';

const StatementAnalyzer = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const parseStatement = async (file: File): Promise<Transaction[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const parsedData = results.data;
          if (parsedData) {
            resolve(parsedData as Transaction[]);
          } else {
            reject('Error with converting data');
          }
        },
      });
    });
  };

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const parsedFile = await parseStatement(file);
    setTransactions(parsedFile);
  };

  const filterTransactions = () => {
    handleSummary(transactions);
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

  const handleSummary = (arr: Transaction[]) => {
    let totalIncome = 0;
    let totalExpense = 0;

    totalIncome = arr
      .filter((t) => t.amount > 0)
      .reduce((acc, curr) => acc + curr.amount, 0);
    totalExpense = arr
      .filter((t) => t.amount < 0)
      .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

    handleTopFiveCounterpartiesExpenses(arr);
    return {
      totalIncome,
      totalExpense,
      netResult: totalIncome - totalExpense,
      transactionsCount: arr.length - 1,
    };
  };

  const handleTopFiveCounterpartiesExpenses = (arr: Transaction[]) => {
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

  const filteredTransactions = handleSearchQuery(searchQuery);
  const summary = handleSummary(transactions);
  const topFive = handleTopFiveCounterpartiesExpenses(transactions);

  return (
    <div className='flex flex-col w-full gap-4'>
      {/* UPLOADER */}
      <section className='relative border-2 border-gray-400 p-10 rounded-3xl border-dashed hover:bg-zinc-300'>
        <input
          type='file'
          accept='.csv'
          onChange={uploadFile}
          className='bg-red-300 absolute w-full h-full inset-0 opacity-0 cursor-pointer'
        />
        <p>Drag CSV file here to upload</p>
      </section>

      {/* SUMMARY CARDS */}
      <section className='flex flex-row w-full gap-4'>
        <Card size='sm' className='mx-auto w-full max-w-sm'>
          <CardHeader>
            <CardTitle>Загальний дохід</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{summary.totalIncome} ₴</p>
          </CardContent>
        </Card>
        <Card size='sm' className='mx-auto w-full max-w-sm'>
          <CardHeader>
            <CardTitle>Загальна витрата</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{summary.totalExpense} ₴</p>
          </CardContent>
        </Card>
        <Card size='sm' className='mx-auto w-full max-w-sm'>
          <CardHeader>
            <CardTitle>Чистий результат</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{summary.netResult} ₴</p>
          </CardContent>
        </Card>
        <Card size='sm' className='mx-auto w-full max-w-sm'>
          <CardHeader>
            <CardTitle>Кількість транзакцій</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{summary.transactionsCount}</p>
          </CardContent>
        </Card>
      </section>

      {/* FILTER Selector & SearchBar */}
      <section className='flex gap-3'>
        <Select defaultValue='all' onValueChange={setFilterType}>
          <SelectTrigger className='w-full max-w-48'>
            <SelectValue placeholder='Filter' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='all'>Усі</SelectItem>
              <SelectItem value='income'>Доходи</SelectItem>
              <SelectItem value='expense'>Витрати</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          placeholder='Search by counterparty or description'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      {/* TABLE */}
      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Date</TableHead>
              <TableHead>Counterparty</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map(
              ({ date, counterparty, description, amount }, idx) => (
                <TableRow key={idx}>
                  <TableCell className='font-medium'>{date}</TableCell>
                  <TableCell>{counterparty}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell className='text-right'>{amount}</TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </section>

      {/* Top FIVE */}
      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Name</TableHead>
              <TableHead className='text-right'>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topFive.map(({ counterparty, total }, idx) => (
              <TableRow key={idx}>
                <TableCell className='font-medium'>{counterparty}</TableCell>
                <TableCell className='text-right'>{total} ₴</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default StatementAnalyzer;
