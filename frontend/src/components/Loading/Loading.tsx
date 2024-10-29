import { FunctionComponent, useEffect, useState } from "react";
import "./Loading.css"

interface Props {
  message: string[];
}

export const Loading: FunctionComponent<Props> = ({message}) => {
  
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (message.length - 1 > messageIndex) {
      const timer = setTimeout(() => {
        setMessageIndex((prevIndex) => prevIndex + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [messageIndex, message.length]);
  return (
    <div>
      {message[messageIndex]}
      <p>download icon</p>{" "}
    </div>
  );
};
