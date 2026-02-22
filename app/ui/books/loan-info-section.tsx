import { containerStyles, itemStyles, beforePseudoElementStyles } from '@/constants/style';
import { formatKoreanDate } from '@/utils/date';
import type { LoanStatus } from '@/types/loan';

type Props = {
  type: LoanStatus;
  personName: string;
  lentAt: Date;
};

export default function LoanInfoSection({ type, personName, lentAt }: Props) {
  const label = '대출 정보';
  const description = type === 'lent' ? `빌려간 사람: ${personName}` : `빌려준 사람: ${personName}`;

  return (
    <div data-before={label} className={`${beforePseudoElementStyles} ${containerStyles}`}>
      <div className={itemStyles}>
        <p>{description}</p>
        <p className="text-sm text-neutral-500 mt-1">{formatKoreanDate(lentAt)}</p>
      </div>
    </div>
  );
}
