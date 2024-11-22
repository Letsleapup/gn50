import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { OptionCard } from "../../components/OptionCard/OptionCard";
import { ChevronsDown, LoaderCircle } from "lucide-react";
import PageBanner from "../../components/PageBanner/PageBanner";
import {
  ICON_URLS,
  Nullable,
  Option,
  SelectOption,
  SelectOptionsType,
} from "../../@types/domain";
import "./SelectPage.css";
import { logger } from "../../util/logger";
import { getDetailInfoApi, getSelectOptionsApi } from "../../api/selecPage_api";
import { BASE_URL } from "../../const/const";

const ITEMS_PER_PAGE = 30;

const SelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: keyof SelectOptionsType }>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<Nullable<SelectOption>>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // API로 받아올 데이터를 위한 상태 추가
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailInfo, setDetailInfo] = useState<Nullable<SelectOption>>(null);

  // 데이터 가져오기
  useEffect(() => {
    console.log("TEST", type);
    const fetchOptions = async () => {
      try {
        setIsLoading(true);
        const options = await getSelectOptionsApi(type ? type : "walking");
        if (options) setOptions(options as Option[]);
      } catch (error) {
        console.error("Failed to fetch options:", error);
        // 에러 시 빈 배열 또는 에러 처리
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOptions();
  }, [type]);

  useEffect(() => {
    if (selectedOption && isOpen) {
      const fetchDetailInfo = async () => {
        try {
          console.log("TEST", type);
          const detailInfo = await getDetailInfoApi(
            type ? type : "walking",
            selectedOption.idx.toString()
          );
          if (detailInfo) {
            setDetailInfo(detailInfo as SelectOption);
            setIsOpen(true);
          }
        } catch (err) {
          logger.error("Failed to fetch detail info:", err);
          setDetailInfo(null);
        }
      };
      fetchDetailInfo();
    } else {
      setDetailInfo(null);
    }
  }, [selectedOption, type, isOpen]);

  // 스크롤 이벤트 핸들러를 window에 연결
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const scrollThreshold = document.documentElement.scrollHeight - 100;

      if (scrollPosition >= scrollThreshold) {
        // console.log("Loading more items...");
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

  useEffect(() => {
    console.log("isOpen state changed:", isOpen);
  }, [isOpen]);

  const onNavigate = (option: SelectOption) => {
    const imgUrl = type === "walking" ? option.url : option.backinfo_file1;
    const params = new URLSearchParams({
      idx: option.idx.toString(),
      title: (type === "walking" ? option.title : option.backinfo_title) || "",
      imgUrl: imgUrl ? encodeURIComponent(`${BASE_URL}${imgUrl}`) : "",
      description: option.backinfo_intro_txt || "",
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
      {detailInfo && (
        <span>
          {type}
          {detailInfo?.url}HELDKFJ:SLDKFJ
        </span>
      )}
      <main className="cr_select-main">
        <div className="cr_select-content">
          <div className="cr_select-grid">
            <OptionCard
              options={options.slice(0, visibleCount)}
              type={type as "walking" | "webtoon"}
              onSelect={(option: SelectOption) => {
                logger.log("Option selected:", option);
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
        {detailInfo && (
          <Modal
            isOpen={isOpen}
            type={type}
            onClose={onClose}
            btnName={type === "walking" ? "AI 이미지 만들기" : "AI 웹툰 그리기"}
            btnImgUrl={ICON_URLS.PEN}
            onClick={() => onNavigate(detailInfo)}
            btnCancleName="닫기"
          >
            <div className="cr_select-modal-title">
              {type === "walking"
                ? detailInfo.title
                : detailInfo.backinfo_title}
            </div>
            {/* 해시태그 있을때만 렌더링 */}
            {detailInfo.backinfo_hashtag &&
              detailInfo.backinfo_hashtag.length > 0 && (
                <div className="cr_select-modal-hashtags">
                  {detailInfo.backinfo_hashtag.split(" ").map((tag, index) => (
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
              src={
                type === "walking"
                  ? `${BASE_URL}${detailInfo.url}`
                  : `${BASE_URL}${detailInfo.backinfo_file1}`
              }
              alt={
                type === "walking"
                  ? detailInfo.title
                  : detailInfo.backinfo_title
              }
              className="cr_select-modal-image"
            />
            <p
              className={`cr_select-modal-description ${type === "walking" ? "walking" : "webtoon"}`}
            >
              {type === "walking"
                ? detailInfo.park_main_txt
                : detailInfo.backinfo_guide_txt}
            </p>
          </Modal>
        )}
      </main>
    </div>
  );
};

export default SelectPage;
