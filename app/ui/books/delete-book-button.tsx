'use client';

import { useState } from 'react';
import DeleteBookConfirmModal from '@/ui/modals/delete-book-confirm-modal';

export default function DeleteBookButton({ bookId }: { bookId: number }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex justify-center group-last:bg-inherit">
        <button onClick={openModal} className="text-red-600">
          책 삭제
        </button>
      </div>
      {showModal && <DeleteBookConfirmModal closeModal={closeModal} bookId={bookId} />}
    </>
  );
}
