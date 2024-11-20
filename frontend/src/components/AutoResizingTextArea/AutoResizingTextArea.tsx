import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  CompositionEvent,
  FunctionComponent,
} from "react";
import { getByteLength } from "../../util/getByteLength";
import "./AutoResizingTextArea.css";
import { filterTextByKorean } from "../../util/filterText";
import { convertEngToKor } from "../../util/koreanConverter";
import { logger } from "../../util/logger";

const MAX_BYTE_LENGTH = 200;

interface Props {
  backgroundColor?: string;
  color?: string;
  hasButton?: boolean;
  onChange?: (text: string) => void;
  onSendData?: () => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const AutoResizingTextarea: FunctionComponent<Props> = ({
  backgroundColor,
  color,
  hasButton,
  placeholder,
  onSendData,
  onChange,
  onFocus,
  onBlur,
}) => {
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // iOS 키보드 처리를 위한 효과
  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (!isIOS || !window.visualViewport) return;

    logger.log("iOS device detected");

    // visualViewport API 지원 여부 확인
    if (typeof window === "undefined" || !("visualViewport" in window)) {
      logger.log("visualViewport not supported");
      return;
    }
    const handleViewportChange = () => {
      // viewport가 없으면 early return
      if (!window.visualViewport) {
        logger.log("visualViewport is null");
        return;
      }

      const viewport = window.visualViewport;

      if (textareaRef.current && containerRef.current) {
        // 키보드가 올라왔는지 확인 (viewport가 줄어들었는지)
        const viewportHeight = viewport?.height || window.innerHeight;
        const isKeyboardVisible = window.innerHeight - viewport.height > 50;

        if (isKeyboardVisible && isFocused) {
          // 키보드가 올라왔고 입력창이 포커스된 상태
          const keyboardHeight = window.innerHeight - viewport.height;

          // 입력창을 키보드 위로 올림
          containerRef.current.style.transform = `translateY(-${keyboardHeight}px)`;
          containerRef.current.style.position = "fixed";
          containerRef.current.style.bottom = "0";
          containerRef.current.style.width = "100%";

          // 스크롤 조정
          setTimeout(() => {
            textareaRef.current?.scrollIntoView({ block: "center" });
          }, 100);

          logger.log("Keyboard shown:", { keyboardHeight, viewportHeight });
        } else {
          // 키보드가 내려갔거나 포커스가 해제된 상태
          containerRef.current.style.transform = "";
          containerRef.current.style.position = "";
          containerRef.current.style.bottom = "";
          containerRef.current.style.width = "";

          logger.log("Keyboard hidden");
        }
      }
    };

    const cleanup = () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleViewportChange
        );
        window.visualViewport.removeEventListener(
          "scroll",
          handleViewportChange
        );
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleViewportChange);
      window.visualViewport.addEventListener("scroll", handleViewportChange);
    }

    // cleanup 함수 반환
    return cleanup;
  }, [isFocused]);

  // 텍스트 높이 자동 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  // 포커스 핸들러
  const handleFocus = () => {
    logger.log(isFocused); //TODO: 삭제예정
    setIsFocused(true);
    onFocus?.(); // 부모에게 알림
  };

  // 블러 핸들러
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.(); // 부모에게 알림
  };

  // onChange 핸들러 (바이트 수 제한)
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const byteLength = getByteLength(inputText);

    if (byteLength <= MAX_BYTE_LENGTH) {
      if (!isComposing) {
        const convertedText = convertEngToKor(inputText);
        const filteredText = filterTextByKorean(convertedText);
        setText(filteredText);
        onChange?.(filteredText); //부모컴포넌트 상태에 텍스트 세팅
      } else {
        setText(inputText); // 조합 중에는 필터링하지 않고 원본 텍스트 사용
      }
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true); // 한글 조합 중임을 표시
  };

  // 한글 입력이 끝났을 때 (조합 완료)
  const handleCompositionEnd = (e: CompositionEvent<HTMLTextAreaElement>) => {
    setIsComposing(false); // 조합 완료 표시
    const convertedText = convertEngToKor(e.currentTarget.value);
    const filteredText = filterTextByKorean(convertedText); // 조합 후 필터링
    setText(filteredText);
    onChange?.(filteredText); // 조합이 끝났을 때 필터링된 텍스트 전달
  };

  const handleSend = () => {
    onSendData?.();
    setText("");
    onChange?.(""); //부모컴포넌트 상태에 텍스트 초기화
  };

  const isButtonEnabled = text.trim().length > 0;

  // Enter 키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 엔터 동작 방지
      if (text.trim() && !isComposing) {
        // 텍스트가 있고 한글 입력 중이 아닐 때만 전송
        handleSend();
      }
    }
  };

  const byteLength = getByteLength(text);

  // 200자 제한 추가
  const isTextLengthValid = byteLength <= MAX_BYTE_LENGTH;

  return (
    <div className="input-container" ref={containerRef}>
      <div className="input-area ">
        <textarea
          ref={textareaRef}
          className="input-field"
          value={text}
          onChange={handleChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={1} //초기 row는 1로 설정
          placeholder={placeholder ? placeholder : "답변을 입력해주세요."}
          style={{
            resize: "none",
            overflow: "hidden",
            backgroundColor: backgroundColor ? backgroundColor : "#fff",
            color: color ? color : "#000",
          }} // 크기 조절 제한 및 스크롤 제거
        />
        <p className="byte-counter">
          {byteLength}/{MAX_BYTE_LENGTH}
        </p>

        {hasButton && (
          <button
            className={`send-button ${!isButtonEnabled ? "disabled " : ""}`}
            onClick={handleSend}
            disabled={!isTextLengthValid || !isButtonEnabled}
          >
            <img
              src="/asset/ic_send.svg"
              className="w-5 h-5"
              alt="sendbutton"
            />
          </button>
        )}
      </div>
    </div>
  );
};
