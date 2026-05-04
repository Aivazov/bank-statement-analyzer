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

export const exportToCSV = (data: Transaction[]) => {
  if (data.length === 0) return;

  console.log('data', data);

  const csv = Papa.unparse(data);
  console.log('csv', csv);

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(
    'download',
    `filtered_statement_${new Date().toISOString().slice(0, 10)}.csv`,
  );
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
