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

const MAX_BYTE_LENGTH = 200;

interface Props {
  backgroundColor?: string;
  color?: string
  hasButton?: boolean;
  onChange?: (text: string) => void
  onSendData?: () => void;
  placeholder?: string;
}

export const AutoResizingTextarea: FunctionComponent<Props> = ({backgroundColor, color, hasButton, placeholder, onSendData, onChange}) => {
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 텍스트가 변경될 때마다 높이 자동 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞게 높이 조절
    }
  }, [text]);

  // onChange 핸들러 (바이트 수 제한)
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const byteLength = getByteLength(inputText);
    
    if (!isComposing && byteLength <= MAX_BYTE_LENGTH) {
      const filteredText = filterTextByKorean(inputText)
      setText(filteredText);
      onChange?.(filteredText) //부모컴포넌트 상태에 텍스트 세팅
    } else if(isComposing && byteLength <= MAX_BYTE_LENGTH) {
      setText(inputText)
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true); // 한글 조합 중임을 표시
  };

  // 한글 입력이 끝났을 때 (조합 완료)
  const handleCompositionEnd = (e: CompositionEvent<HTMLTextAreaElement>) => {
    setIsComposing(false); // 조합 완료 표시
    const filteredText = filterTextByKorean(e.currentTarget.value); // 조합 후 필터링
    setText(filteredText);
  };

  const handleSend = () => {
    onSendData?.()
    setText("");
    onChange?.("");//부모컴포넌트 상태에 텍스트 초기화
  };

  const byteLength = getByteLength(text);

  return (
    <div className="input-container">
      <div className="input-area">
        <textarea
          ref={textareaRef}
          className="input-field"
          value={text}
          onChange={handleChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          rows={1} // 초기 row는 1로 설정
          placeholder= {placeholder ? placeholder : "답변을 입력해주세요."}
          style={{ resize: "none", overflow: "hidden", backgroundColor: backgroundColor ? backgroundColor : "#fff", color: color ? color : "#fff" }} // 크기 조절 제한 및 스크롤 제거
        />
        <p className="byte-counter">
          {byteLength}/{MAX_BYTE_LENGTH} bytes
        </p>
      </div>
      {hasButton && <button className="send-button" onClick={handleSend}>➤</button>}
    </div>
  );
};
