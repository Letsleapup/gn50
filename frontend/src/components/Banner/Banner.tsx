import { useState, useEffect, FunctionComponent } from "react";
import "./Banner.css";

interface Props {
  bannerUrl: string;
  robotUrl: string
}

const Banner: FunctionComponent<Props> = ({bannerUrl, robotUrl}) => {
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
  },[]);

  return (
    <div className="relative w-full h-[100%] overflow-hidden bg-gray-100 flex items-center justify-center">
      <div className="absolute w-[30%] flex items-center justify-center z-10">
        <img
          src={robotUrl}
          alt="Cute AI Robot"
          className={`animate-float transition-opacity duration-2000 ease-in-out ${isShown ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <img
        src={bannerUrl} 
        alt="배너 이미지"
        className={`transition-all duration-3500 ease-in-out rounded-lg
          ${isFullscreen ? "clip-circle-expanded" : "clip-circle-initial"}`}
      />
    </div>
  );
};

export default Banner;
