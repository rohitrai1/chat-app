import React, { Component } from "react";
import "./style.css";

class MessageList extends Component {
  state = {};
  render() {
    return (
      <div>
        {this.props.messages.map((message, index) => (
          <div key={index}>
            <div>{message.senderId}</div>
            <div>{message.text}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default MessageList;
