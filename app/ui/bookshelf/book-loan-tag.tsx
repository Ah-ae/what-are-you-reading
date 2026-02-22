import type { LoanStatus } from '@/types/loan';

type Props = {
  type: LoanStatus;
};

const labels: Record<LoanStatus, string> = {
  lent: '빌려준 책',
  borrowed: '빌린 책',
};

export default function BookLoanTag({ type }: Props) {
  return (
    <span className="absolute top-0 left-0 z-10 px-1 text-[10px] font-semibold text-white bg-zinc-700/80">
      {labels[type]}
    </span>
  );
}
