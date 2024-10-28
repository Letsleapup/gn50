import React from "react";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

const ChatbotPage: React.FC = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <h1 className="text-2xl font-bold p-4">ChatbotPage</h1>
      <Footer />
    </div>
  );
};

export default ChatbotPage;
