import React, { Component } from "react";

class RoomList extends Component {
  state = {};
  render() {
    return (
      <div>
        {this.props.rooms.map((room, index) => (
          <li key={index}>
            <a>{room.name}</a>
          </li>
        ))}
      </div>
    );
  }
}

export default RoomList;
