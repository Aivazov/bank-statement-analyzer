import Papa from 'papaparse';
import {
  Transaction,
  TransactionSchema,
} from '@/features/StatementAnanlyzer/schemas/transactionSchema';

export const parseStatement = async (
  file: File,
): Promise<{ data: Transaction[]; errors: number }> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawData = results.data;
        const validTransactions: Transaction[] = [];
        let errorCount = 0;

        rawData.forEach((row) => {
          const validation = TransactionSchema.safeParse(row);
          if (validation.success) {
            validTransactions.push(validation.data);
          } else {
            errorCount++;
            console.error('Invalid row:', row, validation.error.issues);
          }
        });

        resolve({ data: validTransactions, errors: errorCount });
      },
      error: (error) => reject(error),
    });
  });
};
