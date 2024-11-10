import React from "react";
// import { Eye } from "lucide-react";
import { Option } from "../../@types/domain";

interface OptionCardProps {
  options: Option[];
  type: "walking" | "webtoon";
  onSelect: (option: Option) => void;
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
      className={`grid  justify-center ${
        type === "walking"
          ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          : "grid-cols-1 gap-y-6"
      }`}
    >
      {options.map((option) => {
        return (
          <div key={option.id} className="flex justify-center">
            <button
              onClick={() => {
                console.log("Option selected:", option); // 선택 이벤트 추적
                onSelect(option);
              }}
              className={`${
                type === "walking"
                  ? "w-[384px]"
                  : "w-full sm:h-[300px] h-[600px] flex items-center"
              } bg-white p-0 rounded-lg transition-all duration-300 transform hover:scale-105 overflow-hidden`}
            >
              {type === "walking" ? (
                // walking 타입일 때의 레이아웃
                <>
                  <img
                    src={option.imgUrl}
                    alt={option.title}
                    className="rounded-[40px] h-[240px] w-full object-cover"
                    onError={(e) => {
                      console.error("Image loading failed:", option.imgUrl);
                      e.currentTarget.src = "/fallback-image.jpg";
                    }}
                  />
                  <div className="px-2 pb-[32px] flex justify-between items-center">
                    <h2 className="text-[20px] leading-[76px] tracking-[-0.5px] font-semibold truncate text-start">
                      {option.title}
                    </h2>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      {/* 조회수 viewCount는 추후 구현 예정 */}
                      {/* <Eye className="w-4 h-4" /> */}
                      {/* {option.viewCount} */}
                    </span>
                  </div>
                </>
              ) : (
                // webtoon 타입일 때의 레이아웃
                <div className="flex w-full gap-8 p-6">
                  <div className="w-[40%] h-full">
                    <img
                      src={option.imgUrl}
                      alt={option.title}
                      className="rounded-[40px] w-full h-[250px] object-cover"
                      onError={(e) => {
                        console.error("Image loading failed:", option.imgUrl);
                        e.currentTarget.src =
                          "https://via.placeholder.com/384x240";
                      }}
                    />
                  </div>
                  <div className="w-[60%] flex flex-col justify-center text-left">
                    <h2 className="text-[32px] font-bold mb-4">
                      {option.title}
                    </h2>
                    {option.backdrop && (
                      <p className="text-gray-600 text-[18px]">
                        {option.backdrop}
                      </p>
                    )}
                    {option.description && (
                      <p className="text-gray-500 mt-2 text-[16px]">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};
