import React from "react";

interface OptionCardProps {
  options: {
    id: string;
    title: string;
    imgUrl: string;
    backdrop?: string;
    description?: string;
  }[];
  type: "walking" | "webtoon";
  onSelect: (option: {
    id: string;
    title: string;
    imgUrl: string;
    backdrop?: string;
    description?: string;
  }) => void;
}

// OptionCard는 이제 단순히 옵션을 표시하고 선택하는 역할만 담당
export const OptionCard: React.FC<OptionCardProps> = ({
  options,
  type,
  onSelect,
}) => {
  console.log("OptionCard rendering with options:", options); // 렌더링 디버깅

  return (
    <div
      className={`grid gap-y-6 justify-center ${
        type === "walking" ? "grid-cols-3 gap-x-8" : "grid-cols-1 gap-x-0"
      }`}
    >
      {options.map((option) => {
        console.log("Rendering option:", option.id); // 각 옵션 렌더링 추적
        return (
          <div key={option.id} className="flex justify-center">
            <button
              onClick={() => {
                console.log("Option selected:", option); // 선택 이벤트 추적
                onSelect(option);
              }}
              className={`${
                type === "walking"
                  ? "w-full aspect-[4/3]"
                  : "sm:h-[300px] w-full h-[150px]"
              } bg-white p-0 rounded-lg transition-all duration-300 transform hover:scale-105 overflow-hidden`}
            >
              <img
                src={option.imgUrl}
                alt={option.title}
                className="rounded-[40px] w-full h-[70%] object-cover"
                onError={(e) => {
                  console.error("Image loading failed:", option.imgUrl); // 이미지 로딩 에러 추적
                  e.currentTarget.src = "/fallback-image.jpg"; // 폴백 이미지 설정
                }}
              />
              <div className="p-4">
                <h2 className="text-[20px] font-semibold truncate text-start">
                  {option.title} {option.backdrop}
                </h2>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};
