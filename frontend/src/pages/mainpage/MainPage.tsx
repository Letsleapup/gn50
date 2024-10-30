import React from "react";
import { ChevronRight } from "lucide-react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { BannerUrl, RobotUrl, sharedContents } from "../../data/dummydata";
import { SharedContent } from "../../@types/domain";
import "./MainPage.css";

// Swiper 필수 CSS
import "swiper/swiper-bundle.css";
import Banner from "../../components/Banner/Banner";
import { GalleryWalking } from "../../components/gallery_will_delete/galleryWalking";

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

  // 갤러리 섹션
  const gallerySections = [
    {
      id: 1,
      title: "걷고 싶은 강남",
      path: "/shared/walking", //TODO:바꿔야함
      description: "강남의 걷기 좋은 공간들",
      type: "walking",
    },
    {
      id: 2,
      title: "웹툰 생성 체험",
      path: "/shared/webtoon", //TODO:바꿔야함
      description: "AI로 만드는 웹툰",
      type: "webtoon",
    },
  ];

  const handleContentClick = (content: SharedContent) => {
    navigate(`/shared/${content.type}/${content.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div>
        {/* 배너 섹션 -롤링 스와이프 */}
        <GalleryWalking robotUrl={RobotUrl}/>
        {/* 버튼 섹션 */}
        <div className="flex h-[200px] gap-1">
          {actionButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => {
                navigate(button.path);
              }}
              className="flex-1 text-center bg-gray-200"
            >
              {button.title}
            </button>
          ))}
        </div>

        {/* gallery section */}

        {/* 갤러리 섹션 */}
        <div className="bg-yellow-50 p-4">
          {gallerySections.map((section) => {
            const sectionContents = sharedContents
              .filter((content) => content.type === section.type)
              .slice(0, 4);
            return (
              <div key={section.id} className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold p-4">{section.title}</h2>
                  <button
                    onClick={() => {
                      console.log(`Navigating to ${section.path}`);
                      navigate(section.path);
                    }}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-900
                        transition-colors"
                  >
                    <span>더보기</span>
                    <ChevronRight />
                  </button>
                </div>

                {/* 갤러리 그리드 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {sectionContents.map((content) => (
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
                        <p className="text-xs text-gray-500">
                          {content.createdAt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
