import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logger } from "../../util/logger";

const ErrorPage = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const img = new Image();
    img.src = "./asset/main_img01.png";
    img.onload = () => {
      setImageLoaded(true);
      logger.info("Image loaded successfully");
    };
  }, []);

  return (
    // 전체 컨테이너를 relative로 설정
    <div className="relative min-h-screen bg-black">
      {/* 배경 이미지 컨테이너 */}
      <div className="w-full h-screen relative">
        <img
          src="./asset/main_img01.png"
          alt="에러페이지 배경"
          className={`w-full h-[700px] object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="eager"
          decoding="async"
        />
      </div>
      {/* 에러메시지 중앙배열 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="bg-black/50 p-20 rounded-2xl backdrop-blur-sm text-white">
          <h1 className="text-6xl md:text-6xl font-bold mb-2 md:mb-4">404</h1>
          <p className="text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
            죄송합니다.
          </p>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 md:mb-8">
            페이지를 찾을 수가 없습니다.
          </p>
          <button
            onClick={handleBack}
            className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-[#1B58FD] to-[#00BAA8] rounded-full 
                     text-white hover:opacity-90 transition-opacity text-lg md:text-xl"
          >
            홈화면으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
