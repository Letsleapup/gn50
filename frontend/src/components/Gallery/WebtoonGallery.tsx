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
  // const navigationPrevRef = useRef(null);
  // const navigationNextRef = useRef(null);

  const multipleContents = [...contents, ...contents, ...contents];

  useEffect(() => {
    if (swiper) {
      console.log("Swiper initialized");
      console.log("Total slides:", swiper.slides.length);
      console.log("Is loop enabled:", swiper.params.loop);
      console.log("Current active index:", swiper.activeIndex);
    }
  }, [swiper]);

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
    } else if (windowWidth >= 1920) {
      return { slidesPerView: "auto" };
    }
    return { slidesPerView: 4 };
  };

  // const handlePrevClick = useCallback(() => {
  //   if (swiper) {
  //     swiper.autoplay.stop(); // 자동 재생 중지
  //     swiper.params.speed = 500; // 빠른 전환 속도
  //     swiper.slidePrev();

  //     // 전환 후 자동 재생 재개
  //     setTimeout(() => {
  //       swiper.params.speed = 15000; // 원래 속도로 복원
  //       swiper.autoplay.start();
  //     }, 500);
  //   }
  // }, [swiper]);

  // const handleNextClick = useCallback(() => {
  //   if (swiper) {
  //     swiper.autoplay.stop(); // 자동 재생 중지
  //     swiper.params.speed = 500; // 빠른 전환 속도
  //     swiper.slideNext();

  //     // 전환 후 자동 재생 재개
  //     setTimeout(() => {
  //       swiper.params.speed = 15000; // 원래 속도로 복원
  //       swiper.autoplay.start();
  //     }, 500);
  //   }
  // }, [swiper]);

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
          {/* <div className="navigation-buttons">
            <button
              className="swiper-button-prev-custom"
              ref={navigationPrevRef}
              onClick={handlePrevClick}
            >
              <img
                src="./asset/arrow_lg_sm.svg"
                className="w-5 h-5"
                alt="Previous"
              />
            </button>
            <button
              className="swiper-button-next-custom"
              ref={navigationNextRef}
              onClick={handleNextClick}
            >
              <img
                src="./asset/arrow_rg_sm.svg"
                className="w-5 h-5"
                alt="Next"
              />
            </button>
          </div> */}
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
          allowTouchMove={true} // 태블릿에서 터치 가능
          grabCursor={true} //터치했을때 드래그 가능 커서 표시
          // 터치 관련 추가 옵션들
          touchRatio={1.5} // 터치 감도 (1이 기본값, 높을수록 민감)
          touchAngle={45} // 터치 인식 각도
          touchStartPreventDefault={true} // 터치 시작 시 기본 동작 방지
          touchMoveStopPropagation={true} // 터치 이벤트 전파 중단
          // 저항 관련 설정
          resistance={true} // 처음과 마지막 슬라이드에서 저항 적용
          resistanceRatio={0.85} // 저항 비율
          // 터치 이벤트 핸들링
          onTouchStart={() => {
            console.log("Touch started");
            if (swiper) {
              swiper.autoplay.stop(); // 터치 시작시 자동 재생 중지
            }
          }}
          onTouchEnd={() => {
            console.log("Touch ended");
            if (swiper) {
              swiper.autoplay.start(); // 터치 종료시 자동 재생 재개
            }
          }}
          observer={true} // DOM 변화 감지
          observeParents={true} // 부모 요소의 변화도 감지
          centeredSlides={false}
          watchSlidesProgress={true}
          // navigation={{
          //   prevEl: navigationPrevRef.current,
          //   nextEl: navigationNextRef.current,
          //   enabled: true, // navigation 활성화 명시적 설정
          // }}
          //자동 롤링 설정
          autoplay={{
            delay: 0,
            disableOnInteraction: false, //false해야 스와이프 후에 자동재생
            pauseOnMouseEnter: true,
            stopOnLastSlide: false,
            reverseDirection: false,
          }}
          speed={15000}
          className="webtoon-swiper"
          onSwiper={(swiperInstance) => {
            setSwiper(swiperInstance);
            if (
              // 네비게이션 초기화 및 업데이트
              swiperInstance.params.navigation &&
              typeof swiperInstance.params.navigation !== "boolean"
            )
              //  {
              //   swiperInstance.params.navigation.prevEl =
              //     navigationPrevRef.current;
              //   swiperInstance.params.navigation.nextEl =
              //     navigationNextRef.current;
              //   swiperInstance.navigation.init();
              //   swiperInstance.navigation.update();
              // }
              swiperInstance.autoplay.start();
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
            <SwiperSlide key={`slide-${content.id}-${index}`}>
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
