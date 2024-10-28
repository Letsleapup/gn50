import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ShareBoardPage from "./pages/shareboardpage/ShareBoardPage";
import MainPage from "./pages/mainpage/MainPage";
import SelectPage from "./pages/selectpage/SelectPage";

const App: React.FC = () => {
  console.log("App is rendering");

  return (
    <Router basename="/">
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/select/:type" element={<SelectPage />} />
          <Route path="/shared/:type" element={<ShareBoardPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
