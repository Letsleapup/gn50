import { FunctionComponent, useEffect, useState } from "react";
import "./Loading.css";

interface Props {
  message: string[];
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
    <div className={`yg-loading-container`}>
      <div className="yg-loading-messagebox">
        {message[messageIndex]}
      </div>
      <div className="yg-loading-robot-icon">
        <img src={"/asset/loading_chat.png"} alt="robot icon" />
      </div>
    </div>
  );
};
