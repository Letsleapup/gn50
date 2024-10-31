import { FunctionComponent, useEffect, useState } from "react";
import "./WalkingGallery.css";
import { SharedContent } from "../../@types/domain";

interface Props {
  // TODO: api 완성 후, optionable 해제
  content?: SharedContent[];
  robotUrl: string;
}

export const WalkingGallery: FunctionComponent<Props> = ({ robotUrl }) => {
  const items = [1, 2, 3];
  const [isShown, setIsShown] = useState(false);
  const [rotation, setRotation] = useState(45);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setRotation(scrollPosition / 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // 첫 번째 아이템과 로봇을 동시에 등장시키기 위한 타이머
    const timer = setTimeout(() => {
      setIsShown(true);
    }, 500); // 0.5초 딜레이 후 등장

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[1.28/1] bg-yellow-100 overflow-hidden flex items-center justify-center">
      {/* 로봇 이미지 */}
      <img
        src={robotUrl}
        alt="Robot"
        className="absolute top-[9.5%] right-[15%] w-[20%] robot"
      />
      
      {/* 텍스트 */}
      <span className="absolute top-[14.67%] left-[18.75%] text-[325%] font-bold">
        다른 사람들은 <br />
        걷고 싶은 강남을 <br />
        어떻게 만들었을까요?
      </span>

      {/* 이미지 요소 */}
      <img
        src="/gn50/asset/bg_img01.svg"
        alt="별"
        className="w-20 h-20 z-50 top-[20%] left-[50%]"
      />
      <img
        src="/gn50/half_circle.png"
        alt="half-circle"
        className="absolute top-[20%] left-[50%] -translate-x-1/2 transition-transform duration-500"
        style={{ transform: `rotate(${rotation - 200}deg)` }}
      />
      <img
        src="/gn50/half_circle.png"
        alt="half-circle"
        className="absolute top-[20%] right-[50%] -translate-x-1/2 transition-transform duration-500"
        style={{ transform: `rotate(${rotation - 90}deg)` }}
      />

      {/* 아이템 그리드 */}
      {isShown && (
        <div className="flex space-x-8">
          {items.map((item, index) => (
            <div
              key={item}
              className={`aspect-[1/1] rounded ${
                index === 0
                  ? "shared-content1 absolute bg-red-500"
                  : index === 1
                  ? "shared-content2 absolute bg-green-500"
                  : "shared-content3 absolute bg-blue-500"
              }`}
            >
              <div className="relative w-full h-full flex justify-center items-center group">
                {/* Hover 시에만 나타나는 그라데이션 배경 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-400 opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* Hover 시에만 나타나는 아이콘 */}
                <img
                  src="/gn50/asset/arrow_rb_sm.svg"
                  alt="arrow-rb"
                  className="relative w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 filter invert"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
