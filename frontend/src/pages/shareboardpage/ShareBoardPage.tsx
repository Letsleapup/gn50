import { useNavigate, useParams } from "react-router-dom";
import { sharedContents } from "../../data/dummydata";
import { BoardType, SharedContent } from "../../@types/domain";
import PageBanner from "../../components/PageBanner/PageBanner";
import { useState } from "react";
import "./ShareBoardPage.css";

const ShareBoardPage: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: BoardType }>();
  const [activeFilter, setActiveFilter] = useState<string>(type || "walking");

  // console.log("현재 게시판 타입:", type); // 디버깅용

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
  const filteredContents = sharedContents.filter(
    (content) => content.type === activeFilter
  );

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
          {filteredContents.map((content) => (
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
                    // console.log("이미지 로드 실패:", content.imgUrl);
                    e.currentTarget.src = "/placeholder-image.jpg";
                  }}
                />
              </div>
              <h3 className="cr_content-title">{content.title}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShareBoardPage;
