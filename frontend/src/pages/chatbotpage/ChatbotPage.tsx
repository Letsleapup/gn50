import React, { useEffect, useRef, useState } from "react";
import { AutoResizingTextarea } from "../../components/AutoResizingTextArea/AutoResizingTextArea";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { walkingQuestions, webtoonQuestions } from "../../data/dummydata";
import ContentDisplay from "../../components/Generated/ContentDisplay";

import { Loading } from "../../components/Loading/Loading";
import { starterMessage } from "../../data/dummydata";
import { GeneratedContentState } from "../../@types/domain";
import "./ChatbotPage.css";

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
  const [isLoading] = useState(false);
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

  // 컨텐츠 결과 관련 상태 추가
  const [showResult, setShowResult] = useState(false); //TODO:결과페이지 임시테스트를 위해 true,
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContentState>({
      type: type === "webtoon" ? "webtoon" : "walking",
      imageUrl: "/asset/thumb10.png",
      title: "(테스트)도산공원",
      scenario:
        "(테스트)화창한 봄날에 안창호 선생님과 함께 도산공원을 걷는 모습을 그려보았습니다. 상상하신 모습을 바탕으로 Walkable City 로 발전하는 강남구의 모습을 기대해 주세요.",
    });
  const [isGenerating, setIsGenerating] = useState(false);

  const sendChatHistory = async () => {
    try {
      setIsGenerating(true);
      const historyData: ChatHistory = {
        type: type || "",
        selectedTitle: title || "",
        chatHistory,
      };

      console.log("전송 데이터:", historyData);
      try {
        //TODO: 개발끝나면 try{괄호만}catch(error){..}부분 삭제
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

        if (type !== "webtoon" && type !== "walking") {
          throw new Error("잘못된 타입입니다");
        }
      } catch (error) {
        console.log("작업중이라 api 호출 실패 무시됨");
      }
      setGeneratedContent({
        ...generatedContent,
        type: type as "webtoon" | "walking",
        imageUrl: decodeURIComponent(imgUrl || ""),
        title: title || "",
        scenario: chatHistory.join("\n\n"),
      });
    } catch (error) {
      console.error("Error:", error);
      throw error;
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
  }, [type, imgUrl, title, navigate]);

  const handleTextChange = (text: string) => {
    setInputText(text);
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
      // 마지막 답변 후 로딩 상태로 전환
      setIsGenerating(true);

      try {
        // 채팅 히스토리 전송
        await sendChatHistory();

        //TODO: 로딩이 끝나면 결과 화면으로// 이건 개발끝나면 살리기
        // setShowResult(true);
        //TODO: 5초 후에 결과 화면으로 전환 // 개발끝나면 아래 4줄 삭제
        setTimeout(() => {
          setShowResult(true);
          setIsGenerating(false);
        }, 5000);
      } catch (error) {
        console.error("Error:", error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setIsGenerating(false);
      }
    }
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

  // useEffect(() => {
  //   if (chatHistory.length > 0) {
  //     sendChatHistory();
  //   }
  // }, [chatHistory, type, title, imgUrl]);

  return (
    <div className="cr_chatbot-container">
      {isGenerating ? (
        <Loading message={starterMessage} />
      ) : !showResult ? (
        <div className="cr_message-area">
          {isLoading && (
            <div className="absolute top-0 left-0 right-0 flex justify-center">
              <LoaderCircle className="animate-spin w-20 h-20 text-blue-700" />
            </div>
          )}
          <div className="cr_message-container">
            <div className="cr_message-scroll" ref={messageContainerRef}>
              {messages.map((message, index) => {
                const showProfile =
                  index === 0 || messages[index - 1].role !== message.role;

                return (
                  <div
                    key={index}
                    className={`cr_message-wrapper ${
                      message.role === "assistant"
                        ? "cr_message-wrapper-assistant"
                        : "cr_message-wrapper-user"
                    }`}
                  >
                    {showProfile && (
                      <div className="cr_profile-image">
                        {message.role === "assistant" ? (
                          <img
                            src="/asset/prof_chat.png"
                            alt="AI-assistant"
                            className="cr_profile-assistant"
                          />
                        ) : (
                          <div className="cr_profile-user">
                            <img
                              src="/asset/prof_user.svg"
                              className="w-12 h-12"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    <div
                      className={`cr_message-bubble ${
                        message.role === "assistant"
                          ? "cr_message-bubble-assistant"
                          : "cr_message-bubble-user"
                      }`}
                    >
                      {message.type === "image" ? (
                        <img
                          src={message.content}
                          alt={title || "선택된 이미지"}
                          className="cr_message-image"
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

            <div className="cr_input-area">
              <div className="cr_input-container">
                <div className="cr_input-wrapper">
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
      ) : (
        <ContentDisplay
          type={generatedContent.type}
          imageUrl={generatedContent.imageUrl}
          title={generatedContent.title}
          scenario={generatedContent.scenario}
          onEdit={() => setShowResult(false)}
          onShare={() => navigate("/shareboard")}
          onRegenerate={() => navigate("/select/walking")}
        />
      )}
    </div>
  );
};

export default ChatbotPage;
