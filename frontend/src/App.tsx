import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import ShareBoardPage from "./pages/shareboardpage/ShareBoardPage";
import MainPage from "./pages/mainpage/MainPage";
import SelectPage from "./pages/selectpage/SelectPage";
import ChatbotPage from "./pages/chatbotpage/ChatbotPage";
import DetailContent from "./components/detailcontent/DetailContent";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

const App: React.FC = () => {
  console.log("App is rendering");

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
            path="/shared/:type/:contentId"
            element={<DetailContent source="shareboard" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
