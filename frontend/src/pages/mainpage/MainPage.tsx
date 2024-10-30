import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { BannerUrl, RobotUrl, sharedContents } from "../../data/dummydata";
import Banner from "../../components/Banner/Banner";
import WebtoonGallery from "../../components/gallery/WebtoonGallery";
import "./MainPage.css";

// Swiper 필수 CSS
import "swiper/swiper-bundle.css";
import { WalkingGallery } from "../../components/gallery/WalkingGallery";

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

  // const handleContentClick = (content: SharedContent) => {
  //   navigate(`/shared/${content.type}/${content.id}`);
  // };

  // walking 컨텐츠 필터링
  //TODO: 해당 데이터를 받아서 보일 수 있게 gallery 꾸미기
  // const walkingContents = sharedContents
  //   .filter((content) => content.type === "walking")
  //   .slice(0, 3);

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
          <WalkingGallery robotUrl={RobotUrl} />

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
