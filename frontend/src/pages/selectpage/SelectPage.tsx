import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { OptionCard } from "../../components/OptionCard/OptionCard";
import { selectOptions } from "../../data/dummydata";
import { ChevronsDown, LoaderCircle } from "lucide-react";
import PageBanner from "../../components/PageBanner/PageBanner";
import {
  ICON_URLS,
  Option,
  SelectOption,
  SelectOptionsType,
} from "../../@types/domain";
import "./SelectPage.css";
import { logger } from "../../util/logger";

const ITEMS_PER_PAGE = 30;

const SelectPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = useParams<{ type?: keyof SelectOptionsType }>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // API로 받아올 데이터를 위한 상태 추가
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 가져오기
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        console.log(`Fetching ${type} options...`);
        setIsLoading(true);

        // API 호출 예시
        // const response = await axios.get(`/api/${type}-options`);
        // const data = response.data;

        // 임시로 더미 데이터 사용
        const dummyData = type
          ? selectOptions[type].map((item) => ({
              ...item,
              viewCount: 0, // API 연동 시 실제 조회수로 대체
            }))
          : [];

        console.log(`Loaded ${dummyData.length} ${type} options`);
        setOptions(dummyData);
      } catch (error) {
        console.error("Failed to fetch options:", error);
        // 에러 시 빈 배열 또는 에러 처리
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (type) {
      fetchOptions();
    }
  }, [type]);

  // 스크롤 이벤트 핸들러를 window에 연결
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const scrollThreshold = document.documentElement.scrollHeight - 100;

      if (scrollPosition >= scrollThreshold) {
        console.log("Loading more items...");
        setVisibleCount((prev) =>
          Math.min(prev + ITEMS_PER_PAGE, options.length)
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [options.length]);

  // Back navigation event handling
  useEffect(() => {
    const handlePopState = () => {
      logger.log("Back navigation detected - closing modal");
      setIsOpen(false);
      setSelectedOption(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const onClose = () => {
    setIsOpen(false);
  };

  const onNavigate = (option: Option) => {
    const params = new URLSearchParams({
      title: option.title,
      imgUrl: encodeURIComponent(option.imgUrl),
      description: option.description || "",
    });

    navigate(`/chatbot/${type}?${params.toString()}`);
  };

  if (!type) {
    console.error("No type parameter provided");
    return <div>Invalid page type</div>;
  }

  if (isLoading) {
    return (
      <div className="cr_loading-container">
        <LoaderCircle className="cr_loading-spinner" />
      </div>
    );
  }

  return (
    <div className="cr_select-page">
      {type && <PageBanner type={type} />}
      <main className="cr_select-main">
        <div className="cr_select-content">
          <div className="cr_select-grid">
            <OptionCard
              options={options.slice(0, visibleCount)}
              type={type as "walking" | "webtoon"}
              onSelect={(option: SelectOption) => {
                console.log("Option selected:", option);
                setIsOpen(true);
                setSelectedOption(option);
              }}
            />
            {/* 더 많은 옵션이 있을 경우에만 화살표 표시 */}
            {visibleCount < options.length && (
              <div className="cr_select-more">
                <ChevronsDown className="cr_select-arrow" />
              </div>
            )}
          </div>
        </div>

        {selectedOption && (
          <Modal
            isOpen={isOpen}
            type={type}
            onClose={onClose}
            btnName={type === "walking" ? "AI 이미지 만들기" : "AI 웹툰 그리기"}
            btnImgUrl={ICON_URLS.PEN}
            onClick={() => onNavigate(selectedOption)}
            btnCancleName="닫기"
          >
            <div className="cr_select-modal-title">{selectedOption.title}</div>
            {/* 해시태그 있을때만 렌더링 */}
            {Array.isArray(selectedOption.hashtags) &&
              selectedOption.hashtags.length > 0 && (
                <div className="cr_select-modal-hashtags">
                  {selectedOption.hashtags.map((tag, index) => (
                    <span
                      key={`modal-tag-${index}`}
                      className="cr_select-modal-tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            <img
              src={selectedOption.imgUrl}
              alt={selectedOption.title}
              className="cr_select-modal-image"
            />
            <p
              className={`cr_select-modal-description ${type === "walking" ? "walking" : ""}`}
            >
              {type === "walking"
                ? selectedOption.description
                : selectedOption.modalsuggest}
            </p>
          </Modal>
        )}
      </main>
    </div>
  );
};

export default SelectPage;
