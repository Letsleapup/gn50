import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAgentSystem } from "../../util/checkSystem";

// 타입 정의
interface NavItem {
  id: number;
  label: React.ReactNode;
  onClick: () => void;
}

const isNumeric = () => {
  const pathSegments = location.hash.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];
  return !isNaN(Number(lastSegment));
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.pathname.split("/")[2];
  const pageType = location.pathname.split("/")[1];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavItemId, setActiveNavItemId] = useState<number | null>(null);
  const onClickNavigate = (url: string, id: number) => {
    setActiveNavItemId(id);
    navigate(url);
  };
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

  const isNavMenuItems =
    type === "walking" || type === "webtoon";
  // 모바일 메뉴 햄버거

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log("Toggle menu clicked"); // 토글 동작 로깅
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [system, setSystem] = useState<string>("unknown");

  useEffect(() => {
    setSystem(getAgentSystem());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  useEffect(() => {
    console.log(pageType);
    console.log(isNavMenuItems);
  }, [pageType, isNavMenuItems]);

  return (
    <header
      className={`fixed top-[0] max-w-1920 w-screen md:h-[128px] xs:h-[64px] ${isScrolled ? `bg-white opacity-75` : `bg-transparent`} transition-all duration-500 z-[150] flex items-center`}
    >
      <div
        className={`relative flex justify-between items-center w-full mx-[6vw]`}
      >
        {/* 로고 섹션 */}
        <div>
          <img
            src={`${
              pageType === "chatbot" || isNumeric()
                ? "/asset/logo.svg"
                : isNavMenuItems && !isScrolled
                  ? "/asset/logo_w.svg"
                  : "/asset/logo.svg"
            }`}
            alt="강남구 CI*슬로건"
            className="3xl:w-[100%] md:w-[55.65%] xs:w-[55.65%] ml-0"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", zIndex: 100 }}
          />
        </div>
        {/* 네비게이션 메뉴 */}
        <nav className="absolute left-[50%] translate-x-[-50%] w-[31%] h-[40px] md:h-[64px] flex justify-between items-center opacity-75 hidden 2xl:flex bg-white rounded-full 3xl:px-[70px] md:px-[60px]">
          {navItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <button
                onClick={item.onClick}
                className={`
                  flex items-center justify-center font-bold rounded-md transition-colors text-center leading-tight md:text-[20px] xs:text-[16px]
                  ${isNavMenuItems && activeNavItemId === item.id ? "text-blue-500" : "text-black"}
                  ${
                    system !== "ios" && system !== "android"
                      ? "hover:text-blue-500"
                      : ""
                  }
                `}
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
          className={`burger-btn ${isScrolled || pageType === "chatbot" || isNumeric() ? "text-black" : "text-white"} pl-[10px] rounded-md 
          ${system !== "ios" && system !== "android" ? "hover:bg-gray-100" : ""} block 2xl:hidden`}
          aria-label="메뉴 열기/닫기"
        > 
          {isMobileMenuOpen ? (
            <X className="w-[24px] h-[24px] md:w-[48px] md:h-[48px] xs:w-[24px] xs:h-[24px]" />
          ) : (
            <Menu className="w-[24px] h-[24px] md:w-[48px] md:h-[48px] xs:w-[24px] xs:h-[24px]" />
          )}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-0 bg-white xl:hidden z-40">
          {/* 모바일 메뉴 헤더 */}
          <div className="flex items-center justify-between h-[128px] md:h-[64px] xs:h-[64px] mx-[6vw]">
            <img
              src="/asset/logo.svg"
              alt="강남구 CI*슬로건"
              className="w-[89px] mx-0"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", zIndex: 100 }}
            />
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="메뉴 닫기"
            >
              <X className="w-[24px] h-[24px] md:w-[48px] md:h-[48px] xs:w-[24px] xs:h-[24px]" />
            </button>
          </div>
          <div className="flex flex-col gap-[9.375%] mt-[20%]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  item.onClick();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-[26px] md:text-[48px] font-bold tracking-[-0.65px] line-height-[38px] rounded-md mb-[69px]
                  ${
                    system !== "ios" && system !== "android"
                      ? "hover:bg-gray-100"
                      : ""
                  } transition-colors text-center leading-relaxed`}
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
