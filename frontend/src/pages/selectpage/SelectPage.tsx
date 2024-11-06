import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Modal } from "../../components/Modal/Modal";
import {
  SelectOption,
  SelectOptionsType,
  selectOptions,
} from "../../data/dummydata";
import { OptionCard } from "../../components/OptionCard/OptionCard";
import { ChevronsDown } from "lucide-react";

const SelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: keyof SelectOptionsType }>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );
  const [visibleCount, setVisibleCount] = useState(9);

  // 배너 데이터
  const bannerContent = {
    walking: {
      title: "내가 걷고 싶은 강남의\n모습을 만들어 보세요!",
      description: "걷고 싶은 강남구의 장소를 선택하세요.",
      bgColor: "bg-[#2942C4]",
      imgUrl: "./asset/main_btn_img01.svg",
    },
    webtoon: {
      title: "강남의 과거·현재·미래를\n웹툰으로 그려 보세요!",
      description: "그리고 싶은 웹툰의 배경을 선택하세요.",
      bgColor: "bg-[#F79D00]",
      imgUrl: "./asset/main_btn_img02.svg",
    },
  };

  // 현재 타입의 배너 정보 가져오기
  const currentBanner = type ? bannerContent[type] : null;

  // 현재 타입에 해당하는 전체 옵션들
  const allOptions: SelectOption[] =
    type && selectOptions[type] ? selectOptions[type] : [];

  // 스크롤 이벤트 핸들러
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;

    // 스크롤이 하단에 가까워지면 더 많은 옵션을 보여줌
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setVisibleCount((prev) => Math.min(prev + 9, allOptions.length));
    }
  };

  // 스크롤 이벤트 핸들러를 window에 연결
  useEffect(() => {
    const handleScroll = () => {
      // 화면 맨 아래에서 100px 위치에 도달하면 추가 로드
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setVisibleCount((prev) => Math.min(prev + 9, allOptions.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allOptions.length]);

  const onClose = () => {
    setIsOpen(false);
  };

  const onNavigate = (url: string) => {
    console.log("Navigating to:", url); // 네비게이션 추적
    navigate(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Banner Section - 1920x500px */}
      {currentBanner && (
        <div className="w-full h-[500px] relative overflow-hidden">
          <div
            className={`w-full h-full ${currentBanner.bgColor} flex items-center rounded-b-[40px]`}
            style={{
              background:
                type === "walking"
                  ? "linear-gradient(104deg, #1B58FD 0%, #00BAA8 100%)"
                  : "linear-gradient(104deg, #F79D00 0%, #FF5C00 100%)",
            }}
          >
            <div className="container mx-auto w-[62.5%] relative h-full flex items-end ">
              {/* 배너의 왼쪽 타이틀 */}
              <div className="flex flex-col items-start gap-2 md:gap-4 z-10 max-w-[40%]">
                <div className="flex flex-col items-start text-2xl md:text-[52px] font-bold text-white leading-[76px] tracking-[-1.3px]">
                  {currentBanner.title.split("\n").map((line, index) => (
                    <span key={index} className="whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </div>
                <p className="text-white text-xl md:text-[24px] opacity-90 mb-[76px] leading-[48px] tracking-[-0.6px]">
                  {currentBanner.description}
                </p>
              </div>

              {/* 배너의 중앙 오른쪽 이미지들 컨테이너*/}
              <div className="absolute top-0 right-0 h-full w-[50%] flex items-end">
                <div className="relative w-full h-full">
                  {/* 로봇과 우주선 그룹 */}
                  <div className="absolute -bottom-20 left-18">
                    {/* 우주선 */}
                    <img
                      src="./screenshot_2024-11-01.png"
                      className="w-[73.51px] h-auto hidden lg:block absolute"
                      alt="우주선"
                    />
                    {/* 로봇 */}
                    <img
                      src="./screenshot2024-11-01.png"
                      alt="Robot"
                      className="w-[18rem] md:w-[20rem] h-auto hidden md:block"
                    />
                  </div>

                  {/* 배경 건물 이미지 */}
                  <img
                    src={currentBanner.imgUrl}
                    alt="banner"
                    className="w-[300px] md:w-[400px] lg:w-[593px] h-auto absolute -bottom-3 -right-[300px]"
                    onError={(e) => {
                      console.error(
                        "Image loading failed:",
                        currentBanner.imgUrl
                      );
                      e.currentTarget.src = "/fallback-image.jpg";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <main
        className="flex-1 container mx-auto w-[62.5%] pt-20 overflow-y-auto"
        onScroll={handleScroll}
      >
        <div className="min-h-[900px]">
          <div className="space-y-6">
            <OptionCard
              options={allOptions.slice(0, visibleCount)}
              type={type as "walking" | "webtoon"}
              onSelect={(option) => {
                console.log("Option selected:", option);
                setIsOpen(true);
                setSelectedOption(option);
              }}
            />

            {/* 더 많은 옵션이 있을 경우에만 화살표 표시 */}
            {visibleCount < allOptions.length && (
              <div className="flex justify-center py-4">
                <ChevronsDown className="animate-bounce" />
              </div>
            )}
          </div>
        </div>

        {selectedOption && (
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            btnName={type === "walking" ? "이미지 만들기" : "웹툰 그리기"}
            onClick={() =>
              onNavigate(
                `/chatbot/${type}?title=${selectedOption.title}&imgUrl=${selectedOption.imgUrl}&description=${selectedOption.description}`
              )
            }
          >
            <h1 className="mt-2">{selectedOption.title}</h1>
            <img src={selectedOption.imgUrl} alt={selectedOption.title} />
            <p>{selectedOption.description}</p>
          </Modal>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SelectPage;
