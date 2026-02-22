'use client';

import { useState } from 'react';
import LendBookModal from '@/ui/modals/lend-book-modal';

export default function LendBookButton({ bookId }: { bookId: number }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex justify-center group-last:bg-inherit">
        <button onClick={() => setShowModal(true)} className="text-blue-600">
          친구에게 빌려주기
        </button>
      </div>
      {showModal && <LendBookModal closeModal={() => setShowModal(false)} bookId={bookId} />}
    </>
  );
}
