import React from "react";
import { ChevronRight } from "lucide-react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "./MainPage.css";

// Swiper 필수 CSS
import "swiper/swiper-bundle.css";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  // 배너 데이터
  const bannerSlides = [
    {
      id: 1,
      image: "/gn50/picsumimage1.jpg",
      alt: "강남구 이미지 1",
    },
    {
      id: 2,
      image: "/gn50/picsumimage2.jpg",
      alt: "강남구 이미지 2",
    },
    {
      id: 3,
      image: "/gn50/picsumimage3.jpg",
      alt: "강남구 이미지 3",
    },
  ];

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
    },
    {
      id: 2,
      title: "웹툰 생성 체험",
      path: "/shared/webtoon", //TODO:바꿔야함
      description: "AI로 만드는 웹툰",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div>
        {/* 배너 섹션 -롤링 스와이프 */}
        <div className="w-full h-[400px] relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{
              delay: 0, // 페이지에 머무는 시간
              disableOnInteraction: false, // 직접 넘겨도 자동재생 유지
              pauseOnMouseEnter: true, // 마우스오버 일시정지
            }}
            loop={true}
            loopAdditionalSlides={1}
            speed={3500} // 넘어가는 속도
            className="w-full h-full"
          >
            {bannerSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full h-full ">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
            {/* 네비게이션 버튼 */}
            <div className="swiper-button-prev !text-white after:!text-2xl"></div>
            <div className="swiper-button-next !text-white after:!text-2xl"></div>
          </Swiper>
        </div>

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

        {/* 갤러리 섹션 */}
        <div className="bg-yellow-50 p-4">
          {gallerySections.map((section) => (
            <div key={section.id} className="space-y-4">
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
              {/* 갤러리 그리드 - 실제 컨텐츠에 맞게 수정 필요 */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="aspect-video bg-white rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
