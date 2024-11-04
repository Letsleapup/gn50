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

  const multipleContents = [...contents, ...contents, ...contents];

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
      return { slidesPerView: 1.5 };
    } else if (windowWidth <= 768) {
      return { slidesPerView: 2.5 };
    } else if (windowWidth <= 1024) {
      return { slidesPerView: 3.5 };
    }
    return { slidesPerView: 4 };
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
    <div className="webtoon-gallery-container">
      {/* 헤더 섹션 */}
      <div className="gallery-header">
        <div className="gallery-title">
          강남의 과거·현재·미래를 <br />
          그린 웹툰을 확인해보세요!
        </div>

        <div className="controls-container">
          <button onClick={handleMoreClick} className=" moreclickbtn">
            <span>더보기</span>
            <img
              src="./asset/arrow_rw_s.svg"
              className="w-4 h-4 flex justify-center items-center mt-2"
            />
          </button>
          <div className="navigation-buttons">
            <button
              className="swiper-button-prev-custom p-2 border border-1-[#e4e4e4] w-[3.5rem] rounded-full hover:bg-gray-700 opacity-40"
              ref={navigationPrevRef}
              onClick={handlePrevClick}
            >
              <img src="./asset/arrow_lg_sm.svg" className="w-5 h-5 mt-2" />
            </button>
            <button
              className="swiper-button-next-custom p-2 border border-1-[#e4e4e4] w-[3.5rem] rounded-full hover:bg-gray-700 opacity-40"
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
          slidesPerView="auto"
          allowTouchMove={false}
          observer={true}
          observeParents={true}
          centeredSlides={false}
          watchSlidesProgress={true}
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
          // 끝에 도달했을 때 처음으로 돌아가는 대신 계속 진행
          onReachEnd={() => {
            if (swiper) {
              swiper.autoplay.start();
              swiper.slideTo(0, 0, false);
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
                    <h3 className="text-[1.5rem] ml-[1rem] truncate text-white tracking-[-0.0375]">
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
