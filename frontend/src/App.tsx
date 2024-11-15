import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

const App: React.FC = () => {
  return (
    <Router basename="">
      <div className="App">
        <Header />
        <ScrollToTop />
        <main className="flex-1">
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
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
