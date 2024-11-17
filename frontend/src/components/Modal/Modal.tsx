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
  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  // 모달 타입에 따른 사이즈 클래스 결정
  const getModalSizeClass = () => {
    // 기본 클래스
    const baseClass = "modal-content";

    // 화면 너비에 따른 분기
    const isMobile = window.innerWidth < 768;

    // 모달 타입과 크기에 따른 클래스 결정
    if (type === "walking") {
      return `${baseClass} ${isMobile ? "modal-walking-mobile" : "modal-walking-desktop"}`;
    }
    if (type === "webtoon") {
      return `${baseClass} ${isMobile ? "modal-webtoon-mobile" : "modal-webtoon-desktop"}`;
    }
    if (type === "edit") {
      return `${baseClass} ${isMobile ? "modal-edit-mobile" : "modal-edit-desktop"}`;
    }
    if (type === "share" || type === "regenerate") {
      return `${baseClass} ${isMobile ? "modal-action-mobile" : "modal-action-desktop"}`;
    }

    return baseClass;
  };

  console.log("Modal type:", type); // 모달 타입 로깅
  console.log("Modal size class:", getModalSizeClass()); // 적용된 사이즈 클래스 로깅

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={getModalSizeClass()}
        onClick={(e) => e.stopPropagation()}
        style={modalStyle}
      >
        <div className="modal-inner">
          {children}
          <div className="btn-layout">
            <button className="close-button" onClick={onClose}>
              {btnCancleName}
            </button>
            <button className="navigate-button" onClick={onClick}>
              <div className="navigate-button-content">
                <span className="button-text">{btnName}</span>
                {btnImgUrl && (
                  <img
                    src={btnImgUrl}
                    alt="button icon"
                    className="button-icon"
                  />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
