import React, { Component } from "react";
import "./style.css";
import Message from "./Message";

class MessageList extends Component {
  state = {};
  render() {
    if (!this.props.roomId) {
      return <div>Join a room</div>;
    } else {
      return (
        <div>
          {this.props.messages.map((message, index) => (
            <Message key={index} name={message.senderId} text={message.text} />
          ))}
        </div>
      );
    }
  }
}

export default MessageList;
