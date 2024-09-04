import Portal from '@/ui/modals/portal';

type ChildrenProps = {
  children: React.ReactNode;
};

/**
 * Modal 컴포넌트를 사용하여 다음과 같이 모달을 생성합니다.
 *
 * 사용 예시:
 * ```tsx
 * <Modal>
 *   <Modal.Title>삭제 확인</Modal.Title>
 *   <Modal.Description>이 책에 관련된 데이터가 모두 삭제됩니다.</Modal.Description>
 *   <Modal.Footer>
 *     <Modal.CancelButton onClick={() => {}}>
 *       취소
 *     </Modal.CancelButton>
 *     <Modal.OkButton onClick={() => {}}>
 *       확인
 *     </Modal.OkButton>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
export default function Modal({ children }: ChildrenProps) {
  return (
    <Portal>
      <Overlay />
      <div className="fixed w-[28rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-3/5 md:w-3/4 mx-auto px-6 py-4 bg-white rounded-lg dark:bg-zinc-900 dark:text-gray-100">
          {children}
        </div>
      </div>
    </Portal>
  );
}

function Overlay() {
  return <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" />;
}

Modal.Title = function Title({ children }: ChildrenProps) {
  return <h3 className="mb-1 text-center text-lg font-semibold">{children}</h3>;
};

Modal.Description = function Description({ children }: ChildrenProps) {
  return <p className="text-sm">{children}</p>;
};

Modal.Footer = function Footer({ children }: ChildrenProps) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
};

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

Modal.CancelButton = function CancelButton({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
    >
      {children || '취소'}
    </button>
  );
};

Modal.OkButton = function OkButton({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
    >
      {children || '확인'}
    </button>
  );
};
