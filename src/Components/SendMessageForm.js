import React, { Component } from "react";

class SendMessageForm extends Component {
  handleChange = event => {
    this.setState({
      message: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  };

  state = {
    message: ""
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            placeholder="Type your message here and hit Enter"
            type="text"
            value={this.state.message}
          />
        </form>
      </div>
    );
  }
}

export default SendMessageForm;
