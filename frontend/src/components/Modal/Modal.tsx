import { FunctionComponent } from "react";
import { ModalProps } from "../../@types/domain";
import "./Modal.css";
import { logger } from "../../util/logger";

export const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  type,
  onClose,
  btnName,
  btnImgUrl,
  btnCancleName = "닫기",
  onClick,

  children,
}) => {
  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  // 모달 타입에 따른 사이즈 클래스 결정
  const getModalSizeClass = () => {
    // 기본 클래스
    const baseClasses = ["modal-content"];

    // 화면 너비에 따른 분기
    const isMobile = window.innerWidth < 768;

    // 모달 타입과 크기에 따른 클래스 결정
    if (type === "walking") {
      baseClasses.push("modal-content-walking");
      baseClasses.push(
        isMobile ? "modal-walking-mobile" : "modal-walking-desktop"
      );
    } else if (type === "webtoon") {
      baseClasses.push("modal-content-webtoon");
      baseClasses.push(
        isMobile ? "modal-webtoon-mobile" : "modal-webtoon-desktop"
      );
    } else if (type === "edit") {
      baseClasses.push("modal-content-edit"); // 추가
      baseClasses.push(isMobile ? "modal-edit-mobile" : "modal-edit-desktop");
    } else if (type === "share") {
      baseClasses.push("modal-content-share"); // 추가
      baseClasses.push(
        isMobile ? "modal-action-mobile" : "modal-action-desktop"
      );
    } else if (type === "regenerate") {
      baseClasses.push("modal-content-regenerate"); // 추가
      baseClasses.push(
        isMobile ? "modal-action-mobile" : "modal-action-desktop"
      );
    }

    logger.log("[Modal] Classes:", baseClasses.join(" ")); // 디버깅용
    return baseClasses.join(" ");
  };

  logger.log("Modal type:", type); // 모달 타입 로깅
  logger.log("Modal size class:", getModalSizeClass()); // 적용된 사이즈 클래스 로깅

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={getModalSizeClass()} onClick={(e) => e.stopPropagation()}>
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
