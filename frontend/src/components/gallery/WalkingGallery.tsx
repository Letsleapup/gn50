import { FunctionComponent, useEffect, useState } from "react";
import "./WalkingGallery.css";
import { SharedContent } from "../../@types/domain";

interface Props {
  //TODO: api 완성 후, optionable 해제
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
    <div className="relative w-full aspect-[4/3] bg-yellow-100 overflow-hidden flex items-center justify-center">
      {/* 로봇 이미지 */}
      <img
        src={robotUrl}
        alt="Robot"
        className={`absolute top-[7%] right-[10%] w-[20%] robot`}
      />
      <p className={`absolute top-[20%] left-[10%] text-lg font-semibold`}>
        강남구에서 걷기좋은 거리
      </p>
      <img
        src={"/gn50/public/half_circle.png"}
        alt="half-circle"
        className="absolute top-[20%] left-[50%] -translate-x-1/2 transition-transform duration-500"
        style={{ transform: `rotate(${rotation - 200}deg)` }}
      />
      <img
        src={"/gn50/public/half_circle.png"}
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
              className={`aspect-[4/3.7] rounded ${index === 0 ? "shared-content1 absolute bg-red-500" : index === 1 ? "shared-content2 absolute bg-green-500" : "shared-content3 absolute bg-blue-500"}`}
            >
              {rotation}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
