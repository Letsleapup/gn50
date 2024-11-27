import React, { useCallback, useEffect, useRef, useState } from "react";
import { AutoResizingTextarea } from "../../components/AutoResizingTextArea/AutoResizingTextArea";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import ContentDisplay from "../../components/Generated/ContentDisplay";
import { Loading } from "../../components/Loading/Loading";
import { GeneratedContentState } from "../../@types/domain";
import "./ChatbotPage.css";
import { logger } from "../../util/logger";
import { chatbotApi } from "../../api/chatbotPage_api";
import {
  getResultWalkingAiapi,
  getResultWebtoonAiapi,
  resultPageApi,
} from "../../api/resultPage_api";
import { profanityApi } from "../../api/profanity_api";

interface ChatbotPageProps {
  onShowResult: (showing: boolean) => void;
}

// 웹툰 시대별 프롬프트

const WEBTOON_ERA_PROMPTS = {
  past: "((4-panel webtoon)), Seoul 1970s-1990s. Include: low-rise buildings, old shops, vintage Korean fashion, ((style: retro, blackandwhite)). Focus on:",

  present: "((4-panel webtoon)), Seoul 2000s-2025s. Focus on:",

  future:
    "((4-panel webtoon)), Seoul 2050s. Include: modern buildings, vertical gardens, smart technology.((style: futuristic, neon)) Focus on:",
};

const ChatbotPage: React.FC<ChatbotPageProps> = ({ onShowResult }) => {
  const { type } = useParams<{ type: "walking" | "webtoon" }>();
  const [searchParams] = useSearchParams();

  // URL 파라미터
  const idx = searchParams.get("idx");
  const title = searchParams.get("title");
  const imgUrl = searchParams.get("imgUrl");

  // API 데이터 상태
  const [chatbotData, setChatbotData] = useState<{
    title: string;
    imgUrl: string;
    chatbotFiles: string[];
    welcomeMessage: string;
    questions: string[];
  } | null>(null);

  // 채팅 관련 상태
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<
    Array<{ role: string; type: string; content: string }>
  >([]);
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 결과 관련 상태
  const [isLoading, setIsLoading] = useState(false); // 첫메시지 나오기 전
  const [showResult, setShowResult] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); //로딩전환

  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContentState>({
      type: type === "webtoon" ? "webtoon" : "walking",
      imgUrl: chatbotData?.imgUrl || decodeURIComponent(imgUrl || ""),
      title: chatbotData?.title || "",
      scenario: "",
      idx: idx ? idx : "",
    });

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // 웰컴 메세지
  useEffect(() => {
    const loadChatbotData = async () => {
      try {
        if (!type || !title || !imgUrl) {
          logger.error("Required parameters missing");
          navigate("/select");
          return;
        }
        setIsLoading(true);
        // setIsLoading(false);

        logger.log("챗봇 데이터 로딩 시작", { type, idx });

        // API 호출
        const data =
          type === "walking"
            ? await chatbotApi.getSpChatbotForm(Number(idx))
            : await chatbotApi.getWmChatbotForm(Number(idx));

        setChatbotData(data);
        logger.log("챗봇 데이터 로드 완료", data);

        // 답변 상태 배열 초기화
        setAnsweredQuestions(new Array(data.questions.length).fill(false));

        // 선택한 이미지 먼저 보여주기
        const initialMessages = [
          {
            role: "assistant",
            type: "image",
            content: data.imgUrl,
          },
          {
            role: "assistant",
            type: "text",
            content: data.welcomeMessage,
          },
          {
            role: "assistant",
            type: "text",
            content: data.questions[0],
          },
        ];

        // 메시지 순차적 표시
        initialMessages.forEach((message, index) => {
          if (index === 1) {
            message.content = `${title}${message.content}`;
          }
          setTimeout(() => {
            setMessages((prev) => [...prev, message]);

            if (index === initialMessages.length - 1) {
              setIsInputEnabled(true);
              setCurrentQuestionIndex(0);
            }
          }, index * 1000);
        });
      } catch (error) {
        logger.error("챗봇 데이터 로딩 실패:", error);
        navigate("/select");
      } finally {
        setIsLoading(false);
      }
    };

    loadChatbotData();
  }, [type, idx, navigate, title, imgUrl]);

  // 메세지 스크롤 애니메이션
  useEffect(() => {
    // 메시지 컨테이너의 스크롤을 bottom으로
    if (messages.length > 0 && messageContainerRef.current) {
      const scrollElement = messageContainerRef.current;

      // 새 메시지가 추가될 때 애니메이션 클래스 추가
      scrollElement.classList.add("has-new-message");

      // 스크롤 이동
      scrollElement.scrollTop = scrollElement.scrollHeight;

      // 애니메이션 종료 후 클래스 제거
      setTimeout(() => {
        scrollElement.classList.remove("has-new-message");
      }, 500); // 애니메이션 지속 시간과 동일하게 설정
    }
  }, [messages]);

  const getResult = useCallback(
    async (prompt: string) => {
      logger.log("Sending chat history to API:", prompt, chatHistory);

      let result;
      if (type === "walking") {
        result = await getResultWalkingAiapi(prompt, idx || "1");
      } else {
        // 웹툰일 경우 시대별 프롬프트 추가
        const era = chatbotData?.title?.includes("과거")
          ? "past"
          : chatbotData?.title?.includes("현재")
            ? "present"
            : chatbotData?.title?.includes("미래")
              ? "future"
              : "present";

        const combinedPrompt = `${WEBTOON_ERA_PROMPTS[era]}\n\nUser Context:\n${prompt}`;
        logger.log("Webtoon Generation Prompt:", combinedPrompt);

        result = await getResultWebtoonAiapi(prompt, idx || "1");
      }

      logger.log("API Response:", result);
      return result;
    },
    [type, idx, chatHistory, chatbotData?.title]
  );

  // 메시지 전송 처리
  const handleSendMessage = async () => {
    if (
      !inputText.trim() ||
      !isInputEnabled ||
      !chatbotData ||
      answeredQuestions[currentQuestionIndex]
    )
      return;

    try {
      // 금칙어 체크
      logger.info("Checking profanity for text:", inputText);
      const response = await profanityApi.checkProfanity(inputText.trim());

      const currentAnswer = inputText.trim();

      if (response.data.resultCode === "Y") {
        logger.warn("Profanity detected in message");

        // 금칙어 발견시:
        // 1. 입력창 초기화
        setInputText("");

        // 2. 에러 메시지 추가
        if (chatbotData && currentQuestionIndex >= 0) {
          setMessages((prev) => [
            ...prev,
            { role: "user", type: "text", content: currentAnswer },
            {
              role: "assistant",
              type: "text",
              content: "부적절한 단어가 포함되어 있습니다. 다시 입력해주세요.",
            },
            {
              role: "assistant",
              type: "text",
              content: chatbotData.questions[currentQuestionIndex], // 현재 질문 다시하기
            },
          ]);
        }
        setIsInputEnabled(true);
        return;
      }

      const currentQuestion = chatbotData.questions[currentQuestionIndex];

      if (!currentQuestion) {
        logger.error("Invalid question data.");
        return;
      }

      // 현재 질문-답변 페어 생성
      const questionAnswerPair = `Q: ((${currentQuestion}))\nA: (((${currentAnswer})))`;

      // 메시지 UI 업데이트
      setMessages((prev) => [
        ...prev,
        { role: "user", type: "text", content: currentAnswer },
      ]);

      // chatHistory 업데이트
      setChatHistory((prevHistory) => {
        const updatedHistory = [...prevHistory, questionAnswerPair];
        logger.log("Updated Chat History:", updatedHistory);
        // 마지막 질문 처리 및 API 호출
        if (currentQuestionIndex === chatbotData.questions.length - 1) {
          handleLastQuestion(updatedHistory); // 마지막 질문일 경우 처리
        }

        return updatedHistory; // 업데이트된 history 반환
      });

      setInputText("");
      setIsInputEnabled(false);

      // 마지막 질문이 아니면 다음 질문 표시
      if (currentQuestionIndex < chatbotData.questions.length - 1) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              type: "text",
              content: chatbotData.questions[currentQuestionIndex + 1],
            },
          ]);
          setCurrentQuestionIndex((prev) => prev + 1);
          setIsInputEnabled(true);
        }, 1000);
      }
    } catch (error) {
      logger.error("메시지 전송 중 오류:", error);
      alert("메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsInputEnabled(true);
    }
  };
  // 마지막 질문 처리 함수
  const handleLastQuestion = async (updatedHistory: string[]) => {
    try {
      setIsGenerating(true);
      // 웹툰 타입일 경우 시대별 프롬프트 추가
      let prompt = "";
      if (type === "webtoon") {
        const era = chatbotData?.title?.includes("과거")
          ? "past"
          : chatbotData?.title?.includes("현재")
            ? "present"
            : chatbotData?.title?.includes("미래")
              ? "future"
              : "present";
        prompt = `${WEBTOON_ERA_PROMPTS[era]}\n\nUser Context:\n${updatedHistory.join("\n\n")}`;
        logger.log("Final Webtoon Prompt:", prompt);
      } else {
        prompt =
          updatedHistory.join("\n\n") +
          // "\n\nAdd seasonal, environmental, or emotional elements as described in this variable section. Ensure the additional details blend seamlessly with the overall layout Use these details to enhance the mood and setting without altering the core structure or composition.";
          "계절적, 환경적 또는 감정적인 요소를 이 변수 섹션에서 설명된 대로 추가. 이러한 세부 사항이 전체 레이아웃과 자연스럽게 조화를 이루고, 핵심 구조나 구성을 변경하지 않고 분위기와 설정을 향상.";
      }

      // API 호출
      const result = await getResult(prompt);

      // 결과 상태 업데이트
      setGeneratedContent({
        type: type as "webtoon" | "walking",
        imgUrl: decodeURIComponent(result?.image_url || ""),
        title: result?.keywords || "",
        scenario: result?.description || "",
        idx: result?.idx,
      });

      setShowResult(true);
    } catch (error) {
      logger.error("Error generating result:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsGenerating(false);
    }
  };

  // 시나리오 수정 처리 함수
  const handleScenarioEdit = async (
    newScenario: string,
    idx: number | string
  ): Promise<boolean> => {
    try {
      logger.log("시나리오 수정:", newScenario, idx);

      const response = await resultPageApi.editScenario({
        idx: String(generatedContent?.idx || "1"),
        context: newScenario,
      });

      //TODO: 에러처리 추가 진행
      logger.log("시나리오 수정 응답:", response);
      // state로 시나리오 업데이트
      setGeneratedContent((prev) => ({
        ...prev,
        scenario: newScenario,
      }));

      logger.log("수정된 시나리오:", newScenario);
      return true;
    } catch (error) {
      logger.error("시나리오 수정 중 오류:", error);
      return false;
    }
  };

  // 공유하기 처리 함수
  const handleShare = async (): Promise<boolean> => {
    try {
      logger.log("갤러리 공유:", generatedContent);
      navigate("/shared"); // 갤러리 페이지로 이동
      return true;
    } catch (error) {
      logger.error("공유 중 오류:", error);
      return false;
    }
  };

  // 처음부터 다시 시작하는 함수
  const handleRestart = async () => {
    logger.log("처음부터 다시 시작");
    try {
      const response = await resultPageApi.isUpdateComplete(
        {
          idx: String(generatedContent?.idx || "1"),
          complete_yn: "N",
        },
        type ? type : "walking"
      );

      logger.log("TEST response", response);
      // 선택했던 type으로 select 페이지로 이동
      navigate(`/select/${type}`, {
        replace: true, // 뒤로 가기 방지를 위해 replace 사용
      });
    } catch (error) {
      logger.error("처음부터 다시 시작 중 오류:", error);
    }
  };

  // showResult 상태가 변경될 때마다 상위 컴포넌트에 알림
  useEffect(() => {
    onShowResult(showResult);
  }, [showResult, onShowResult]);

  return (
    <div className="cr_chatbot-container">
      {isGenerating ? (
        <Loading
          type={type || "walking"}
          onLoadingComplete={() => {
            logger.log("로딩완료");
          }}
        />
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
                            src={chatbotData?.chatbotFiles[0]}
                            alt="AI-assistant"
                            className="cr_profile-assistant"
                          />
                        ) : (
                          <div className="cr_profile-user">
                            <img
                              src={chatbotData?.chatbotFiles[1]}
                              className="w-12 h-12"
                              alt="userProfileImage"
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
            </div>

            <div className="cr_input-container">
              <div className="cr_input-wrapper">
                <AutoResizingTextarea
                  backgroundColor="white"
                  color="black"
                  hasButton={true}
                  onChange={(text: string) => setInputText(text)}
                  onSendData={handleSendMessage}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ContentDisplay
          type={generatedContent.type}
          imgUrl={generatedContent.imgUrl}
          title={generatedContent.title}
          scenario={generatedContent.scenario}
          contentId={generatedContent ? String(generatedContent.idx) : "1"}
          onEdit={handleScenarioEdit}
          onShare={handleShare}
          onRegenerate={handleRestart}
        />
      )}
    </div>
  );
};

export default ChatbotPage;
