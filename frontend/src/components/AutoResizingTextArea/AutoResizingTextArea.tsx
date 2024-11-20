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

  // 텍스트가 변경될 때마다 높이 자동 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞게 높이 조절
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
    <div className="input-container">
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
