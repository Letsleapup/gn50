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
import PageBanner from "../../components/PageBanner/PageBanner";

const SelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: keyof SelectOptionsType }>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );
  const [visibleCount, setVisibleCount] = useState(9);

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
      {type && <PageBanner type={type} />}
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
    </div>
  );
};

export default SelectPage;
