import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./index.css";
import ShareBoardPage from "./pages/shareboardpage/ShareBoardPage";
import MainPage from "./pages/mainpage/MainPage";
import SelectPage from "./pages/selectpage/SelectPage";
import ChatbotPage from "./pages/chatbotpage/ChatbotPage";
import DetailContent from "./components/detailcontent/DetailContent";
import { Loading } from "./components/Loading/Loading";
import { starterMessage } from "./data/dummydata";
import ErrorPage from "./pages/errorpage/ErrorPage";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

const App: React.FC = () => {
  console.log("App is rendering");
  useEffect(() => {
    const logSize = () => {
      console.log("Window width:", window.innerWidth);
      console.log(
        "Root font-size:",
        getComputedStyle(document.documentElement).fontSize
      );
    };

    window.addEventListener("resize", logSize);
    logSize(); // 초기 로드 시 크기 확인

    return () => window.removeEventListener("resize", logSize);
  }, []);

  return (
    <Router basename="">
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="chatbot/:type" element={<ChatbotPage />} />
          <Route path="select/:type" element={<SelectPage />} />
          <Route path="shared/:type" element={<ShareBoardPage />} />
          <Route
            path="loading"
            element={<Loading message={starterMessage} />}
          />
          <Route
            path="/shared/:type/:contentId"
            element={<DetailContent source="shareboard" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
