import { FunctionComponent, useEffect, useState } from "react";
import "./Loading.css"

// interface Props {
//   message: string[];
// }
//TODO: 프롬스 적용후, starterMessage 삭제 예정
export const Loading: FunctionComponent = () => {
  const starterMessage = [
    "입력하신 내용을 저장하고 있어요",
    "저장한 내용을 분석중이에요",
    "분석한 내용을 기반으로 이미지를 만들고 있어요",
    "보여드리기전에 고칠 부분이 있나 분석중이에요",
  ];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (starterMessage.length - 1 > messageIndex) {
      const timer = setTimeout(() => {
        setMessageIndex((prevIndex) => prevIndex + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [messageIndex, starterMessage.length]);
  return (
    <div>
      {starterMessage[messageIndex]}
      <p>download icon</p>{" "}
    </div>
  );
};
