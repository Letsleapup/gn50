import { FunctionComponent, useEffect, useState, useRef, useMemo, useCallback } from "react";
import "./WalkingGallery.css";
import { GalleryData } from "../../@types/domain";
import { useNavigate } from "react-router-dom";
import { getAgentSystem } from "../../util/checkSystem";
import { BASE_URL } from "../../const/const";

interface Props {
  content?: GalleryData[];
  robotUrl: string;
}

export const WalkingGallery: FunctionComponent<Props> = ({ robotUrl, content }) => {
  const data = useMemo(() => {
    return content ? content : []
  },[content]);
  
  const [testData, setTestData] = useState<GalleryData[]>([]);
  const [rotation, setRotation] = useState(0);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [isPrevActive, setIsPrevActive] = useState(false);
  const [isNextActive, setIsNextActive] = useState(true);
  const [endIndex, setEndIndex] = useState(3);
  const navigate = useNavigate();
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const robotRef = useRef<HTMLImageElement | null>(null);
  const [isPCSystem, setIsPCSystem] = useState(false);

  useEffect(()=> {
    setTestData(data.slice(0, 3))
  },[data])

  useEffect(() => {
    const system = getAgentSystem();
    setIsPCSystem(system === "windows" || system === "macos" || system === "linux");
  }, []);

  const handleData = useCallback((step: number) => {
    const nextIndex = Math.min(
      Math.max(endIndex + step, 3),
      data.length
    );
    const nextStartIndex = Math.max(nextIndex - 3, 0);
    setIsPrevActive(nextStartIndex > 0);
    setIsNextActive(nextIndex < data.length);
    setEndIndex(nextIndex);
    setTestData(data.slice(nextStartIndex, nextIndex));
    console.log(rotation); //TODO: 삭제 예정
  }, [endIndex, data, rotation]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Custom range adjustments based on specific screen sizes
      let adjustedRotation;

      if (viewportWidth === 1920 && viewportHeight === 1080) {
        adjustedRotation = Math.min(360, Math.max(270, scrollPosition / 5));
      } else if (viewportWidth === 768 && viewportHeight === 1024) {
        adjustedRotation = Math.min(300, Math.max(-90, -(scrollPosition / 6)));
      } else if (viewportWidth === 820 && viewportHeight === 1180) {
        adjustedRotation = Math.min(
          320,
          Math.max(-90, -(scrollPosition / 6.5))
        );
      } else if (viewportWidth === 1024 && viewportHeight === 1366) {
        adjustedRotation = Math.min(
          340,
          Math.max(-90, -(scrollPosition / 4.5))
        );
      } else if (viewportWidth === 375 && viewportHeight === 667) {
        adjustedRotation = Math.min(280, Math.max(-90, -(scrollPosition / 8)));
      } else {
        adjustedRotation = Math.min(360, Math.max(-90, -(scrollPosition / 5)));
      }
      setRotation(adjustedRotation);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === robotRef.current && entry.isIntersecting) {
              setActiveIndices((prev) => [...prev, -1]);
              setRotation(180);
            } else {
              const index = itemsRef.current.indexOf(entry.target as HTMLDivElement);
              if (entry.isIntersecting && index !== -1) {
                setTimeout(() => {
                  setActiveIndices((prev) => [...prev, index]);
                }, index * 200);
              }
            }
          });
        },
        { threshold: 0.1 }
      );
  
      itemsRef.current.forEach((item) => {
        if (item) observer.observe(item);
      });
      if (robotRef.current) observer.observe(robotRef.current);
  
      return () => {
        observer.disconnect(); 
        clearTimeout(timer); 
        setActiveIndices([]); 
      };
    }, 2000); // 2초 딜레이
  
    return () => clearTimeout(timer);
  }, []);
  

  const navigationButtons = useMemo(() => (
    <div className="yg-navigation-buttons flex space-x-2">
      <button
        className={`swiper-button-prev-custom rounded-full border-2 p-3 transition-all
          ${isPrevActive ? 'yg-is-active' : 'yg-is-not-active'}`}
        onClick={() => isPrevActive && handleData(-3)}
        disabled={!isPrevActive}
      >
        <img
          src="./asset/arrow_lg_sm.svg"
          className={`w-5 h-5 ${isPrevActive ? 'yg-btn-prev-custom' : 'filter grayscale'}`}
          alt="Previous"
        />
      </button>
      <button
        className={`swiper-button-next-custom rounded-full border-2 p-3 transition-all
          ${isNextActive ? 'yg-is-active' : 'yg-is-not-active'}`}
        onClick={() => isNextActive && handleData(3)}
        disabled={!isNextActive}
      >
        <img
          src="./asset/arrow_rg_sm.svg"
          className={`w-5 h-5 ${isNextActive ? 'yg-btn-next-custom' : 'filter grayscale'}`}
          alt="Next"
        />
      </button>
    </div>
  ), [isPrevActive, isNextActive, handleData]);

  return (
    <div className="yg-walking-gallery-container relative w-full aspect-[1.28/1] overflow-hidden flex items-center justify-center">
      {/* Robot Image */}
      <img
        ref={robotRef}
        src={robotUrl}
        alt="Robot"
        className={`yg-robot-img absolute top-[0%] right-[15%] w-[20%] ${
          activeIndices.includes(-1) ? "yg-robot" : "opacity-0"
        }`}
      />

      {/* Text */}
      <span className="yg-gallery-content absolute top-[11.45%] left-[18.75%] font-bold leading-tight text-[2vw]">
        다른 사람들은 <br />
        걷고 싶은 강남을 <br />
        어떻게 만들었을까요?
      </span>

      <div className="yg-controls absolute top-[28.3%] left-[18.9%] mt-0">
        <div className="flex space-x-4 md:space-x-5 lg:space-x-8">
          {/* "더보기" Button */}
          <button
            onClick={() => navigate("/shared/walking")}
            className="yg-more-click-btn p-3 transition-all hover:bg-gray-100"
          >
            <span className="text-sm md:text-base lg:text-lg">더보기</span>
            <img
              src="./asset/arrow_rw_s.svg"
              className="w-4 h-4 ml-2"
              alt="Arrow"
            />
          </button> 

          {navigationButtons}
        </div>
      </div>

      {/* Image Elements */}
      <img
        src="/asset/bg_img01.svg"
        alt="별1"
        className="yg-star-1 absolute w-[5.5%] z-40 top-[2.0%] right-[4.4%]"
      />
      <img
        src="/asset/bg_img02.svg"
        alt="별2"
        className="yg-star-2 absolute w-[5.5%] z-40 bottom-[16%] left-[4.4%]"
      />
      <img
        src="/asset/bg_line01.svg"
        alt="half-circle"
        className="yg-half-path-1 absolute w-[12.7%] top-[13%] right-[-1%] z-40 transition-transform duration-500"
        // style={{
        //   transform: `rotate(${rotation}deg)`,
        //   transformOrigin: `top right`,
        // }}
      />
      <img
        src="/asset/bg_line01-1.svg"
        alt="half-circle"
        className="yg-half-path-2 absolute w-[12.7%] bottom-[-3%] left-[-0%] z-40 transition-transform duration-500"
        // style={{
        //   transform: `rotate(${-rotation}deg)`,
        //   transformOrigin: `top left`,
        // }}
      />

      {/* Item Grid */}
      <div className="flex space-x-6 lg:space-x-8 md:space-x-6 sm:space-x-4">
        {testData.map((item, index) => (
          <div
            key={item.idx}
            ref={(el) => (itemsRef.current[index] = el)}
            className={`aspect-square flex flex-col items-center object-cover ${
              index === 0
                ? `yg-shared-content1 ${
                    activeIndices.includes(index) ? "item-fade" : "opacity-0"
                  }`
                : index === 1
                  ? `yg-shared-content2 ${
                      activeIndices.includes(index) ? "item-fade" : "opacity-0"
                    }`
                  : `yg-shared-content3 ${
                      activeIndices.includes(index) ? "item-fade" : "opacity-0"
                    }`
            }`}
          >
            <div
              className={`relative w-full h-full flex justify-center items-center ${isPCSystem ? 'group' : ''}`}
              onClick={() => navigate(`/shared/walking/${item.idx}`)}
            >
              <div className="absolute yg-item-img">
                <img src={`${BASE_URL}${item.url}`} alt={item.title} />
              </div>
              {/* Hover gradient background */}
              <div className={`yg-hover-cover absolute inset-0 bg-gradient-to-br from-blue-500 to-green-400 opacity-0 ${
                isPCSystem ? 'group-hover:opacity-80' : ''
              } transition-opacity duration-300`}></div>

              {/* Hover icon */}
              <img
                src="/asset/arrow_rb_sm.svg"
                alt="arrow-rb"
                className={`relative w-[2.5rem] opacity-0 ${
                  isPCSystem ? 'group-hover:opacity-100' : ''
                } transition-opacity duration-300 filter invert`}
              />
            </div>
            <span className="yg-item-title sm:text-[1vw]">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
