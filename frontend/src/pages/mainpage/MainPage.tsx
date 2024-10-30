import React from "react";
import { ChevronRight } from "lucide-react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { BannerUrl, RobotUrl, sharedContents } from "../../data/dummydata";
import { SharedContent } from "../../@types/domain";
import Banner from "../../components/Banner/Banner";
import WebtoonGallery from "../../components/gallery/WebtoonGallery";
import "./MainPage.css";

// Swiper 필수 CSS
import "swiper/swiper-bundle.css";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  // 버튼 섹션 데이터
  const actionButtons = [
    {
      id: 1,
      title: "상상더하기",
      path: "/select/walking",
      bgColor: "bg-emerald-100 hover:bg-emerald-200",
    },
    {
      id: 2,
      title: "웹툰체험존",
      path: "/select/webtoon",
      bgColor: "bg-sky-100 hover:bg-sky-200",
    },
  ];

  const handleContentClick = (content: SharedContent) => {
    navigate(`/shared/${content.type}/${content.id}`);
  };

  // walking 컨텐츠 필터링
  const walkingContents = sharedContents
    .filter((content) => content.type === "walking")
    .slice(0, 3);

  // webtoon 컨텐츠 필터링
  const webtoonContents = sharedContents
    .filter((content) => content.type === "webtoon")
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div>
        {/* 배너 섹션 -롤링 스와이프 */}
        <Banner bannerUrl={BannerUrl} robotUrl={RobotUrl} />
        {/* 버튼 섹션 */}
        <div className="flex h-[200px] gap-1">
          {actionButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => {
                navigate(button.path);
              }}
              className={`flex-1 text-center ${button.bgColor}`}
            >
              {button.title}
            </button>
          ))}
        </div>

        {/* 갤러리 섹션 */}
        <div className="bg-yellow-50">
          {/* Walking 갤러리 */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold p-4">걷고 싶은 강남</h2>
              <button
                onClick={() => {
                  navigate("/shared/walking");
                }}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span>더보기</span>
                <ChevronRight />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {walkingContents.map((content) => (
                <div
                  key={content.id}
                  onClick={() => handleContentClick(content)}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer"
                >
                  <div className="aspect-video">
                    <img
                      src={content.imgUrl}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-medium truncate">
                      {content.title}
                    </h3>
                    <p className="text-xs text-gray-500">{content.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Webtoon 갤러리 */}
          <WebtoonGallery
            title="웹툰 생성 체험"
            path="/shared/webtoon"
            contents={webtoonContents}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
