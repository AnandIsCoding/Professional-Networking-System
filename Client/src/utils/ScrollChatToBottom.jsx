import { useEffect, useRef } from "react";

const ScrollChatToBottom = ({ dependency }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dependency]);

  return <div ref={bottomRef} />;
};

export default ScrollChatToBottom;
