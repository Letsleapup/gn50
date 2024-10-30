import { useEffect, useState } from "react";
import { sharedContents } from "../../data/dummydata";
import { SharedContent } from "../../@types/domain";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

interface DetailContentProps {
  content?: SharedContent;
  source?: "chatbot" | "shareboard"; //어디서 넘어왔는지에 따라
}
const DetailContent: React.FC<DetailContentProps> = ({ source }) => {
  const navigate = useNavigate();
  const { type, contentId } = useParams<{ type: string; contentId: string }>();
  const [content, setContent] = useState<SharedContent | null>(null);

  useEffect(() => {
    console.log("DetailContent params:", { type, contentId }); // URL 파라미터 로깅
    // contentId로 해당 컨텐츠 찾기
    const foundContent = sharedContents.find((c) => c.id === Number(contentId));
    console.log("Found content:", foundContent);
    setContent(foundContent || null);
  }, [contentId]);

  const handleBack = () => {
    if (source === "chatbot") {
      navigate("/chatbot");
    } else {
      navigate(`/shared/${type}`);
    }
  };

  const getTitle = () => {
    if (source === "chatbot") {
      switch (type) {
        case "walking":
          return "나만의 걷고 싶은 강남이 완성되었어요!";
        case "webtoon":
          return "내가 그린 웹툰이 완성되었어요!";
        default:
          return "완성되었어요!";
      }
    }
    return "";
  };

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          Loading...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <Header />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">{getTitle()}</h1>
        <img
          src={content.imgUrl}
          alt={content.title}
          className="max-w-[400px] rounded-lg mb-6"
          onError={(e) => {
            console.log("Image load failed:", content.imgUrl);
            e.currentTarget.src = "/placeholder-image.jpg";
          }}
        />

        <div className="w-full max-w-[800px]">
          <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
          <div className="text-gray-600 mb-6">{content.createdAt}</div>
          <div className="text-lg">시나리오</div>
        </div>
        <button
          onClick={handleBack}
          className="mb-4 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          목록으로 이동하기
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default DetailContent;
