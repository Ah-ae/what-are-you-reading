'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/ui/modals/modal';
import { returnLoan } from '@/(bookshelf)/loan/actions';

type Props = {
  closeModal: () => void;
  loanId: number;
  redirectTo?: string;
};

export default function ReturnBookConfirmModal({ closeModal, loanId, redirectTo }: Props) {
  const router = useRouter();

  return (
    <Modal>
      <Modal.Title>반납 확인</Modal.Title>
      <Modal.Description>이 책을 반납할까요?</Modal.Description>
      <Modal.Footer>
        <Modal.CancelButton onClick={closeModal}>취소</Modal.CancelButton>
        <Modal.OkButton
          onClick={async () => {
            await returnLoan(loanId);
            if (redirectTo) {
              router.push(redirectTo);
            } else {
              router.refresh();
              closeModal();
            }
          }}
        >
          확인
        </Modal.OkButton>
      </Modal.Footer>
    </Modal>
  );
}
