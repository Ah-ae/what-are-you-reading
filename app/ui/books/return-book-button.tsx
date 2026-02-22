'use client';

import { useState } from 'react';
import ReturnBookConfirmModal from '@/ui/modals/return-book-confirm-modal';

type Props = {
  loanId: number;
  redirectTo?: string;
};

export default function ReturnBookButton({ loanId, redirectTo }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex justify-center group-last:bg-inherit">
        <button onClick={() => setShowModal(true)} className="text-blue-600">
          반납하기
        </button>
      </div>
      {showModal && (
        <ReturnBookConfirmModal closeModal={() => setShowModal(false)} loanId={loanId} redirectTo={redirectTo} />
      )}
    </>
  );
}
