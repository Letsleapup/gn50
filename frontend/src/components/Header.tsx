import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 타입 정의
interface NavItem {
  id: number;
  label: React.ReactNode;
  onClick: () => void;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  // 네비게이션 아이템 정의
  const navItems: NavItem[] = [
    {
      id: 1,
      label: <>상상더하기 체험</>,
      onClick: () => navigate("/select/walking"),
    },
    {
      id: 2,
      label: <>웹툰 생성 체험</>,
      onClick: () => navigate("/select/webtoon"),
    },
    {
      id: 3,
      label: <>갤러리</>,
      onClick: () => navigate("/shared/walking"),
    },
  ];

  // 모바일 메뉴 햄버거
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header className="fixed top-[2.5rem] w-full bg-transparent relative z-50">
      <div className="flex max-w-1920 mx-auto justify-between items-center">
        {/* 로고 섹션 */}
        <div className="w-[10%] mx-[1.75rem] sm:mx-8 flex justify-start items-center space-x-4">
          <img
            src="/gn50/asset/logo.svg"
            alt="강남구 CI*슬로건"
            className="h-10 sm:h-12 "
            onClick={() => navigate("/")}
          />
        </div>
        {/* 네비게이션 메뉴 */}
        <nav className="hidden md:flex bg-gray-200 rounded-full px-4 sm:px-6 py-2 sm:py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className="font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-center leading-tight"
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* 모바일 햄버거 메뉴 버튼 */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
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
