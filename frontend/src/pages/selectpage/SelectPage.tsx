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
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const SelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: keyof SelectOptionsType }>();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );

  // 배너 데이터
  const bannerContent = {
    walking: {
      title: "내가 걷고 싶은 강남의\n모습을 만들어 보세요!",
      description: "걷고 싶은 강남구의 장소를 선택하세요.",
      bgColor: "bg-[#2942C4]",
      imgUrl: "./asset/main_btn_img01.svg",
    },
    webtoon: {
      title: "강남의 과거·현재·미래\n웹툰 생성 체험",
      description: "웹툰 작가 체험하기!",
      bgColor: "bg-[#F79D00]",
      imgUrl: "./asset/main_btn_img02.svg",
    },
  };

  // 현재 타입의 배너 정보 가져오기
  const currentBanner = type ? bannerContent[type] : null;
  const itemsPerPage = 9;

  // 현재 타입에 해당하는 전체 옵션들
  const allOptions: SelectOption[] =
    type && selectOptions[type] ? selectOptions[type] : [];

  // 페이지네이션된 옵션들 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOptions = allOptions.slice(indexOfFirstItem, indexOfLastItem);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(allOptions.length / itemsPerPage);

  console.log("Current page:", currentPage); // 페이지 변경 추적
  console.log("Current options:", currentOptions); // 현재 표시되는 옵션들 추적

  useEffect(() => {
    // 타입이 변경될 때 페이지를 1로 리셋
    setCurrentPage(1);
  }, [type]);

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
      <main className="flex-1 container mx-auto w-[62.5%] pt-20">
        <div className="min-h-[900px]">
          <div className="space-y-6">
            <OptionCard
              options={currentOptions}
              type={type as "walking" | "webtoon"}
              onSelect={(option) => {
                console.log("Option selected in SelectPage:", option); // 선택 이벤트 추적
                setIsOpen(true);
                setSelectedOption(option);
              }}
            />

            {/* 페이지네이션 컨트롤 */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12 pb-10">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  <ChevronsLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  <ChevronsRight />
                </button>
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
