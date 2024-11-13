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

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.pathname.split('/')[2];
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
  
  const isNavMenuItems = (type === 'walking' || type === 'webtoon');
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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


  return (
    <header className={`fixed top-[0] max-w-1920 w-screen ${isScrolled ? `bg-white` : `bg-transparent` } transition-all duration-300 z-50`}>  
      <div className={`relative flex justify-between items-center mt-[3vh] ${isScrolled ? `mb-[3vh]` : `mb-[0]` }`}> 
        {/* 로고 섹션 */}
        <div className="mx-[6vw]">
          <img
            src={`${(isNavMenuItems) && !isScrolled ? '/asset/logo_w.svg' : '/asset/logo.svg'}`}
            alt="강남구 CI*슬로건"
            className="w-[40%] sm:w-[50%] md:w-[80%] lg:w-[100%] ml-0"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", zIndex: 100 }}
          />
        </div>
        {/* 네비게이션 메뉴 */}
        <nav className="absolute left-[35%] w-[31%] h-[81.9%] flex justify-between opacity-75 hidden xl:flex bg-white rounded-full px-4 px-6 py-2">
          {navItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <button
                onClick={item.onClick}
                className={`
                  font-bold px-10 py-2 rounded-md transition-colors text-center leading-tight
                  ${(!isNavMenuItems) ? 'text-black' : ''}
                  ${activeNavItemId === item.id ? 'text-blue-500' : ''}
                  ${system !== 'ios' && system !== 'android' 
                    ? 'hover:text-blue-500' 
                    : ''
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
          className="burger-btn block xl:hidden pt-1 text-white rounded-md hover:bg-gray-100 mr-4"
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
        <div className="fixed inset-0 top-0 bg-white xl:hidden z-40">
          {/* 모바일 메뉴 헤더 */}
          <div className="p-4 flex justify-end ">
            <img
              src="/asset/logo.svg"
              alt="강남구 CI*슬로건"
              className="w-[30%] sm:w-[30%] md:w-[30%] lg:w-[30%] ml-0"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", zIndex: 100 }}
            />
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
