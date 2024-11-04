const ErrorPage = () => {
  const handleBack: React.MouseEventHandler<HTMLButtonElement> = () => {
    history.back();
  };

  return (
    // 전체 컨테이너를 relative로 설정
    <div className="relative min-h-screen bg-black">
      {/* 배경 이미지 컨테이너 */}
      <div className="w-full h-screen relative">
        <img
          src="./asset/main_img01.png"
          alt="에러페이지 배경"
          className="w-full h-[700px] object-cover "
        />
      </div>
      {/* 에러메시지 중앙배열 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="bg-black/50 p-20 rounded-2xl backdrop-blur-sm text-white">
          <h1 className="text-9xl font-bold mb-4">404</h1>
          <p className="text-4xl font-semibold mb-2">죄송합니다.</p>
          <p className="text-4xl text-gray-300 mb-8">
            페이지를 찾을 수가 없습니다.
          </p>
          <button
            onClick={handleBack}
            className="px-8 py-3 bg-gradient-to-r from-[#1B58FD] to-[#00BAA8] rounded-full 
                     text-white hover:opacity-90 transition-opacity text-2xl"
          >
            홈화면으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
