import { FunctionComponent } from "react";
import { ModalProps } from "../../@types/domain";
import "./Modal.css";

export const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  type,
  onClose,
  btnName,
  btnImgUrl,
  btnCancleName = "닫기",
  onClick,
  modalStyle,
  children,
}) => {
  if (!isOpen) return null; // 모달이 열리지 않은 상태라면 아무것도 렌더링하지 않음

  const getModalContentClass = () => {
    const baseClass = "modal-content";
    if (type === "walking") return `${baseClass} modal-content-walking`;
    if (type === "webtoon") return `${baseClass} modal-content-webtoon`;
    return baseClass;
  };

  const getButtonClass = () => {
    const baseClass = "navigate-button";
    if (type === "walking") return `${baseClass} navigate-button-walking`;
    if (type === "webtoon") return `${baseClass} navigate-button-webtoon`;
    return baseClass;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={getModalContentClass()}
        onClick={(e) => e.stopPropagation()}
        style={modalStyle}
      >
        {children} {/* 모달 안에 표시될 내용 */}
        <div className="btn-layout">
          <button className="close-button" onClick={onClose}>
            {btnCancleName}
          </button>
          <button
            className={`${getButtonClass()} navigate-button`}
            onClick={onClick}
          >
            <span>{btnName}</span>
            {btnImgUrl && (
              <img
                src={btnImgUrl}
                alt="button_icon"
                className="w-5 h-5 object-contain"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
