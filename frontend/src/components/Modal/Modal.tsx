import { FunctionComponent, ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  btnName: string;
  onClose: () => void;
  onClick?: () => void;
  children?: ReactNode;
}

export const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  onClose,
  btnName,
  onClick,
  children,
}) => {
  if (!isOpen) return null; // 모달이 열리지 않은 상태라면 아무것도 렌더링하지 않음

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children} {/* 모달 안에 표시될 내용 */}
        <div className="btn-layout">
          <button className="close-button" onClick={onClose}>
            닫기
          </button>
          <button className="navigate-button" onClick={onClick}>
            {btnName}
          </button>
        </div>
      </div>
    </div>
  );
};
