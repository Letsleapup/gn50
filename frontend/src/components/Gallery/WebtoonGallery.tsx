import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GalleryData} from "../../@types/domain";
import "./WebtoonGallery.css";

interface WebtoonGalleryProps {
  title: string;
  path: string;
  contents: GalleryData[];
}

const WebtoonGallery: React.FC<WebtoonGalleryProps> = ({ path, contents }) => {
  const navigate = useNavigate();

  const multipleContents = useMemo(() => {
    // console.log("Generating multipleContents"); // 디버깅용
    return [...contents, ...contents, ...contents];
  }, [contents]);

  const handleContentClick = useCallback(
    (content: GalleryData) => {
      navigate(`/shared/webtton/${content.idx}`);
    },
    [navigate]
  );

  const handleMoreClick = useCallback(() => {
    // console.log(`Navigating to ${path}`);
    navigate(path);
  }, [navigate, path]);
  // console.log(multipleContents)
  return (
    <div className="webtoon-gallery-container">
      {/* 헤더 섹션 */}
      <div className="gallery-header">
        <div className="gallery-title">
          강남의 과거·현재·미래를 <br />
          그린 웹툰을 확인해보세요!
        </div>

        <div className="controls-container">
          <button onClick={handleMoreClick} className=" moreclickbtn">
            <span>더보기</span>

            <img src="./asset/arrow_rw_s.svg" className="moreclick_arrow" />
          </button>
        </div>
      </div>

      {/* 슬라이드 컨테이너 */}

      <div className="slider-container group">
        <div className="slide-track">
          {multipleContents.map((content, index) => (
            <div
              key={`slide-${content.idx}-${index}`}
              onClick={() => handleContentClick(content)}
              className="slide-item"
            >
              <div className="content-card">
                <img src={`https://gn50m.aixstudio.kr${content.url}`} alt={content.title} loading="lazy" />
                <h3 className="truncate">{content.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="infinite-text-container">
          <div className="infinite-text">
            <div className="infinite-text-wrap" aria-hidden="true">
              GANGNAM WEBTOON GANGNAM WEBTOON GANGNAM WEBTOON
            </div>
            <div className="infinite-text-wrap" aria-hidden="true">
              GANGNAM WEBTOON GANGNAM WEBTOON GANGNAM WEBTOON
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(WebtoonGallery);
