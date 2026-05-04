import z from 'zod';

export const TransactionSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  counterparty: z.string().min(1, 'Counterparty is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.coerce.number().refine((val) => !isNaN(val), 'Must be a number'),
});

export type Transaction = z.infer<typeof TransactionSchema>;

// type Transaction = {
//   date: string;
//   counterparty: string;
//   description: string;
//   amount: number;
// }
