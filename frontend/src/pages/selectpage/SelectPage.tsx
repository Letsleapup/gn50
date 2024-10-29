import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Modal } from "../../components/Modal/Modal";

// 선택 옵션 타입 정의
type SelectOption = {
  id: string;
  title: string;
  imgUrl: string;
  style?: string;
  backdrop?: string;
  description?: string;
};

const SelectPage: React.FC = () => {
  const navigate = useNavigate();
  // URL 파라미터로 타입('walking' 또는 'webtoon') 받기
  const { type } = useParams<{ type: string }>();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onNavigate = (url: string) => {
    navigate(url);
  };

  console.log("현재 선택된 타입:", type); // 디버깅용 로그

  // 선택 옵션 데이터 (타입별로 다른 옵션 제공)
  const selectOptions: { [key: string]: SelectOption[] } = {
    walking: [
      {
        id: "1",
        title: "도산공원",
        imgUrl: "/gn50/picsumimage1.jpg",
        style: "",
        backdrop: "",
        description:
          "도산 안창호 기념비와 조경이 잘 된 산책로를 가진 역사적 공원",
      },
      {
        id: "2",
        title: "한티근린공원",
        imgUrl: "/gn50/picsumimage2.jpg",
        style: "",
        backdrop: "",
        description: "한티역 인근 작은 녹지 공간으로 산책에 적합",
      },
      {
        id: "3",
        title: "율현공원",
        imgUrl: "/gn50/picsumimage3.jpg",
        style: "",
        backdrop: "",
        description: "율현동 인근의 녹지 공간으로 산책로와 휴식 공간 제공",
      },
      {
        id: "4",
        title: "구룡산 자연휴양림",
        imgUrl: "/gn50/picsumimage3.jpg",
        style: "",
        backdrop: "",
        description: "구룡산 자락을 따라 산책로가 잘 정비된 자연 휴양림",
      },
    ],
    webtoon: [
      {
        id: "1",
        title: "과거의 강남",
        imgUrl: "/gn50/picsumimage1.jpg",
        style: "gray",
        backdrop: "1970s~1990s",
        description: "과거의 강남은 어떤 모습이었을까요?",
      },
      {
        id: "2",
        title: "현재의 강남",
        imgUrl: "/gn50/picsumimage2.jpg",
        style: "modern",
        backdrop: "2000s~2020s",
        description: "현재의 강남은 어떤 모습이 매력적이나요?",
      },
      {
        id: "3",
        title: "미래의 강남",
        imgUrl: "/gn50/picsumimage3.jpg",
        style: "colorfull, megacity, ",
        backdrop: "2020s~2040s",
        description: "미래의 강남은 어떤 모습으로 발전했을까요?",
      },
    ],
  };

  // 현재 타입에 해당하는 옵션들 가져오기
  const currentOptions = type ? selectOptions[type] : [];
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );
  console.log("현재 선택 가능한 옵션들:", currentOptions); // 디버깅용 로그

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">
          {type === "walking" ? "걷기 좋은 강남 만들기" : "그리고 싶은 웹툰 배경을 고르세요"}
        </h1>

        {/* 선택 옵션 그리드 */}
        <div
          className={`grid gap-y-6 justify-center ${
            type === "walking"
              ? "grid-cols-2 sm:grid-cols-4 gap-x-4" // walking일 때 2칸 또는 4칸
              : "grid-cols-1 gap-x-0" // 아닐 때 1칸
          }`}
        >
          {currentOptions.map((option) => (
            <div key={option.id} className="flex justify-center">
              <button
                onClick={() => {
                  setIsOpen(true);
                  setSelectedOption(option);
                }}
                className={`${
                  type === "walking" ? "sm:w-[95%] w-full aspect-w-5 aspect-h-6" : "sm:h-[300px] w-full h-[150px] "
                } bg-white p-0 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 overflow:hidden`}
              >
                <img
                  src={option.imgUrl}
                  alt={option.id}
                  className="rounded-lg overflow-hidden w-full h-[70%] object-cover"
                />
                <h2 className="text-lg font-semibold mt-0 truncate text-center">
                  {option.title} {option.backdrop}
                </h2>
              </button>
            </div>
          ))}

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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SelectPage;
