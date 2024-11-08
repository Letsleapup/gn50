import React, { useEffect, useRef, useState } from "react";
import { AutoResizingTextarea } from "../../components/AutoResizingTextArea/AutoResizingTextArea";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { LoaderCircle, UserRound } from "lucide-react";
import { walkingQuestions, webtoonQuestions } from "../../data/dummydata";

interface ChatHistory {
  type: string; // walking 또는 webtoon
  selectedTitle: string; // 선택한 장소/웹툰 제목
  chatHistory: string[]; // 사용자 응답들만 순서대로 저장
}

const ChatbotPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{ role: string; type: string; content: string }>
  >([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  // 메시지 영역 ref 추가
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // 질문 리스트를 백엔드에서 가져오는 함수
  // const fetchQuestions = async (type: string) => {
  //   try {
  //     const response = await fetch(`/api/questions/${type}`);
  //     const data = await response.json();
  //     setQuestions(data);
  //   } catch (error) {
  //     console.error("질문 목록을 가져오는데 실패했습니다:", error);
  //     // 에러 처리 (예: 기본 질문 목록 사용)
  //   }
  // };

  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const imgUrl = searchParams.get("imgUrl");

  // 채팅 히스토리 전송 함수
  const sendChatHistory = async () => {
    try {
      setIsLoading(true);
      console.log("Sending chat history...");
      console.log(isFocused) //TODO: 삭제예정
      const historyData: ChatHistory = {
        type: type || "",
        selectedTitle: title || "",
        chatHistory,
      };

      console.log("Sending data:", historyData); // 전송 데이터 확인용

      // 백엔드 연결 전 임시 처리
      try {
        const response = await fetch("/api/chatbot/chat-history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(historyData),
        });

        if (!response.ok) {
          throw new Error("채팅 히스토리 전송 실패");
        }

        const data = await response.json();
        console.log("Chat history sent successfully:", data);
      } catch (error) {
        // API 오류 시 임시로 성공으로 처리
        console.log("Development mode: Simulating successful API call");
        console.log("Chat history data:", historyData);
      }

      // 모든 질문에 답변 완료시 로딩 페이지로 이동
      const questions =
        type === "walking" ? walkingQuestions : webtoonQuestions;
      if (chatHistory.length === questions.length) {
        navigate("/loading");
      }
    } catch (error) {
      console.error("Error handling chat history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 메시지 전송 처리
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // 사용자 메시지 추가
    const userMessage = {
      role: "user",
      type: "text",
      content: inputText.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setChatHistory((prev) => [...prev, inputText.trim()]); // 채팅 히스토리에 저장
    setInputText("");

    // 다음 질문 처리
    const questions = type === "walking" ? walkingQuestions : webtoonQuestions;
    const currentQuestionIndex = Math.floor((messages.length - 2) / 2);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            type: "text",
            content: questions[currentQuestionIndex + 1],
          },
        ]);
      }, 1000);
    } else {
      // 마지막 응답 후 데이터 전송
      sendChatHistory();
    }
  };

  // 웰컴 메세지
  useEffect(() => {
    if (!type || !title || !imgUrl) {
      console.error("Required parameters missing");
      navigate("/select");
      return;
    }

    const questions = type === "walking" ? walkingQuestions : webtoonQuestions;

    // 선택한 이미지 먼저 보여주기
    const initialMessages = [
      {
        role: "assistant",
        type: "image",
        content: decodeURIComponent(imgUrl),
      },
      {
        role: "assistant",
        type: "text",
        content: `${title}을 선택하셨군요!`,
      },
      // 첫 번째 질문 표시
      {
        role: "assistant",
        type: "text",
        content: questions[0],
      },
    ];
    initialMessages.forEach((message, index) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, message]);
      }, index * 1000); // 각 메시지마다 1초 간격
    });
  }, [type, imgUrl, title]);

  const handleTextChange = (text: string) => {
    setInputText(text);
  };

  useEffect(() => {
    if (messages.length > 0) {
      // 메시지 컨테이너의 스크롤을 bottom으로
      const messageContainer = messageContainerRef.current;
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    if (chatHistory.length > 0) {
      sendChatHistory();
    }
  }, [chatHistory]);

  return (
    <div className="flex flex-col justify-center items-center bg-blue-50 ">
      {/* 메세지 영역 */}
      <div className="relative flex-1 w-[768px] mt-[200px] mb-20">
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <LoaderCircle style={{ transform: "rotate(90deg)" }} />
          </div>
        )}
        <div className="relative flex-1 max-w-[768px] h-[700px] w-full mx-auto">
          <div
            className="h-full overflow-y-auto pb-20 p-4 scrollbar-custom"
            ref={messageContainerRef}
            style={{
              scrollbarWidth: "auto",
              msOverflowStyle: "none",
            }}
          >
            {messages.map((message, index) => {
              // 여기서 이전 메시지와 비교
              const showProfile =
                index === 0 || messages[index - 1].role !== message.role;

              return (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.role === "assistant"
                      ? "flex flex-col items-start"
                      : "flex flex-col items-end"
                  }`}
                >
                  {/* 조건부로 프로필 이미지 표시 */}
                  {showProfile && (
                    <div className="flex-shrink-0 mb-2">
                      {message.role === "assistant" ? (
                        <img
                          src="/asset/main_chat_img01.png"
                          alt="AI-assistant"
                          className="bg-blue-700 w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                          <UserRound className="w-12 h-12 bg-white" />
                        </div>
                      )}
                    </div>
                  )}
                  {/* 메시지 내용 */}
                  <div
                    className={`inline-block max-w-[70%] p-3  relative ${
                      message.role === "assistant"
                        ? "bg-white  rounded-b-lg rounded-r-lg"
                        : "bg-blue-500 rounded-b-lg rounded-l-lg text-white"
                    }`}
                  >
                    {message.type === "image" ? (
                      <img
                        src={message.content}
                        alt={title || "선택된 이미지"}
                        className="w-[300px] h-[200px] object-cover rounded-lg"
                      />
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <div className="absolute bottom-0 left-0 right-0 ">
            <div className="relative m-2 drop-shadow-[0_0px_10px_rgba(0,0,0,0.3)]">
              {/* 그라데이션 테두리를 위한 배경 컨테이너 */}
              <div className="rounded-full transition-all duration-300 ">
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatbotPage;
