import StatementAnalyzer from '@/features/StatementAnanlyzer/components/StatementAnalyzer';

export default function Home() {
  return (
    <div className='font-sans'>
      <main className='flex flex-col w-full justify-center items-center bg-zinc-800'>
        <StatementAnalyzer />
      </main>
    </div>
  );
}
