import React, { Component } from "react";

class NewRoomForm extends Component {
  state = {
    roomName: ""
  };

  handleChange = event => {
    this.setState({
      roomName: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({
      roomName: ""
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            placeholder="Create room here"
            type="text"
            value={this.state.roomName}
          />
          <button>+</button>
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
