import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// 선택 옵션 타입 정의
type SelectOption = {
  id: string;
  title: string;
  imgUrl: string;
  style: string;
  backdrop: string;
};

const SelectPage: React.FC = () => {
  const navigate = useNavigate();
  // URL 파라미터로 타입('walking' 또는 'webtoon') 받기
  const { type } = useParams<{ type: string }>();

  console.log("현재 선택된 타입:", type); // 디버깅용 로그

  // 선택 옵션 데이터 (타입별로 다른 옵션 제공)
  const selectOptions: { [key: string]: SelectOption[] } = {
    walking: [
      {
        id: "1",
        title: "1",
        imgUrl: "/gn50/picsumimage1.jpg",
        style: "",
        backdrop: "",
      },
      {
        id: "2",
        title: "2",
        imgUrl: "/gn50/picsumimage1.jpg",
        style: "",
        backdrop: "",
      },
    ],
    webtoon: [
      {
        id: "1",
        title: "과거의 강남",
        imgUrl: "/gn50/picsumimage1.jpg",
        style: "gray",
        backdrop: "1970s~1990s",
      },
      {
        id: "2",
        title: "현재의 강남",
        imgUrl: "/gn50/picsumimage2.jpg",
        style: "modern",
        backdrop: "2000s~2020s",
      },
      {
        id: "3",
        title: "미래의 강남",
        imgUrl: "/gn50/picsumimage3.jpg",
        style: "colorfull, megacity, ",
        backdrop: "2020s~2040s",
      },
    ],
  };

  // 현재 타입에 해당하는 옵션들 가져오기
  const currentOptions = type ? selectOptions[type] : [];

  console.log("현재 선택 가능한 옵션들:", currentOptions); // 디버깅용 로그

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">
          {type === "walking" ? "걷기 좋은 강남 만들기" : "웹툰 생성 체험"}
        </h1>

        {/* 선택 옵션 그리드 */}
        <div className="grid grid-cols-1 gap-6 ">
          {currentOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                console.log(`선택된 옵션:`, option); // 디버깅용 로그
                navigate("");
              }}
              className="h-[300px] bg-yellow-50 p-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={option.imgUrl}
                alt={option.id}
                className=" rounded-lg overflow-hidden w-full h-full object-cover"
              ></img>
              <h2 className="text-xl font-semibold mb-2">
                {option.title} {option.backdrop}
              </h2>
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SelectPage;
