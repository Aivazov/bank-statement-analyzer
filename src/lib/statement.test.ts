import { describe, it, expect } from 'vitest';
import {
  handleSummary,
  handleTopFiveCounterpartiesExpenses,
} from './statement';
import { Transaction } from '@/features/StatementAnanlyzer/schemas/transactionSchema';

describe('Statement Analyzer - Real CSV Data Test', () => {
  const mockTransactions: Transaction[] = [
    {
      date: '2025-01-03',
      counterparty: 'ТОВ "Альфа Трейд"',
      description: 'Послуги',
      amount: 18500.0,
    },
    {
      date: '2025-01-04',
      counterparty: 'ФОП Петренко І.І.',
      description: 'Канцтовари',
      amount: -2350.5,
    },
    {
      date: '2025-01-05',
      counterparty: 'Сільпо',
      description: 'Продукти',
      amount: -1840.2,
    },
    {
      date: '2025-01-07',
      counterparty: 'ТОВ "Бета Софт"',
      description: 'CRM',
      amount: 42000.0,
    },
    {
      date: '2025-01-08',
      counterparty: 'Нова Пошта',
      description: 'Доставка',
      amount: -185.0,
    },
    {
      date: '2025-01-09',
      counterparty: 'ФОП Коваленко О.М.',
      description: 'Юр. послуги',
      amount: -7500.0,
    },
    {
      date: '2025-01-10',
      counterparty: 'ПриватБанк',
      description: 'Комісія',
      amount: -450.0,
    },
    {
      date: '2025-01-11',
      counterparty: 'ТОВ "Гама Лоджистік"',
      description: 'Транспорт',
      amount: 12300.0,
    },
    {
      date: '2025-01-13',
      counterparty: 'Епіцентр',
      description: 'Меблі',
      amount: -15600.0,
    },
    {
      date: '2025-01-14',
      counterparty: 'ФОП Іванов С.С.',
      description: 'Дизайн',
      amount: -8000.0,
    },
    {
      date: '2025-01-15',
      counterparty: 'ТОВ "Дельта Маркет"',
      description: 'Обладнання',
      amount: 55000.0,
    },
    {
      date: '2025-01-30',
      counterparty: 'ФОП Петренко І.І.',
      description: 'Папір',
      amount: -3450.0,
    },
  ];

  it('should correctly calculate summary for provided CSV subset', () => {
    const result = handleSummary(mockTransactions);

    expect(result.totalIncome).toBeCloseTo(127800, 2);
    expect(result.totalExpense).toBeCloseTo(39375.7, 2);
    expect(result.netResult).toBeCloseTo(88424.3, 2);
    expect(result.transactionsCount).toBe(12);
  });

  it('should group expenses by counterparty correctly (Top-5)', () => {
    const topFive = handleTopFiveCounterpartiesExpenses(mockTransactions);

    const petrenko = topFive.find(
      (t) => t.counterparty === 'ФОП Петренко І.І.',
    );

    expect(petrenko).toBeDefined();
    expect(petrenko?.total).toBeCloseTo(5800.5, 2);

    expect(topFive[0].counterparty).toBe('Епіцентр');
  });
});
