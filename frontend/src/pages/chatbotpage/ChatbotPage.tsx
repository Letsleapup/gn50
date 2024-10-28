import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { AutoResizingTextarea } from "../../components/AutoResizingTextArea/AutoResizingTextArea";
import { useParams, useSearchParams } from "react-router-dom";

interface ChatParams {
  title: string;
  imgUrl: string;
  description: string;
}

const ChatbotPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [searchParams] = useSearchParams();
  const [chatParams, setChatParams] = useState<ChatParams>({
    title: "",
    imgUrl: "",
    description: "",
  });
  const [inputText, setInputText] = useState<string>("");

  // URL 파라미터 가져오기
  useEffect(() => {
    setChatParams({
      title: searchParams.get("title") || "",
      imgUrl: searchParams.get("imgUrl") || "",
      description: searchParams.get("description") || "",
    });

    console.log("Chat type:", type);
    console.log("Chat params:", chatParams);
  }, [searchParams]);

  const handleTextChange = (text: string) => {
    setInputText(text);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      console.log("전송:", inputText);
      setInputText(""); // 입력 초기화
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <h1 className="text-2xl font-bold p-4">ChatbotPage</h1>

      {/* 메세지 영역 */}
      <div className="relative border flex-1">
        <div className="h-full overflow-y-auto pb-20">Messages</div>

        {/* 입력 영역 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-200">
          <div className="m-2">
            <AutoResizingTextarea
              backgroundColor="white"
              color="black"
              hasButton={true}
              placeholder="답변을 입력하세요"
              onChange={handleTextChange}
              onSendData={handleSendMessage}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChatbotPage;
