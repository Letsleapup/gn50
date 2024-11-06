import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sharedContents } from "../../data/dummydata";
import { BoardType, SharedContent } from "../../@types/domain";
import PageBanner from "../../components/PageBanner/PageBanner";

const ShareBoardPage: React.FC = () => {
  const navigate = useNavigate();
  // URL 파라미터로 게시판 타입 구분 (walking 또는 webtoon)
  const { type } = useParams<{ type?: BoardType }>();

  const handleContentClick = (content: SharedContent) => {
    navigate(`/shared/${content.type}/${content.id}`);
  };

  useEffect(() => {
    if (!type) {
    }
  }, [type]);

  console.log("현재 게시판 타입:", type); // 디버깅용

  // 필터 버튼 정의
  const filterButtons = [
    {
      id: "walking",
      label: "걷고 싶은 강남",
      path: "/shared/walking",
    },
    {
      id: "webtoon",
      label: "웹툰 갤러리",
      path: "/shared/webtoon",
    },
  ];

  const currentType = "gallery";
  const filteredContents = sharedContents.filter(
    (content) => content.type === type
  );

  return (
    <div className="min-h-screen flex flex-col">
      {type && <PageBanner type={currentType} />}
      <main className="flex-1 container mx-auto px-4 py-8 ">
        {/* 필터 섹션 */}
        <div className="flex h-[60px] gap-2 mb-6">
          {filterButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => navigate(button.path)}
              className={`
                px-6 py-2 rounded-md transition-colors
                ${
                  type === button.id || (!type && button.id === "all")
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }
              `}
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* 콘텐츠 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((content) => (
            <div
              key={content.id}
              onClick={() => handleContentClick(content)}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* 콘텐츠 미리보기 이미지 */}
              <div className="bg-gray-200 rounded-md mb-4">
                <img
                  src={content.imgUrl}
                  alt={content.title}
                  className="object-cover w-full h-48 rounded-lg"
                  onError={(e) => {
                    console.log("Image failed to load:", content.imgUrl);
                    e.currentTarget.src = "/placeholder-image.jpg";
                  }}
                />
              </div>

              {/* 콘텐츠 정보 */}
              <h3 className="font-semibold mb-2">{content.title}</h3>
              <div className="flex justify-between items-center text-sm text-gray-500 ">
                <span>{content.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShareBoardPage;
