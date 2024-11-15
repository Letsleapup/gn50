import { FunctionComponent, useEffect, useState } from "react";
import "./Loading.css";

interface Props {
  message: string[][];
}

export const Loading: FunctionComponent<Props> = ({ message }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (message.length - 1 > messageIndex) {
      const timer = setTimeout(() => {
        setMessageIndex((prevIndex) => prevIndex + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [messageIndex, message.length]);
  return (
    <div className={`yg-loading-container z-[300]`}>
      <div className="yg-loading-messagebox">
        {message[messageIndex].map((msg, idx) => {
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
      </div>
    </div>
  );
};
