import React from "react";
import { bannerContent } from "../../data/dummydata";
import { BoardType } from "../../@types/domain";
import "./PageBanner.css";
interface PageBannerProps {
  type?: BoardType;
}

const PageBanner: React.FC<PageBannerProps> = ({ type }) => {
  if (!type || !bannerContent[type]) return null;
  const currentBanner = bannerContent[type];

  const bgColorGradient = {
    walking: "linear-gradient(104deg, #1B58FD 0%, #00BAA8 100%)",
    webtoon: "linear-gradient(104deg, #F79D00 0%, #FFFA77 100%)",
    gallery: "linear-gradient(112deg, #00BAA8 0%, #CCFF88 100%)",
  };

  return (
    // Banner Section - 1920x500px

    <div className="yg-select-banner-wrapper w-full relative overflow-hidden">
      <div
        className={`w-full h-full ${currentBanner.bgColor} flex items-center rounded-b-[40px] overflow-hidden`}
        style={{ background: bgColorGradient[type] }}
      >
        <div className="yg-select-banner-container relative h-full flex items-center">
          {/* 배너의 왼쪽 타이틀 */}
          <div className="yg-select-text-content-wrapper flex flex-col items-start gap-2 md:gap-4 z-10">
            <div className="yg-select-title text-2xl font-bold text-white">
              {currentBanner.title.split("\n").map((line, index) => (
                <span key={index} className="whitespace-nowrap">
                  {line}
                </span>
              ))}
            </div>
            <p className="text-white text-xl md:text-[24px] xs:text-[16px] opacity-90 mb-[76px] leading-[48px] tracking-[-0.6px]">
              {currentBanner.description}
            </p>
          </div>

          {/* 배너의 중앙 오른쪽 이미지들 컨테이너*/}
          <div className="absolute top-0 right-0 h-full w-[50%] flex items-end">
            <div className="relative w-full h-full">
              {/* 가운데 이미지*/}
              {currentBanner.robotUrl && (
                <div className={`absolute bottom-1 z-10 ${type === "walking" ? "yg-select-walking-robot-img" : "yg-select-webtoon-robot-img"}`}>
                  {/* 로봇 */}
                  <img
                    src={currentBanner.robotUrl}
                    alt="Robot"
                    className="w-[220px] md:w-[280px] h-auto animate-float"
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
                    console.error(
                      "Image loading failed:",
                      currentBanner.imgUrl
                    );
                    e.currentTarget.src = "/fallback-image.jpg";
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageBanner;
