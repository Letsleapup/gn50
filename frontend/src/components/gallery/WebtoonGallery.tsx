import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SharedContent } from "../../@types/domain";
import "./WebtoonGallery.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

interface WebtoonGalleryProps {
  title: string;
  path: string;
  contents: SharedContent[];
}

const WebtoonGallery: React.FC<WebtoonGalleryProps> = ({ path, contents }) => {
  const navigate = useNavigate();

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
  const tripleContents = [...contents, ...contents, ...contents];

  return (
    <div className="space-y-4 relative h-[1116px] overflow-hidden bg-black">
      {/* 헤더 섹션 */}
      <div className="flex items-center">
        <div className="text-[52px] font-bold p-4 text-white mt-[160px] ml-[360px]">
          <>
            강남의 과거·현재·미래를 <br />
            그린 웹툰을 확인해보세요!
          </>
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
            <button className="swiper-button-prev-custom p-2 border border-1-[#e4e4e4] w-[56px] rounded-full hover:bg-gray-700 opacity-40">
              <img src="./asset/arrow_lg_sm.svg" className="w-5 h-5 mt-2" />
            </button>
            <button className="swiper-button-next-custom p-2 border border-1-[#e4e4e4] w-[56px] rounded-full hover:bg-gray-700 opacity-40">
              <img src="./asset/arrow_rg_sm.svg" className="w-5 h-5 mt-2" />
            </button>
          </div>
        </div>
      </div>

      {/* 슬라이드 컨테이너 */}
      <div className="slider-container">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView="auto"
          loop={true}
          loopAdditionalSlides={3}
          allowTouchMove={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: false,
          }}
          speed={15000}
          className="webtoon-swiper"
        >
          {tripleContents.map((content, index) => (
            <SwiperSlide key={`${content.id}-${index}`}>
              <div
                key={`${content.id}-${index}`}
                onClick={() => handleContentClick(content)}
                className="slide-item"
              >
                <div className="content-card">
                  <div className="aspect-video">
                    <img
                      src={content.imgUrl}
                      alt={content.title}
                      className="w-[408px] h-[408px] object-cover"
                      loading="lazy"
                    />
                  </div>
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
