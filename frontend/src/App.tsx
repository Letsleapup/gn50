import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import "./index.css";
import ShareBoardPage from "./pages/shareboardpage/ShareBoardPage";
import MainPage from "./pages/mainpage/MainPage";
import SelectPage from "./pages/selectpage/SelectPage";
import ChatbotPage from "./pages/chatbotpage/ChatbotPage";
import DetailContent from "./components/Detailcontent/DetailContent";
import { Loading } from "./components/Loading/Loading";
import { starterMessage } from "./data/dummydata";
import ErrorPage from "./pages/errorpage/ErrorPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { ScrollToTop } from "./util/ScrollToTop";
import { logger } from "./util/logger";
import ContentDisplay from "./components/Generated/ContentDisplay";
import { BoardType } from "./@types/domain";

// AppRoutes 컴포넌트 - 실제 라우팅 로직을 담당
const AppRoutes: React.FC = () => {
  const location = useLocation();
  // 챗봇 페이지지만 결과를 보여주는 상태인지 확인하기 위해 상태 공유 필요
  const [showingResult, setShowingResult] = useState(false);

  // 디버깅용 로그 추가
  useEffect(() => {
    logger.log("AppRoutes - showingResult 상태:", showingResult);
    logger.log("현재 경로:", location.pathname);
  }, [showingResult, location]);

  // 챗봇 페이지이면서 결과를 보여주지 않을 때만 header/footer 숨김
  const hideHeaderFooter =
    location.pathname.includes("/chatbot") && !showingResult;

  return (
    <div className="App">
      {!hideHeaderFooter && <Header />}
      <ScrollToTop />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="chatbot/:type"
            element={<ChatbotPage onShowResult={setShowingResult} />}
          />
          <Route path="select/:type" element={<SelectPage />} />
          <Route path="shared/:type" element={<ShareBoardPage />} />
          <Route
            path="loading"
            element={<Loading message={starterMessage} />}
          />
          <Route
            path="shared/:type/:contentId"
            element={<DetailContent source="shareboard" />}
          />
          <Route path="generated/:type/:contentId" 
            element={<ContentDisplay 
            type={useParams().type as BoardType} 
            imageUrl="/asset/webtoonimg1.png" 
            title="과거의 강남" 
            scenario="과거의 강남, hello world" 
            contentId="test-1" 
            onEdit={async () => {
              logger.log("edit");
              return true;
            }} 
            onShare={async () => {
              logger.log("share")
              return true;
            }}
            onRegenerate={async () => {
              logger.log("regenerate")
              return true;
            }}
          />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

// 메인 App 컴포넌트 - Router 설정을 담당
const App: React.FC = () => {
  return (
    <Router
      basename=""
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <AppRoutes />
    </Router>
  );
};

export default App;
