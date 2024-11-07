import { useState, useEffect, FunctionComponent } from "react";
import "./MainBanner.css";

interface Props {
  mainbannerUrl: string;
  robotUrl: string;
}

const MainBanner: FunctionComponent<Props> = ({ mainbannerUrl, robotUrl }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isShown, setIsShown] = useState(false);

  //TODO: scroll로 할건지 들어오자마자 시작할건지 확인하기
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFullscreen(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const robotTimer = setTimeout(() => {
      setIsShown(true);
    }, 1000);
    return () => clearTimeout(robotTimer);
  }, []);

  return (
    <div className="banner-wrap relative flex items-center justify-center">
      {isShown && (
        <div className="banner-text absolute text-center">
          <p className="text-[16px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-bold leading-tight sm:leading-[56px] md:leading-[72px] lg:leading-[96px] text-center tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2666FB] to-[#00C8AD]">
              50주년
            </span>
            을 맞이한
          </p>
          <p className="text-[16px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-bold leading-tight sm:leading-[56px] md:leading-[72px] lg:leading-[96px] text-center tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2666FB] to-[#00C8AD]">
              강남
            </span>
            을 직접 체험해 보세요
          </p>
        </div>
      )}
      <div className="absolute w-[22%] top-[41%] flex items-center justify-center z-10">
        <img
          src={robotUrl}
          alt="Cute AI Robot"
          className={`animate-float transition-opacity duration-2000 ease-in-out ${isShown ? "opacity-100" : "opacity-0"} z-0`}
        />
      </div>
      <img
        src={mainbannerUrl}
        alt="배너 이미지"
        className={`transition-all duration-3500 ease-in-out rounded-lg mt-0 mb-0
          ${isFullscreen ? "clip-circle-expanded" : "clip-circle-initial"}`}
      />
    </div>
  );
};

export default MainBanner;
