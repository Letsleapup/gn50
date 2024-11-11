import { useNavigate, useParams } from "react-router-dom";
import { sharedContents } from "../../data/dummydata";
import { BoardType, SharedContent } from "../../@types/domain";
import PageBanner from "../../components/PageBanner/PageBanner";
import { useState } from "react";

const ShareBoardPage: React.FC = () => {
  const navigate = useNavigate();
  // URL 파라미터로 게시판 타입 구분 (walking 또는 webtoon)
  const { type } = useParams<{ type?: BoardType }>();

  // 활성화된 필터 버튼 상태 관리
  const [activeFilter, setActiveFilter] = useState<string>(type || "walking");

  const handleContentClick = (content: SharedContent) => {
    navigate(`/shared/${content.type}/${content.id}`);
  };
  console.log("현재 게시판 타입:", type); // 디버깅용

  // 필터 버튼 정의
  const filterButtons = [
    {
      id: "walking",
      label: "상상더하기 체험",
      path: "/shared/walking",
    },
    {
      id: "webtoon",
      label: "웹툰 생성 체험",
      path: "/shared/webtoon",
    },
  ];

  // 필터 버튼 클릭 핸들러
  const handleFilterClick = (path: string, id: string) => {
    setActiveFilter(id);
    navigate(path);
  };

  const currentType = "gallery";
  const filteredContents = sharedContents.filter(
    (content) => content.type === type
  );

  return (
    <div className="min-h-screen flex flex-col">
      {type && <PageBanner type={currentType} />}
      <main className="flex-1 container mx-auto px-4 py-8 ">
        {/* 필터 섹션 */}
        <div className="flex h-[69px] mb-4 border-b border-[#959595]">
          {/* 버튼 컨테이너에 간격 추가 */}
          <div className="flex gap-[50px]">
            {filterButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => handleFilterClick(button.path, button.id)}
                className="h-full"
              >
                {/* 내부 div로 텍스트와 밑줄 효과 래핑 */}
                <div
                  className={`
                    relative
                    pt-[9px]
                    pb-[20px]
                    text-[24px]
                    tracking-[-0.6px]
                    transition-colors
                    duration-200
                    ${activeFilter === button.id ? "text-[#1B58FD]" : "text-[#959595]"}
                    hover:text-[#1B58FD]
                    after:content-['']
                    after:absolute
                    after:left-0
                    after:bottom-[-1px]
                    after:w-full
                    after:h-[5px]
                    after:bg-[#1B58FD]
                    after:transform
                    after:scale-x-0
                    after:transition-transform
                    after:duration-200
                    after:origin-left
                    hover:after:scale-x-100
                    ${activeFilter === button.id ? "after:scale-x-100" : ""}
                    whitespace-nowrap
                  `}
                >
                  {button.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 콘텐츠 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((content) => (
            <div
              key={content.id}
              onClick={() => handleContentClick(content)}
              className="cursor-pointer"
            >
              {/* 콘텐츠 미리보기 이미지 */}
              <div>
                <img
                  src={content.imgUrl}
                  alt={content.title}
                  className="object-cover aspect-square h-[384px] rounded-3xl"
                  onError={(e) => {
                    console.log("Image failed to load:", content.imgUrl);
                    e.currentTarget.src = "/placeholder-image.jpg";
                  }}
                />
              </div>

              {/* 콘텐츠 정보 */}
              <h3 className="font-semibold mb-2">{content.title}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShareBoardPage;
