import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { json, Navigate, useNavigate } from "react-router-dom";

// 타입 정의
interface NavItem {
  id: number;
  label: React.ReactNode;
  onClick: () => void;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavItemId, setActiveNavItemId] = useState<number | null>(null);
  const onClickNavigate = (url:string, id: number) => {
    setActiveNavItemId(id);
    navigate(url)
  }
  // 네비게이션 아이템 정의
  const navItems: NavItem[] = [
    {
      id: 1,
      label: <>상상더하기 체험</>,
      onClick: () => onClickNavigate("/select/walking", 1),
    },
    {
      id: 2,
      label: <>웹툰 생성 체험</>,
      onClick: () => onClickNavigate("/select/webtoon", 2),
    },
    {
      id: 3,
      label: <>갤러리</>,
      onClick: () => onClickNavigate("/shared/walking", 3),
    },
  ];

  // 모바일 메뉴 햄버거
  

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log("Toggle menu clicked"); // 토글 동작 로깅
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-[3vh] w-full h-0 bg-transparent relative z-50">
      <div className="relative flex max-w-1920 mx-auto justify-between items-center">
        {/* 로고 섹션 */}
        <div className="top-0 left-0 mx-[6vw]">
          <img
            src="/asset/logo.svg"
            alt="강남구 CI*슬로건"
            className="w-[40%] sm:w-[50%] md:w-[80%] lg:w-[100%]"
            onClick={() => navigate("/")}
          />
        </div>
        {/* 네비게이션 메뉴 */}
        <nav className="absolute top-[3%] left-[35%] w-[31%] flex justify-between opacity-75 hidden lg:flex bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3">
          {navItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <button
                onClick={item.onClick}
                className={`font-bold px-10 py-2 rounded-md transition-colors text-center leading-tight 
                  ${activeNavItemId === item.id ? "text-blue-500" : "hover:text-blue"}`}
                type="button"
              >
                {item.label}
              </button>
              {index < navItems.length - 1 && (
                <div className="flex items-center">
                  <div className="w-[5px] h-[5px] bg-[#c9c9c9] rounded-full mx-auto"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
        {/* 모바일 햄버거 메뉴 버튼 */}
        <button
          type="button"
          onClick={toggleMenu}
          className="lg:hidden pt-1 text-white rounded-md hover:bg-gray-100 sm:w-8 absolute top-0 right-0 mx-[3vw]"
          aria-label="메뉴 열기/닫기"
        >
          {isMobileMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-0 bg-white md:hidden z-50">
          {/* 모바일 메뉴 헤더 */}
          <div className="p-4 flex justify-end ">
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="메뉴 닫기"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  item.onClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-4xl px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-center leading-relaxed"
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
