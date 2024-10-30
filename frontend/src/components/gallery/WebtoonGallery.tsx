import React, { useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SharedContent } from "../../data/dummydata";
import "./WebtoonGallery.css";

interface WebtoonGalleryProps {
  title: string;
  path: string;
  contents: SharedContent[];
}

const WebtoonGallery: React.FC<WebtoonGalleryProps> = ({
  title,
  path,
  contents,
}) => {
  const navigate = useNavigate();

  const handleContentClick = useCallback(
    (content: SharedContent) => {
      navigate(`/shared/${content.type}/${content.id}`);
    },
    [navigate]
  );

  const handleMoreClick = useCallback(() => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  }, [navigate, path]);

  // 컨텐츠 세 번 반복
  const tripleContents = [...contents, ...contents, ...contents];

  return (
    <div className="space-y-4 mb-8 relative overflow-hidden bg-black">
      {/* 헤더 섹션 */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold p-4 text-white">{title}</h2>
        <button
          onClick={handleMoreClick}
          className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors mr-4"
        >
          <span>더보기</span>
          <ChevronRight />
        </button>
      </div>

      {/* 슬라이드 컨테이너 */}
      <div className="slider-container">
        <div className="slide-track">
          {tripleContents.map((content, index) => (
            <div
              key={`${content.id}-${index}`}
              onClick={() => handleContentClick(content)}
              className="slide-item"
            >
              <div className="content-card">
                <div className="aspect-video">
                  <img
                    src={content.imgUrl}
                    alt={content.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-medium truncate">
                    {content.title}
                  </h3>
                  <p className="text-xs text-gray-500">{content.createdAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="background-text" aria-hidden="true">
          GANGNAM WEBTOON GANGNAM WEBTOON GANGNAM WEBTOON GANGNAM WEBTOON
          GANGNAM WEBTOON
        </div>
      </div>
    </div>
  );
};

export default WebtoonGallery;
