import { FunctionComponent, useEffect, useState } from "react";
import "./Loading.css";
import { chatbotLoadingApi } from "../../api/chatbotPage_api";

interface LoadingProps {
  type: "walking" | "webtoon";
  onLoadingComplete?: () => void;
}

export const Loading: FunctionComponent<LoadingProps> = ({
  type,
  onLoadingComplete,
}) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [messages, setMessages] = useState<string[][]>([]);
  const [loadingFile, setLoadingFile] = useState<string>("");

  // API 데이터 가져오기
  useEffect(() => {
    const fetchLoadingData = async () => {
      try {
        const result =
          type === "walking"
            ? await chatbotLoadingApi.checkSpLoading()
            : await chatbotLoadingApi.checkWmLoading();

        // API에서 받은 메시지를 2차원 배열로 변환
        const formattedMessages = result.messages.map((msg) => [msg]);
        setMessages(formattedMessages);

        setLoadingFile(result.loadingFile);
      } catch (err) {
        console.error("로딩 데이터 가져오기 실패:", err);
        // 에러 시 기본 메시지 설정
        setMessages([["로딩 중입니다..."]]);
      }
    };

    fetchLoadingData();
  }, [type]);

  // 메시지 변경 타이머
  useEffect(() => {
    if (messages.length > 0 && messages.length - 1 > messageIndex) {
      const timer = setTimeout(() => {
        setMessageIndex((prevIndex) => prevIndex + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (messages.length > 0 && messageIndex === messages.length - 1) {
      // 모든 메시지가 표시되었을 때
      onLoadingComplete?.();
    }
  }, [messageIndex, messages.length, onLoadingComplete]);

  // 메시지가 아직 로드되지 않았을 때
  if (messages.length === 0) {
    return null; // 또는 로딩 인디케이터 표시
  }

  return (
    <div className={`yg-loading-container z-[300]`}>
      <div className="yg-loading-messagebox">
        {messages[messageIndex].map((msg, idx) => {
          return <div key={idx}>{msg}</div>;
        })}
      </div>
      <div className="yg-loading-robot-container">
        <img
          className="yg-loading-chat-g-icon"
          src={"/asset/2x/chat_g@2x.png"}
          alt="robot icon"
        />
        <img
          className="yg-loading-robot-icon"
          src={"/asset/2x/chatbot@2x.png"}
          alt="robot icon"
        />
        <img
          className="yg-loading-chat-b-icon"
          src={"/asset/2x/chat_b@2x.png"}
          alt="robot icon"
        />
        {!loadingFile && (
          <img
            src={loadingFile}
            alt="loading animation"
            className="loading-animation"
          />
        )}
      </div>
    </div>
  );
};
