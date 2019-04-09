import React, { Component } from "react";
import "./style.css";
import Message from "./Message";

class MessageList extends Component {
  state = {};
  render() {
    return (
      <div>
        {this.props.messages.map((message, index) => (
          <Message key={index} name={message.senderId} text={message.text} />
        ))}
      </div>
    );
  }
}

export default MessageList;
