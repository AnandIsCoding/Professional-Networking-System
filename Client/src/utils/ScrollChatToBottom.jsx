import { useEffect, useRef } from "react";

const ScrollChatToBottom = () => {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return <div ref={bottomRef} />;
};

export default ScrollChatToBottom;
