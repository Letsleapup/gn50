import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAgentSystem } from "../../util/checkSystem";

interface NavItem {
  id: number;
  label: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  {
    id: 1,
    label: "상상더하기 체험",
    path: "/select/walking",
  },
  {
    id: 2,
    label: "웹툰 생성 체험",
    path: "/select/webtoon",
  },
  {
    id: 3,
    label: "갤러리",
    path: "/shared/walking",
  },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavItemId, setActiveNavItemId] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [system, setSystem] = useState<string>("unknown");

  const pathSegments = location.pathname.split("/");
  const type = pathSegments[2];
  const pageType = pathSegments[1];

  const isNavMenuItems = ["walking", "webtoon"].includes(type);
  const hasPathLength = pathSegments[pathSegments.length - 1].length > 0;
  const isDetailPage = pathSegments.length > 3 && hasPathLength;

  const getLogoSrc = () => {
    if (pageType === "chatbot" || (pageType === "shared" && isDetailPage) || isMobileMenuOpen )  {
      return "/asset/logo.svg";
    }
    return isNavMenuItems && !isScrolled ? "/asset/logo_w.svg" : "/asset/logo.svg";
  };


  useEffect(() => {
    if (pageType === "shared") {
      setActiveNavItemId(3);
    } else if (pageType === "select" && type === "walking") {
      setActiveNavItemId(1);
    } else if (pageType === "select" && type === "webtoon") {
      setActiveNavItemId(2);
    }
  }, [pageType, type]);

  const isActiveNavItem = (item: NavItem) => {
    if (isNavMenuItems && activeNavItemId === item.id) return true;
    return false;
  };

  const handleNavigation = (item: NavItem) => {
    setActiveNavItemId(item.id);
    navigate(item.path);
  };

  useEffect(() => {
    setSystem(getAgentSystem());
  }, []);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  return (
    <header className={`fixed top-0 max-w-1920 w-screen md:h-[128px] xs:h-[64px] 
      ${isScrolled && !isMobileMenuOpen ? "bg-white opacity-75" : "bg-transparent"} 
      transition-all duration-500 z-[150] flex items-center`}>
      <div className="relative flex justify-between items-center w-full mx-[6vw]">
        {/* 로고 */}
        <div className="z-[150]">
          <img
            src={getLogoSrc()}
            alt="강남구 CI*슬로건"
            className="3xl:w-[100%] md:w-[55.65%] xs:w-[55.65%] ml-0 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* 네비게이션 */}
        <nav className="absolute left-[50%] translate-x-[-50%] w-[31%] h-[40px] md:h-[64px] 
          flex justify-between items-center opacity-75 hidden 2xl:flex bg-white rounded-full 
          3xl:px-[70px] md:px-[60px]">
          {navItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <button
                onClick={() => handleNavigation(item)}
                className={`flex items-center justify-center font-semibold rounded-md 
                  transition-colors text-center leading-tight md:text-[20px] xs:text-[16px]
                  ${isActiveNavItem(item) ? "text-blue-500" : "text-black"}
                  ${system !== "ios" && system !== "android" ? "hover:text-blue-500" : ""}`}
                type="button"
              >
                {item.label}
              </button>
              {index < navItems.length - 1 && (
                <div className="flex items-center">
                  <div className="w-[5px] h-[5px] bg-[#c9c9c9] rounded-full mx-auto" />
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`burger-btn ${isScrolled || pageType === "chatbot" || isDetailPage || isMobileMenuOpen ? "text-black" : "text-white"} 
            m-[8px] p-0 rounded-md
            ${system !== "ios" && system !== "android" ? "hover:bg-gray-100" : ""} 
            block 2xl:hidden z-[150]`}
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
          <div className="flex flex-col gap-[9.375%] mt-[40%]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleNavigation(item);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-[26px] md:text-[48px] font-bold tracking-[-0.65px] 
                  line-height-[38px] rounded-md mb-[69px]
                  ${system !== "ios" && system !== "android" ? "hover:bg-gray-100" : ""} 
                  transition-colors text-center leading-relaxed`}
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
