import React from "react";

function Message(props) {
  return (
    <div>
      <div>{props.name}</div>
      <div>{props.text}</div>
    </div>
  );
}

export default Message;
