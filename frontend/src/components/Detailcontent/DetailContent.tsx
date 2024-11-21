import { useEffect, useState } from "react";
import { sharedContents } from "../../data/dummydata";
import { SharedContent } from "../../@types/domain";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { logger } from "../../util/logger";
import {
  ViewCountWalkingGalleryApi,
  ViewCountWebtoonGalleryApi,
  WalkingGalleryDetailsApi,
  WebtoonGalleryDetailsApi,
} from "../../api/galleryPage_api";
interface DetailContentProps {
  content?: SharedContent;
  source?: "chatbot" | "shareboard"; //어디서 넘어왔는지에 따라
}

const DetailContent: React.FC<DetailContentProps> = ({
  source: propSource,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, contentId } = useParams<{ type: string; contentId: string }>();
  const [content, setContent] = useState<SharedContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { source: stateSource, content: stateContent } =
    (location.state as { source?: string; content?: SharedContent }) || {};

  const source = propSource || stateSource;

  useEffect(() => {
    //   // 상태로 전달된 content가 있으면 사용
    //   if (stateContent) {
    //     // console.log("Using state content:", stateContent);
    //     setContent(stateContent);
    //   } else {
    //     // 없으면 dummy data에서 찾기
    //     const foundContent = sharedContents.find(
    //       (c) => c.id === Number(contentId)
    //     );
    //     // console.log("Found content from dummy data:", foundContent);
    //     setContent(foundContent || null);
    //   }
    // }, [contentId, stateContent]);
    const fetchContent = async () => {
      if (!contentId || !type) {
        logger.error("Missing contentId or type");
        return;
      }

      try {
        setIsLoading(true);
        logger.log("Fetching content:", { type, contentId });

        // 상태로 전달된 content가 있으면 사용
        if (stateContent) {
          setContent(stateContent);
          // 조회수만 증가
          const viewCountApi =
            type === "walking"
              ? ViewCountWalkingGalleryApi
              : ViewCountWebtoonGalleryApi;
          await viewCountApi(contentId);
          return;
        }

        // API로 데이터 조회
        const data =
          type === "walking"
            ? await WalkingGalleryDetailsApi(contentId)
            : await WebtoonGalleryDetailsApi(contentId);

        if (data) {
          setContent(data);
          // 조회수 증가
          const viewCountApi =
            type === "walking"
              ? ViewCountWalkingGalleryApi
              : ViewCountWebtoonGalleryApi;
          await viewCountApi(contentId);
        }
      } catch (error) {
        logger.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [contentId, type, stateContent]);
  const handleBack = () => {
    if (source === "chatbot") {
      navigate("/chatbot");
    } else {
      navigate(`/shared/${type}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
            <p className="mt-4 text-lg text-gray-600">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }
  if (!content) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-gray-800 mb-4">
              콘텐츠를 찾을 수 없습니다.
            </p>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div
        className={`
        flex flex-col items-center 
        px-[20px]
        pt-[84px]
        pb-[80px]
        md:px-[40px]
        md:pt-[calc(84px+(183-84)*(100vw-768px)/(1920-768))]
        md:pb-[40px]
        xl:px-[183px] 
        xl:pt-[160px]
        xl:pb-[183px]
        max-w-[1200px]`}
      >
        <h1
          className="text-[26px] 
          tracking-[-0.65px]
          md:text-[28px] 
          md:tracking-[-0.65px]
          xl:text-[36px] 
          xl:tracking-[-0.9px]
          font-bold 
          mb-[25px] 
          md:mb-[35px] 
          xl:mb-[50px]"
        >
          {content.title}
        </h1>
        {/* 이미지 */}
        <div
          className={`
          w-[320px] h-[320px]
          md:w-[calc(320px+(792-320)*(100vw-768px)/(1920-768))] 
          md:h-[calc(320px+(792-320)*(100vw-768px)/(1920-768))]
          xl:w-[792px] xl:h-[792px]
          overflow-hidden 
          rounded-[25px]
          md:rounded-[35px]
          xl:rounded-[50px] 
          shadow-2xl
        `}
        >
          <img
            src={content.imgUrl}
            alt={content.title}
            className="w-full h-full object-cover "
            onError={(e) => {
              // console.log("Image load failed:", content.imgUrl);
              e.currentTarget.src = "https://via.placeholder.com/690x690";
            }}
            onLoad={() => {
              // console.log("Image loaded successfully:", content.imgUrl);
            }}
          />
        </div>

        {/* 시나리오 섹션 */}
        <div
          className="w-full 
          max-w-[320px]
          md:max-w-[calc(320px+(800-320)*(100vw-768px)/(1920-768))]
          xl:max-w-[800px]
          mt-[25px]
          md:mt-[35px]
          xl:mt-[50px] 
          border border-[#E4E4E4] 
          p-[20px]
          md:p-[30px]
          xl:p-[40px] 
          rounded-[15px]
          md:rounded-[20px]
          xl:rounded-[30px]"
        >
          <h2
            className="text-[18px]
            md:text-[20px]
            xl:text-[22px] 
            font-bold 
            mb-3
            md:mb-4
            xl:mb-6 
            tracking-[-0.55px]"
          >
            시나리오
          </h2>
          {content.scenario && (
            <div>
              {content.scenario.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[#333333] 
                      mb-4 
                      text-[16px]
                      tracking-[-0.4px] 
                      md:text-[18px]
                      md:tracking-[-0.5px] 
                      xl:text-[20px] 
                      xl:tracking-[-0.5px] 
                      leading-[24px]
                      md:leading-[27px]
                      xl:leading-[30px] 
                      last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleBack}
          className="px-[30px]
            md:px-[40px]
            xl:px-[50px] 
            py-[12px]
            md:py-[15px]
            xl:py-[18px] 
            bg-[#333333] 
            text-white 
            rounded-[28px] 
            text-[14px]
            md:text-[16px]
            xl:text-[18px] 
            hover:bg-gray-200 
            transition-colors 
            mt-[30px]
            md:mt-[35px]
            xl:mt-[50px]
            font-normal"
        >
          목록으로 이동하기
        </button>
      </div>
    </div>
  );
};

export default DetailContent;
