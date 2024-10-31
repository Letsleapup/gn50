import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SharedContent } from "../../@types/domain";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import "./WebtoonGallery.css";
import "swiper/swiper-bundle.css";

interface WebtoonGalleryProps {
  title: string;
  path: string;
  contents: SharedContent[];
}

const WebtoonGallery: React.FC<WebtoonGalleryProps> = ({ path, contents }) => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Swiper 인스턴스를 저장할 state
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const handleContentClick = useCallback(
    (content: SharedContent) => {
      navigate(`/shared/${content.type}/${content.id}`);
    },
    [navigate]
  );

  const handleMoreClick = useCallback(() => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  }, [navigate, path]);

  // 컨텐츠 세 번 반복
  const multipleContents = [...Array(10)].flatMap(() => contents);

  // 화면 크기 변경 감지

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      console.log("Current window width:", window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 화면 크기에 따른 슬라이더 설정
  const getSwiperSettings = () => {
    if (windowWidth <= 430) {
      return { slidesPerView: 1.5, spaceBetween: 16 };
    } else if (windowWidth <= 768) {
      return { slidesPerView: 2.5, spaceBetween: 24 };
    } else if (windowWidth <= 1024) {
      return { slidesPerView: 3.5, spaceBetween: 36 };
    }
    return { slidesPerView: 4, spaceBetween: 36 };
  };

  const handlePrevClick = useCallback(() => {
    if (swiper) {
      swiper.autoplay.stop(); // 자동 재생 일시 중지
      swiper.slidePrev(500); // 500ms 동안 전환
      swiper.autoplay.start(); // 자동 재생 재시작
    }
  }, [swiper]);

  const handleNextClick = useCallback(() => {
    if (swiper) {
      swiper.autoplay.stop(); // 자동 재생 일시 중지
      swiper.slideNext(500); // 500ms 동안 전환
      swiper.autoplay.start(); // 자동 재생 재시작
    }
  }, [swiper]);

  return (
    <div className="space-y-4 relative h-[69.75rem]  bg-black">
      {/* 헤더 섹션 */}
      <div className="flex flex-col items-center lg:flex-row lg:px-[22.5rem] px-4">
        <div className="text-[2rem] lg:text-[3.25rem] tracking-[-0.08125rem] font-bold text-white mt-[6rem] lg:mt-[10rem] ">
          강남의 과거·현재·미래를 <br />
          그린 웹툰을 확인해보세요!
        </div>

        <div className="flex justify-center mt-[202px] ml-[363px]">
          <button
            onClick={handleMoreClick}
            className="flex items-center justify-between p-7 text-white text-[18px] w-[170px] h-[56px] hover:text-white transition-colors moreclickbtn"
          >
            <span>더보기</span>
            <img
              src="./asset/arrow_rw_s.svg"
              className="w-4 h-4 flex justify-center items-center mt-2"
            />
          </button>
          <div className="flex gap-2 ml-[30px]">
            <button
              className="swiper-button-prev-custom p-2 border border-1-[#e4e4e4] w-[56px] rounded-full hover:bg-gray-700 opacity-40"
              ref={navigationPrevRef}
              onClick={handlePrevClick}
            >
              <img src="./asset/arrow_lg_sm.svg" className="w-5 h-5 mt-2" />
            </button>
            <button
              className="swiper-button-next-custom p-2 border border-1-[#e4e4e4] w-[56px] rounded-full hover:bg-gray-700 opacity-40"
              ref={navigationNextRef}
              onClick={handleNextClick}
            >
              <img src="./asset/arrow_rg_sm.svg" className="w-5 h-5 mt-2" />
            </button>
          </div>
        </div>
      </div>

      {/* 슬라이드 컨테이너 */}
      <div className="slider-container">
        <Swiper
          {...getSwiperSettings()}
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          loop={true}
          loopAdditionalSlides={15}
          slidesPerView="auto"
          allowTouchMove={false}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            stopOnLastSlide: false,
            reverseDirection: false,
          }}
          speed={15000}
          className="webtoon-swiper"
          onSwiper={(swiper) => {
            setSwiper(swiper);
            // navigation 엘리먼트 업데이트
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
            swiper.autoplay.start();
          }}
          onReachEnd={() => {
            // 끝에 도달했을 때 처음으로 돌아가기
            if (swiper) {
              swiper.slideTo(0, 0);
            }
          }}
        >
          {multipleContents.map((content, index) => (
            <SwiperSlide key={`${content.id}-${index}`}>
              <div
                key={`${content.id}-${index}`}
                onClick={() => handleContentClick(content)}
                className="slide-item"
              >
                <div className="content-card">
                  <img
                    src={content.imgUrl}
                    alt={content.title}
                    loading="lazy"
                  />

                  <div className="p-2">
                    <h3 className="text-[24px] font-medium truncate text-white">
                      {content.title}
                    </h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="infinite-text-container">
          <div className="infinite-text">
            <div className="infinite-text-wrap" aria-hidden="true">
              GANGNAM WEBTOON GANGNAM WEBTOON GANGNAM WEBTOON
            </div>
            <div className="infinite-text-wrap" aria-hidden="true">
              GANGNAM WEBTOON GANGNAM WEBTOON GANGNAM WEBTOON
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonGallery;
