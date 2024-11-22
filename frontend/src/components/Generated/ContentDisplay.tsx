import React, { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { ICON_URLS } from "../../@types/domain";
import { ContentDisplayProps, ModalProps } from "../../@types/domain";
import { useNavigate } from "react-router-dom";
import { logger } from "../../util/logger";
import {} from "../../api/resultPage_api";

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
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  useEffect(() => {
    setEditedScenario(scenario);
    setDisplayScenario(scenario);
  }, [scenario]);

  const handleEditSubmit = async () => {
    try {
      setIsEditing(true);
      logger.log("시나리오 수정 시도:", editedScenario);

      const success = await onEdit(editedScenario);

      if (success) {
        setDisplayScenario(editedScenario);
        setShowEditModal(false);
      } else {
        setEditedScenario(displayScenario);
        alert("시나리오 수정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      setEditedScenario(displayScenario);
      alert("시나리오 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsEditing(false);
    }
  };

  // 갤러리 공유 처리 함수
  const handleShare = async () => {
    logger.log("갤러리 공유 시작:", { type, contentId });
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
            scenario: displayScenario,
          },
        },
      });
    } catch (error) {
      logger.error("갤러리 공유 실패:", error);
    }
  };

  const handleRegenerate = async () => {
    try {
      setShowRegenerateModal(false);
      await onRegenerate();
    } catch (error) {
      alert(
        `${type === "webtoon" ? "웹툰" : "이미지"} 재생성에 실패했습니다. 다시 시도해주세요.`
      );
    }
  };

  // 시나리오 수정 모달
  const getByteLength = (str: string) => {
    const encoder = new TextEncoder();
    return encoder.encode(str).length;
  };

  const editModalProps: ModalProps = {
    isOpen: showEditModal,
    type: "edit",
    onClose: () => {
      setShowEditModal(false);
      setEditedScenario(scenario);
    },
    btnName: isEditing ? "수정 중..." : "수정완료",
    btnImgUrl: "",
    btnCancleName: "취소",
    onClick: handleEditSubmit,

    children: (
      <div className="cr_modal_edit_content flex flex-col gap-4">
        <h2 className="cr_modal_edit_title">시나리오 수정하기</h2>
        <h3 className="cr_modal_edit_desc">
          시나리오 내용을 수정할 수 있습니다.
        </h3>
        <div className="cr_modal_edit_form relative flex flex-col">
          <div className="relative">
            <textarea
              className="cr_modal_edit_textarea "
              value={editedScenario}
              onChange={(e) => {
                logger.log("시나리오 수정중:", e.target.value);
                setEditedScenario(e.target.value);
              }}
              placeholder="시나리오를 수정해주세요"
              disabled={isEditing}
            />
            <p className="edit-byte-counter absolute right-0 -bottom-6 text-[15px] text-[#959595] mr-2">
              {getByteLength(editedScenario)}/200
            </p>
          </div>

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
    type: "share",
    onClose: () => setShowShareModal(false),
    btnName: "확인",
    btnImgUrl: "",
    btnCancleName: "취소",
    onClick: handleShare,
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
    type: "regenerate",
    onClose: () => setShowRegenerateModal(false),
    btnName: "확인",
    btnImgUrl: "",
    btnCancleName: "취소",
    onClick: handleRegenerate,

    children: (
      <div className="cr_modal_regenerate_content flex flex-col gap-4">
        <h2 className="cr_modal_regenerate_title">
          {type === "webtoon" ? "웹툰" : "이미지"} 다시 만들기
        </h2>
        <p className="cr_modal_regenerate_desc">
          '확인'을 누르면 생성된 {type === "webtoon" ? "웹툰이" : "이미지가"}
          삭제되고 {type === "webtoon" ? "웹툰을" : "이미지를"} 다시 만들게
          됩니다. {type === "webtoon" ? "웹툰을" : "이미지를"} 다시
          만들겠습니까?
        </p>
      </div>
    ),
  };

  // 애니메이션 스타일 정의
  const floatAnimation = {
    animation: "float-banner 3s ease-in-out infinite",
  };

  const floatAnimationDelayed = {
    animation: "float-banner 3s ease-in-out infinite",
    animationDelay: "1.5s",
  };

  // 애니메이션 keyframes 정의를 위한 style 태그 추가
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes float-banner {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1200px] pt-[20px] md:pt-[50px] mb-[60px] md:mb-[188px] flex flex-col items-center">
          {/* 배너 섹션 */}
          <div className="cr_banner-section flex md:flex-row flex-col justify-center items-center mb-[20px] md:mb-[37px] mt-[40px] md:mt-[80px] gap-4 md:gap-0">
            {/* 데스크톱에서만 보이는 img1 */}
            <img
              src="/asset/finish_img1.png"
              alt="result_img1"
              className="hidden md:block w-[100px] h-[70px] md:w-[200px] md:h-[140px]"
              style={floatAnimation}
            />

            {/* 제목 */}
            <h1 className="order-2 md:order-2 w-[235px] md:w-[326px] text-center text-[26px] md:text-[32px] font-bold tracking-[-0.65px] md:tracking-[-0.9px] leading-[38px] md:leading-[52px]">
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
              className="order-1 md:order-3 w-[140px] h-[70px] md:w-[280px] md:h-[140px]"
              style={floatAnimationDelayed}
            />
          </div>

          {/* 컨텐츠 카드 */}
          <div className="w-[calc(100vw-40px)] md:w-[768px] xl:w-[1200px] min-h-[665px] md:min-h-[450px] bg-white rounded-[30px] md:rounded-[50px] overflow-hidden shadow-[8px_16px_28px_rgba(36,56,159,0.29)] md:shadow-[16px_24px_36px_rgba(36,56,159,0.29)]">
            <div className="flex flex-col md:flex-row h-full md:items-center md:px-[30px] xl:px-0 relative">
              {/* 이미지 섹션 */}
              <div className="w-[calc(100vw-40px)] h-[calc(100vw-40px)] md:w-[384px] md:h-[384px] xl:w-[690px] xl:h-[690px] flex-shrink-0">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover rounded-[30px] md:rounded-[50px]"
                />
              </div>

              {/* 컨텐츠 섹션 */}
              <div className="w-[50%] whitespace-normal relative flex flex-col h-full p-[20px] pt-[30px] md:pt-[40px] md:py-[40px] md:pr-[30px] xl:py-[80px] xl:px-[65px] xs:w-[100%]">
                {/* 편집 버튼 */}
                <button
                  onClick={() => setShowEditModal(true)}
                  className="p-2 border rounded-full cursor-pointer absolute top-[20px] right-[20px] md:top-[40px] md:right-[40px] w-[44px] h-[44px] md:w-[64px] md:h-[64px]"
                  style={{ boxShadow: "4px 4px 8px #0000001A" }}
                >
                  <img
                    src={ICON_URLS.EDIT}
                    alt="edit"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </button>

                {/* 제목 */}
                <div className="flex justify-between items-center mb-[24px] md:mb-0 mt-[20px] md:mt-0 xs:mt-0">
                  <h1 className="text-[22px] md:text-[30px] tracking-[-0.6px] md:tracking-[-0.75px] font-bold">
                    {title}
                  </h1>
                </div>

                {/* 시나리오 텍스트 */}
                <div className="flex-1 overflow-y-auto">
                  <div className="md:pt-[24px] rounded-[16px]">
                    {displayScenario.split("\n").map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-[#333333] opacity-[0.88] text-[16px] md:text-[20px] last:mb-0 leading-[24px] md:leading-[30px] tracking-[-0.4px] md:tracking-[-0.5px] font-normal"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* 버튼 그룹 */}
                <div className="flex flex-col gap-3 w-full md:w-[320px] xl:w-[385px] xs:mt-[60px] justify-center items-center">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="w-full py-2 md:py-3 px-4 md:px-6 h-[48px] md:h-[56px] rounded-[24px] md:rounded-[28px] text-white relative"
                    style={{
                      background:
                        "linear-gradient(90deg, #1B58FD 0%, #00BAA8 100%)",
                    }}
                  >
                    <div className="flex items-center text-[16px] md:text-[18px] font-medium justify-center gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      갤러리 올리기
                      <img
                        src={ICON_URLS.UPLOAD}
                        alt="Upload"
                        className="w-4 h-4 md:w-5 md:h-5"
                      />
                    </div>
                  </button>
                  <button
                    onClick={() => setShowRegenerateModal(true)}
                    className="w-full py-2 md:py-3 px-4 md:px-6 h-[48px] md:h-[56px] rounded-[24px] md:rounded-[28px] font-normal bg-[#EDEDED] text-[#666666] text-[16px] md:text-[18px]"
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
