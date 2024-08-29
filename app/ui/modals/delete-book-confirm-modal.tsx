'use client';

import Modal from '@/ui/modals/modal';
import { deleteBook } from '@/books/[id]/actions';

type Props = {
  closeModal: () => void;
  bookId: number;
};

export default function DeleteBookConfirmModal({ closeModal, bookId }: Props) {
  return (
    <Modal>
      <Modal.Title>삭제 확인</Modal.Title>
      <Modal.Description>이 책에 관련된 데이터가 모두 삭제됩니다.</Modal.Description>
      <Modal.Footer>
        <Modal.CancelButton onClick={closeModal}>취소</Modal.CancelButton>
        <Modal.OkButton
          onClick={async () => {
            await deleteBook(bookId);
          }}
        >
          확인
        </Modal.OkButton>
      </Modal.Footer>
    </Modal>
  );
}
