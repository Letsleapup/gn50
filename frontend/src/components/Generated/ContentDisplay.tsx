import React, { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { ICON_URLS } from "../../@types/domain";

interface ContentDisplayProps {
  type: "webtoon" | "walking";
  imageUrl: string;
  title: string;
  scenario: string;
  onEdit: () => void;
  onShare: () => void;
  onRegenerate: () => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  type,
  imageUrl,
  title,
  scenario,
  onEdit,
  onShare,
  onRegenerate,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);

  return (
    <>
      <div className="w-full max-w-4xl pt-24">
        {/* 배너 섹션 */}
        <div className="cr_banner-section flex justify-center items-center gap-8 mb-20">
          <img
            src="/asset/finish_img1.png"
            alt="result_img1"
            className="w-[280px] h-[140px]"
          />
          <h1 className="w-[426px] text-center text-3xl font-bold">
            {type === "walking" ? (
              <>
                나만의 걷고 싶은 강남이
                <br />
                완성되었어요!
              </>
            ) : (
              <>
                나만의 웹툰이
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
        <div className="w-[1200px] h-[690px] shadow-2xl bg-white rounded-[50px] overflow-hidden flex justify-center items-center">
          <div className="grid grid-cols-[690px_1fr] h-full">
            {/* 이미지 섹션 */}
            <div className="h-full">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* 컨텐츠 섹션 */}
            <div className="relative flex flex-col h-full py-[80px] px-[65px]">
              <button
                onClick={onEdit}
                className="p-2 border rounded-full shadow-xl cursor-pointer absolute top-[40px] right-[40px] w-[64px] h-[64px]"
              >
                <img src={ICON_URLS.EDIT} alt="edit" className="w-6 h-6" />
              </button>
              {/* 제목 */}
              <div className="flex justify-between items-center mb-[24px]">
                <h1 className="text-3xl font-semibold">{title}</h1>
              </div>

              {/* 시나리오 텍스트 */}
              <div className="prose max-w-none flex-grow overflow-y-auto mb-6 p-4 bg-gray-200 ">
                {scenario.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
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
                  <div className="flex items-center text-[16px] justify-center gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
                  className="w-full py-3 px-6 rounded-[28px] bg-[#EDEDED] text-[#666666] text-[16px]"
                >
                  다른 이미지 만들기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 공유하기 모달 */}

      <Modal
        isOpen={showShareModal}
        type={type}
        onClose={() => setShowShareModal(false)}
        btnName="확인"
        btnImgUrl=""
        btnCancleName="닫기"
        onClick={() => {
          setShowShareModal(false);
          onShare();
        }}
      >
        <h2>갤러리 올리기</h2>
        <p>
          ‘확인’을 누르면 생성된 이미지가 갤러리에 올라갑니 다. 이미지를
          갤러리에 올리시겠습니까?
        </p>
      </Modal>

      {/* 다시 생성하기 모달 */}
      <Modal
        isOpen={showRegenerateModal}
        type={type}
        onClose={() => setShowRegenerateModal(false)}
        btnName="확인"
        btnImgUrl=""
        btnCancleName="닫기"
        onClick={() => {
          setShowRegenerateModal(false);
          onRegenerate();
        }}
      >
        <h2> 이미지 다시 만들기</h2>
        <p>
          ‘확인’을 누르면 생성된 이미지가 삭제되고 이미지를 다시 만들게 됩니다.
          이미지를 다시 만들겠습니까?
        </p>
      </Modal>
    </>
  );
};

export default ContentDisplay;
