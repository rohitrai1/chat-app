import React from "react";

function Message(props) {
  return (
    <div className="messagedetail">
      <div>
        <span className="sender">{props.name}</span>
      </div>
      <div>
        <span className="text">{props.text}</span>
      </div>
    </div>
  );
}

export default Message;
