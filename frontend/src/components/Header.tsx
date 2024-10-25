import { Menu, X } from "lucide-react";
import React, { useState } from "react";

// 타입 정의
interface NavItem {
  id: number;
  label: string;
  onClick: () => void;
}

const Header: React.FC = () => {
  // 네비게이션 아이템 정의
  const navItems: NavItem[] = [
    {
      id: 1,
      label: "상상더하기",
      onClick: () => console.log("상상더하기 클릭됨"),
    },
    {
      id: 2,
      label: "웹툰 체험",
      onClick: () => console.log("웹툰체험 클릭됨"),
    },
    {
      id: 3,
      label: "다른 사람들",
      onClick: () => console.log("공유보드 클릭됨"),
    },
  ];

  // 모바일 메뉴 햄버거
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log("Toggle menu clicked"); // 토글 동작 로깅
  };

  return (
    <header className="w-full px-4 py-2 bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* 로고 섹션 */}
        <div className="flex items-center">
          <img
            src="letsleapup-logo(dall-e).PNG"
            alt="LetsLeapUp 로고"
            className="w-24 h-auto object-contain"
          />
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
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
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  item.onClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
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
