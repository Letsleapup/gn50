import { useState } from "react";

interface OptionCardProps {
  options: {
    id: string;
    title: string;
    imgUrl: string;
    backdrop?: string;
    description?: string;
  }[];
  type: "walking" | "webtoon";
  onSelect: (option: {
    id: string;
    title: string;
    imgUrl: string;
    backdrop?: string;
    description?: string;
  }) => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  options,
  type,
  onSelect,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 현재 페이지의 아이템들
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = options.slice(indexOfFirstItem, indexOfLastItem);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(options.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div
        className={`grid gap-y-6 justify-center ${
          type === "walking" ? "grid-cols-3 gap-x-8" : "grid-cols-1 gap-x-0"
        }`}
      >
        {currentItems.map((option) => (
          <div key={option.id} className="flex justify-center">
            <button
              onClick={() => onSelect(option)}
              className={`${
                type === "walking"
                  ? "w-full aspect-[4/3]" // 카드 비율 조정
                  : "sm:h-[300px] w-full h-[150px]"
              } bg-white p-0 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 overflow-hidden`}
            >
              <img
                src={option.imgUrl}
                alt={option.title}
                className="rounded-t-lg w-full h-[70%] object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold truncate text-center">
                  {option.title} {option.backdrop}
                </h2>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};
