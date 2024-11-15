import React, { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { ICON_URLS } from "../../@types/domain";
import { ContentDisplayProps, ModalProps } from "../../@types/domain";
import { useNavigate } from "react-router-dom";

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  type,
  imageUrl,
  title,
  scenario,
  contentId,
  onEdit,
  onShare,
  onRegenerate,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedScenario, setEditedScenario] = useState(scenario);
  const [isEditing, setIsEditing] = useState(false);
  const [displayScenario, setDisplayScenario] = useState(scenario); // 표시할 시나리오 상태 추가
  const navigate = useNavigate();

  // 시나리오 prop이 변경될 때 상태들 업데이트
  useEffect(() => {
    setEditedScenario(scenario);
    setDisplayScenario(scenario);
  }, [scenario]);

  const handleEditSubmit = async () => {
    try {
      setIsEditing(true);
      console.log("시나리오 수정 시도:", editedScenario);

      const success = await onEdit(editedScenario);
      if (success) {
        // 수정된 시나리오를 화면에 바로 반영
        setDisplayScenario(editedScenario);
        setShowEditModal(false);
        console.log("시나리오 수정 성공:", editedScenario);
      }
    } catch (error) {
      console.error("시나리오 수정 실패:", error);
      // 실패 시 원래 시나리오로 복구
      setEditedScenario(displayScenario);
      alert("시나리오 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsEditing(false);
    }
  };

  // 갤러리 공유 처리 함수
  const handleShare = async () => {
    console.log("갤러리 공유 시작:", { type, contentId });
    try {
      await onShare(); // 공유 처리
      // DetailContent로 이동
      navigate(`/shared/${type}/${contentId}`, {
        state: {
          source: "chatbot",
          content: {
            id: Number(contentId),
            type,
            title,
            imgUrl: imageUrl,
            createdAt: new Date().toISOString().split("T")[0],
          },
        },
      });
    } catch (error) {
      console.error("갤러리 공유 실패:", error);
    }
  };

  const getModalStyle = (modalType: "edit" | "share" | "regenerate") => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const footerHeight = 100; // 푸터 높이
    const availableHeight = viewportHeight - footerHeight;

    const style = document.documentElement.style;

    if (modalType === "edit") {
      const width = Math.min(viewportWidth / 3, 620); // 화면 너비의 1/3, 최대 620px
      const height = Math.min(availableHeight / 2, 544); // 사용 가능 높이의 1/2, 최대 544px

      console.log("Edit Modal Size:", { width, height });

      style.setProperty("--modal-width", `${width}px`);
      style.setProperty("--modal-height", `${height}px`);
      return {
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: "620px !important",
        maxHeight: "544px !important",
        margin: "0 !important",
      } as const;
    } else {
      const width = Math.min((viewportWidth * 2) / 5, 486);
      const height = Math.min(availableHeight / 3, 294);

      console.log("Share/Regenerate Modal Size:", { width, height });

      style.setProperty("--modal-width", `${width}px`);
      style.setProperty("--modal-height", `${height}px`);
      return {
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: "486px !important",
        maxHeight: "294px !important",
        margin: "0 !important",
      } as const;
    }
  };
  // 시나리오 수정 모달
  const editModalProps: ModalProps = {
    isOpen: showEditModal,
    type: type, // ContentDisplayProps에서 받은 type (BoardType)
    onClose: () => {
      setShowEditModal(false);
      setEditedScenario(scenario);
    },
    btnName: isEditing ? "수정 중..." : "수정완료",
    btnImgUrl: "",
    btnCancleName: "취소",
    onClick: handleEditSubmit,
    modalStyle: getModalStyle("edit"),
    children: (
      <div className="cr_modal_edit_content flex flex-col gap-4">
        <h2 className="cr_modal_edit_title">시나리오 수정하기</h2>
        <h3 className="cr_modal_edit_desc">
          시나리오 내용을 수정할 수 있습니다.
        </h3>
        <div className="cr_modal_edit_form">
          <textarea
            className="cr_modal_edit_textarea"
            value={editedScenario}
            onChange={(e) => {
              console.log("시나리오 수정중:", e.target.value);
              setEditedScenario(e.target.value);
            }}
            placeholder="시나리오를 수정해주세요"
            disabled={isEditing}
          />
          {isEditing && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-[16px]">
              <div className="text-[#1B58FD] text-lg">수정 중...</div>
            </div>
          )}
        </div>
      </div>
    ),
  };

  // 공유하기 모달
  const shareModalProps: ModalProps = {
    isOpen: showShareModal,
    type: type,
    onClose: () => setShowShareModal(false),
    btnName: "확인",
    btnImgUrl: "",
    btnCancleName: "취소",
    onClick: handleShare,
    modalStyle: getModalStyle("share"),
    children: (
      <div className="cr_modal_share_content flex flex-col gap-4">
        <h2 className="cr_modal_share_title">갤러리 올리기</h2>
        <p className="cr_modal_share_desc">
          '확인'을 누르면 생성된 이미지가 갤러리에 올라갑니다. 이미지를 갤러리에
          올리시겠습니까?
        </p>
      </div>
    ),
  };

  // 다시 생성하기 모달
  const regenerateModalProps: ModalProps = {
    isOpen: showRegenerateModal,
    type: type,
    onClose: () => setShowRegenerateModal(false),
    btnName: "확인",
    btnImgUrl: "",
    btnCancleName: "취소",
    onClick: () => {
      setShowRegenerateModal(false);
      onRegenerate();
    },
    modalStyle: getModalStyle("regenerate"),
    children: (
      <div className="flex flex-col gap-4">
        <h2 className="text-[24px] font-bold tracking-[-0.6px]">
          이미지 다시 만들기
        </h2>
        <p className="text-[#333333] text-[18px] tracking-[-0.45px] ">
          '확인'을 누르면 생성된 이미지가 삭제되고 이미지를 다시 만들게 됩니다.
          이미지를 다시 만들겠습니까?
        </p>
      </div>
    ),
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1200px] pt-[50px] mb-[188px] flex flex-col items-center">
          {/* 배너 섹션 */}
          <div className="cr_banner-section flex justify-center items-center mb-[37px] mt-[80px]">
            <img
              src="/asset/finish_img1.png"
              alt="result_img1"
              className="w-[200px] h-[140px]"
            />
            <h1 className="w-[326px] text-center text-[36px] font-bold tracking-[-0.9px] leading-[52px]">
              {type === "walking" ? (
                <>
                  나만의 걷고 싶은 강남이
                  <br />
                  완성되었어요!
                </>
              ) : (
                <>
                  내가 그린 웹툰이
                  <br />
                  완성되었어요!
                </>
              )}
            </h1>
            <img
              src="/asset/finish_img2.png"
              alt="result_img2"
              className="w-[280px] h-[140px]"
            />
          </div>

          {/* 컨텐츠 카드 */}
          <div className="w-[1200px] h-[690px] shadow-[16px_24px_36px_rgba(41,66,196,0.16)] bg-white rounded-[50px] overflow-hidden">
            <div className="flex h-full">
              {/* 이미지 섹션 */}
              <div className="w-[690px] h-[690px] flex-shrink-0">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full rounded-[50px] object-cover"
                />
              </div>

              {/* 컨텐츠 섹션 */}
              <div className="flex-1 relative flex flex-col h-full py-[80px] px-[65px]">
                <button
                  onClick={() => {
                    setShowEditModal(true);
                  }}
                  className="p-2 border rounded-full cursor-pointer absolute top-[40px] right-[40px] w-[64px] h-[64px]"
                  style={{ boxShadow: "4px 4px 8px #0000001A" }}
                >
                  <img src={ICON_URLS.EDIT} alt="edit" className="w-6 h-6" />
                </button>

                {/* 제목 */}
                <div className="flex justify-between items-center mb-[24px]">
                  <h1 className="text-[30px] tracking-[-0.75px] font-bold">
                    {title}
                  </h1>
                </div>

                {/* 시나리오 텍스트 */}
                <div className="flex-1 overflow-y-auto mb-6">
                  <div className="p-6 rounded-[16px]">
                    {displayScenario.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-[#333333] mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* 버튼 그룹 */}
                <div className="flex flex-col gap-3 w-[385px] justify-center items-center">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="w-full py-3 px-6 h-[56px] rounded-[28px] text-white relative"
                    style={{
                      background:
                        "linear-gradient(90deg, #1B58FD 0%, #00BAA8 100%)",
                    }}
                  >
                    <div className="flex items-center text-[18px] font-medium justify-center gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      갤러리 올리기
                      <img
                        src={ICON_URLS.UPLOAD}
                        alt="Upload"
                        className="w-5 h-5"
                      />
                    </div>
                  </button>
                  <button
                    onClick={() => setShowRegenerateModal(true)}
                    className="w-full py-3 px-6 rounded-[28px] font-regular bg-[#EDEDED] text-[#666666] text-[18px]"
                  >
                    다른 이미지 만들기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal {...editModalProps} />
      <Modal {...shareModalProps} />
      <Modal {...regenerateModalProps} />
    </>
  );
};

export default ContentDisplay;
