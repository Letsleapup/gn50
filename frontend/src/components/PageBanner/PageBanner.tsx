// import React, { useState } from "react";
import { bannerContent } from "../../data/dummydata";
import { BoardType } from "../../@types/domain";
import "./PageBanner.css";
// import { logger } from "../../util/logger";
// import axios from "axios";
interface PageBannerProps {
  type?: BoardType;
}
const PageBanner: React.FC<PageBannerProps> = ({ type }) => {
  // const [webtoonBannerUrl, setWebtoonBannerUrl] = useState<string | null>(null);
  // useEffect(() => {
  //   const fetchWebtoonBanner = async () => {
  //     if (type !== "webtoon") return;
  //     try {
  //       const response = await axios.get(
  //         "https://gn50m.aixstudio.kr/api/api_wm_banner.php"
  //       );
  //       logger.log("웹툰 배너 응답:", response.data);

  //       // resultCode 체크 및 data.url 접근
  //       if (response.data.resultCode === "Y" && response.data.data?.url) {
  //         logger.log("배너 URL:", response.data.data.url);
  //         setWebtoonBannerUrl(
  //           `https://gn50m.aixstudio.kr${response.data.data.url}`
  //         );
  //       }
  //     } catch (error) {
  //       logger.error("웹툰 배너 로딩 실패:", error);
  //     }
  //   };
  //   fetchWebtoonBanner();
  // }, [type]);

  if (!type || !bannerContent[type]) return null;
  const currentBanner = {
    ...bannerContent[type],
    imgUrl:bannerContent[type].imgUrl,
      // type === "webtoon" && webtoonBannerUrl
      //   ? webtoonBannerUrl
      //   : bannerContent[type].imgUrl,
  };
  const bgColorGradient = {
    walking: "linear-gradient(104deg, #1B58FD 0%, #00BAA8 100%)",
    webtoon: "linear-gradient(104deg, #F79D00 0%, #FFFA77 100%)",
    gallery: "linear-gradient(112deg, #00BAA8 0%, #CCFF88 100%)",
  };
  return (
    // Banner Section - 1920x500px
    <div
      className={`yg-select-banner-container w-full h-full`}
      style={{ background: bgColorGradient[type] }}
    >
      <div className="yg-select-banner-wrapper relative w-full h-full">
        {/* 배너의 왼쪽 타이틀 */}
        <div className="yg-select-text-content-wrapper absolute">
          <div
            className={`${type === "gallery" ? "yg-gallery-title" : "yg-select-title"} flex flex-col items-start`}
          >
            {currentBanner.title.split("\n").map((line, index) => (
              <span
                key={index}
                className={`${type === "gallery" ? "whitespace-wrap" : "whitespace-nowrap"}`}
              >
                {line}
              </span>
            ))}
          </div>
          <p className="yg-select-description text-xl md:text-[24px] xs:text-[16px] opacity-90 mb-[76px] leading-[48px] tracking-[-0.6px]">
            {currentBanner.description}
          </p>
        </div>
        {/* 배너의 중앙 오른쪽 이미지들 컨테이너*/}
        {currentBanner.robotUrl && (
          <div
            className={`absolute ${type === "walking" ? "yg-select-walking-robot-img" : type === "webtoon" ? "yg-select-webtoon-robot-img" : "yg-shared-gallery-robot-img"}`}
          >
            {/* 로봇 */}
            <img
              src={currentBanner.robotUrl}
              alt="Robot"
              className="h-auto animate-float"
              onError={(e) => {
                console.error(
                  "Robot image loading failed:",
                  currentBanner.robotUrl
                );
                e.currentTarget.src = "/fallback-robot.jpg";
              }}
            />
          </div>
        )}
        {/* 오른쪽 - 배경 건물 이미지 */}
        {currentBanner.imgUrl && (
          <img
            src={currentBanner.imgUrl}
            alt="banner"
            className={`absolute w-[752px] h-auto ${type === "walking" ? "yg-select-walking-building-img" : "yg-select-webtoon-hand-img"}`}
            onError={(e) => {
              console.error("Image loading failed:", currentBanner.imgUrl);
              e.currentTarget.src = "/fallback-image.jpg";
            }}
          />
        )}
      </div>
    </div>
  );
};
export default PageBanner;
