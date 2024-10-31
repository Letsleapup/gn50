import React, { useState } from "react";
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

const SelectPage: React.FC = () => {
  const navigate = useNavigate();
  // URL 파라미터로 타입('walking' 또는 'webtoon') 받기
  const { type } = useParams<{ type?: keyof SelectOptionsType }>();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onNavigate = (url: string) => {
    navigate(url);
  };

  // 현재 타입에 해당하는 옵션들 가져오기
  const currentOptions: SelectOption[] =
    type && selectOptions[type] ? selectOptions[type] : [];
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 container mx-auto px-4 py-8 pt-[10rem]">
        <h1 className="text-2xl font-bold mb-8">
          {type === "walking"
            ? "걷기 좋은 강남 만들기"
            : "그리고 싶은 웹툰 배경을 고르세요"}
        </h1>

        <OptionCard
          options={currentOptions}
          type={type as "walking" | "webtoon"}
          onSelect={(option) => {
            setIsOpen(true);
            setSelectedOption(option);
          }}
        />

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
