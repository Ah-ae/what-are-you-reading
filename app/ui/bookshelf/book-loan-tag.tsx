import type { LoanStatus } from '@/types/loan';

type Props = {
  type: LoanStatus;
};

const labels: Record<LoanStatus, string> = {
  lent: '대출 중',
  borrowed: '빌린 책',
};

export default function BookLoanTag({ type }: Props) {
  return (
    <div className="absolute top-0 left-0 z-10 overflow-hidden w-14 h-14">
      <span className="absolute top-1.5 -left-[22px] w-[72px] text-center text-[10px] font-semibold text-white bg-main-theme-color -rotate-45">
        {labels[type]}
      </span>
    </div>
  );
}
