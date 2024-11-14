import { useEffect, useState } from "react";
import { sharedContents } from "../../data/dummydata";
import { ExtendedSharedContent, SharedContent } from "../../@types/domain";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const [content, setContent] = useState<ExtendedSharedContent | null>(null);

  const { source: stateSource, content: stateContent } =
    (location.state as { source?: string; content?: ExtendedSharedContent }) ||
    {};

  const source = propSource || stateSource;

  useEffect(() => {
    console.log("DetailContent params:", { type, contentId });

    // 상태로 전달된 content가 있으면 사용
    if (stateContent) {
      console.log("Using state content:", stateContent);
      setContent(stateContent);
    } else {
      // 없으면 dummy data에서 찾기
      const foundContent = sharedContents.find(
        (c) => c.id === Number(contentId)
      );
      console.log("Found content from dummy data:", foundContent);
      setContent(foundContent || null);
    }
  }, [contentId, stateContent]);

  const handleBack = () => {
    if (source === "chatbot") {
      navigate("/chatbot");
    } else {
      navigate(`/shared/${type}`);
    }
  };

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center p-[183px] max-w-[1200px]">
        <h1 className="text-[36px] font-bold mb-[50px]">{content.title}</h1>
        {/* 이미지 */}
        <div className="w-[792px] h-[792px] mb-6 overflow-hidden rounded-[50px] shadow-2xl">
          <img
            src={content.imgUrl}
            alt={content.title}
            className="w-full h-full object-cover "
            onError={(e) => {
              console.log("Image load failed:", content.imgUrl);
              e.currentTarget.src = "http://via.placeholder.com/690x690";
            }}
          />
        </div>

        <div className="w-full max-w-[800px] mt-[50px] border border-[#E4E4E4] p-[40px]">
          {/* 시나리오 섹션 추가 */}
          <h2 className="text-[22px] font-bold mb-6  tracking-[-0.55px]">
            시나리오
          </h2>
          {content.scenario && (
            <div>
              <div className="bg-gray-100 rounded-[30px]">
                {content.scenario.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[#333333] mb-4 text-[20px] tracking-[-0.5px] leading-[30px] last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleBack}
          className="px-[50px] py-[17.5px] bg-[#333333] text-white rounded-[28px] text-[18px] hover:bg-gray-200 transition-colors mt-[50px]"
        >
          목록으로 이동하기
        </button>
      </div>
    </div>
  );
};

export default DetailContent;
