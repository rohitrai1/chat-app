import React, { Component } from "react";

import Message from "./Message";

class MessageList extends Component {
  state = {};
  render() {
    if (!this.props.roomId) {
      return (
        <div align="center" className="join ">
          <h1>&larr;Join a room</h1>
        </div>
      );
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
