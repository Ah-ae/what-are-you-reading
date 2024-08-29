'use client';

import Modal from '@/ui/modals/modal';

type Props = {
  closeModal: () => void;
};

export default function DeleteBookConfirmModal({ closeModal }: Props) {
  return (
    <Modal>
      <Modal.Title>삭제 확인</Modal.Title>
      <Modal.Description>이 책에 관련된 데이터가 모두 삭제됩니다.</Modal.Description>
      <Modal.Footer>
        <Modal.CancelButton onClick={closeModal}>취소</Modal.CancelButton>
        <Modal.OkButton
          onClick={() => {
            /* 확인 처리 */
          }}
        >
          확인
        </Modal.OkButton>
      </Modal.Footer>
    </Modal>
  );
}
