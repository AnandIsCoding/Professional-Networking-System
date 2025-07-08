import React from "react";

function Card(props) {
  const {} = props;
  return (
    <div
      className={`w-full h-[100%] bg-white flex flex-col border-1 border-gray-200 rounded-md ${
        props?.padding ? "p-4" : "p-0"
      } `}
    >
      {props?.children}
    </div>
  );
}

export default Card;
