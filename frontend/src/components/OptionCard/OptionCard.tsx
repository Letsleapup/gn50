import React from "react";
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
          ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-[50px] xs:gap-y-[40px]"
          : "grid-cols-1 gap-y-[40px]"
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
                  ? "transition-all duration-300 ease-in-out w-[320px] sm:w-[340px] md:w-[360px] lg:w-[370px] xl:w-[380px] 2xl:w-[382px] 3xl:w-[384px]"
                  : "w-full sm:h-[300px] h-[600px] flex items-center"
              } bg-white p-0 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 overflow-hidden`}
            >
              {type === "walking" ? (
                // walking 타입일 때의 레이아웃
                <div>
                  <img
                    src={option.imgUrl ? option.imgUrl : "http://via.placeholder.com/384x240"}
                    alt={option.title}
                    className="rounded-[30px] h-[200px] sm:h-[210px] md:h-[220px] lg:h-[230px] xl:h-[240px] w-full object-cover mb-[24px]"
                    onError={(e) => {
                      console.error("Image loading failed:", option.imgUrl);
                      e.currentTarget.src = "http://via.placeholder.com/384x240";
                    }}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-[24px] align-text-top tracking-[-0.5px] font-semibold truncate text-start">
                      {option.title}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      {/* 조회수 viewCount는 추후 구 예정 */}
                      {/* <Eye className="w-4 h-4" /> */}
                      {/* {option.viewCount} */}
                    </span>
                  </div>
                </div>
              ) : (
                // webtoon 타입일 때의 레이아웃
                <div className="flex flex-col md:flex-row w-full gap-[24px] lg:gap-[62px] items-center mx-auto md:h-[300px] xs:h-[200px]">
                  <div className="w-[97%] lg:w-auto">
                    <img
                      src={option.imgUrl}
                      alt={option.title}
                      className="rounded-[30px] w-full lg:w-[450px] xl:w-[486px] aspect-[486/300] object-cover transition-all duration-300 my-0"
                      onError={(e) => {
                        console.error("Image loading failed:", option.imgUrl);
                        e.currentTarget.src = "http://via.placeholder.com/486x304";
                      }}
                    />
                  </div>

                  <div className="w-full lg:w-[450px] xl:w-[494px] flex flex-col justify-start text-left self-center mx-auto">
                    {option.backdrop && (
                      <p className="text-[#959595] text-[14px] sm:text-[16px] lg:text-[18px] tracking-[-0.45px] mb-[6px]">
                        {option.backdrop}
                      </p>
                    )}
                    <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold mb-[12px] tracking-[-0.8px] ">
                      {option.title}
                    </h2>
                    <div className="mb-[24px] lg:mb-[40px]">
                      {option.description && (
                        <p className="text-[#333333] text-[14px] sm:text-[16px] lg:text-[18px] leading-[22px] sm:leading-[24px] lg:leading-[28px] tracking-[-0.45px]">
                          {option.description}
                        </p>
                      )}
                    </div>
                    {/* 해시태그 섹션 */}
                    {Array.isArray(option.hashtags) && option.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {option.hashtags.map((tag: string, index: number) => (
                          <span
                            key={`${option.id}-tag-${index}`}
                            className="text-[#F79D00] px-[10px] py-[6px] border border-[#F79D00] rounded-[17px] text-[15px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
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
