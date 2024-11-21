import { useNavigate, useParams } from "react-router-dom";
import { BoardType, SharedContent } from "../../@types/domain";
import PageBanner from "../../components/PageBanner/PageBanner";
import { useEffect, useState } from "react";
import "./ShareBoardPage.css";
import { logger } from "../../util/logger";
import { getGalleryByType } from "../../API/galleryPage_api";

const ShareBoardPage: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: BoardType }>();
  const [activeFilter, setActiveFilter] = useState<string>(type || "walking");
  const [contents, setContents] = useState<SharedContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //API로 불러오기
  useEffect(() => {
    const fetchGalleryData = async () => {
      setIsLoading(true);
      try {
        const data = await getGalleryByType(
          activeFilter as "walking" | "webtoon"
        );
        setContents(data);
        logger.log("Gallery data loaded:", data);
      } catch (error) {
        logger.error("Failed to load gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryData();
  }, [activeFilter]);

  const filterButtons = [
    {
      id: "walking",
      label: "상상더하기 체험",
      path: "/shared/walking",
    },
    {
      id: "webtoon",
      label: "웹툰 생성 체험",
      path: "/shared/webtoon",
    },
  ];

  const handleFilterClick = (path: string, id: string) => {
    setActiveFilter(id);
    navigate(path);
  };

  const handleContentClick = (content: SharedContent) => {
    navigate(`/shared/${content.type}/${content.id}`);
  };

  const currentType = "gallery";

  return (
    <div className="cr_shareboard-container">
      {type && <PageBanner type={currentType} />}
      <main className="cr_shareboard-main">
        {/* 필터 섹션 */}
        <div className="cr_filter-section">
          <div className="cr_filter-buttons">
            {filterButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => handleFilterClick(button.path, button.id)}
                className={`cr_filter-button ${
                  activeFilter === button.id ? "cr_filter-button-active" : ""
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        {/* 콘텐츠 그리드 */}
        <div className="cr_content-grid">
          {isLoading ? (
            <div className="cr_loading">Loading...</div>
          ) : contents.length > 0 ? (
            contents.map((content) => (
              <div
                key={content.id}
                onClick={() => handleContentClick(content)}
                className="cr_content-card"
              >
                <div className="yg_content-card-inner-div">
                  <img
                    src={content.imgUrl}
                    alt={content.title}
                    className="cr_content-image"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>
                <h3 className="cr_content-title">{content.title}</h3>
              </div>
            ))
          ) : (
            <div>등록된 게시물이 없습니다.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShareBoardPage;
