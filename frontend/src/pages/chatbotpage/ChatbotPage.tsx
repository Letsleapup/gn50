import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { AutoResizingTextarea } from "../../components/AutoResizingTextArea/AutoResizingTextArea";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

interface ChatParams {
  title: string;
  imgUrl: string;
  description: string;
}

const ChatbotPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [searchParams] = useSearchParams();
  const [chatParams, setChatParams] = useState<ChatParams>();
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{ role: string; type: string; content: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 현재 질문 단계를 추적하는 상태 추가
  const [questionStep, setQuestionStep] = useState(0);

  // URL 파라미터 가져오기
  useEffect(() => {
    setChatParams({
      title: searchParams.get("title") || "",
      imgUrl: searchParams.get("imgUrl") || "",
      description: searchParams.get("description") || "",
    });
  }, [searchParams]);

  // 웹툰 관련 질문 리스트
  const webtoonQuestions = [
    "웹툰의 장르를 알려주세요(예: 일상, 액션, 로맨스 등)",
    "웹툰의 주인공은 누구인가요?",
    "주인공은 어떤 행동을 하고 있나요?",
    "다른 알아야 할 점이 있나요?",
  ];

  // 걷기 관련 질문 리스트
  const walkingQuestions = [
    "어떤 목적으로 그 곳을 방문하고 싶으신가요?",
    "선호하는 시간대가 있으신가요?",
    "동행하실 분이 있으신가요?",
    "특별히 들러보고 싶은 장소가 있나요?",
  ];

  // 웰컴 메세지
  useEffect(() => {
    if (type) {
      const welcome =
        type === "walking"
          ? "강남구의 어떤 곳을 걷고 싶으신가요?"
          : "어떤 웹툰을 만들어볼까요?";
      setMessages([]);
      setQuestionStep(0);
      welcomeMessage(welcome);
    }
  }, [type]);

  const welcomeMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        type: "text",
        content,
      },
    ]);
  };

  const handleTextChange = (text: string) => {
    setInputText(text);
  };

  const handleSendMessage = () => {
    if (inputText && inputText.trim()) {
      const userMessage = {
        role: "user",
        content: inputText.trim(),
        type: "text",
      };
      console.log("Adding user message:", userMessage);
      setMessages((prev) => [...prev, userMessage]);

      const questions =
        type === "walking" ? walkingQuestions : webtoonQuestions;

      // 다음 질문 추가
      setTimeout(() => {
        if (questionStep < questions.length - 1) {
          welcomeMessage(questions[questionStep]);
          setQuestionStep((prev) => prev + 1);
        } else if (questionStep === questions.length - 1) {
          // 마지막 질문후
          setIsLoading(true);
          navigate("/loading");
        }
      }, 500); // 사용자 메시지 표시 후 잠시 딜레이를 주고 다음 질문 표시
      setInputText(""); // 입력 초기화
    }
  };
  // 메시지 영역 ref 추가
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log("Messages updated:", messages);
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <h1 className="text-2xl font-bold p-4">ChatbotPage</h1>

      {/* 메세지 영역 */}
      <div className="relative border flex-1">
        <div className="h-full overflow-y-auto pb-20 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "assistant"
                  ? "flex justify-start"
                  : "flex justify-end"
              }`}
            >
              <div
                className={`inline-block max-w-[70%] p-3 rounded-lg ${
                  message.role === "assistant"
                    ? "bg-gray-200"
                    : "bg-blue-500 text-white"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

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
