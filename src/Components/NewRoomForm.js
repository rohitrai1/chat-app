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
      <form onSubmit={this.handleSubmit} className="row sendmessage">
        <input
          onChange={this.handleChange}
          placeholder="Create room here"
          type="text"
          value={this.state.roomName}
          className="col-sm-10"
        />
        <button className="col-sm-2">+</button>
      </form>
    );
  }
}

export default NewRoomForm;
