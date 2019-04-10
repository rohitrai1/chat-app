import React, { Component } from "react";

class RoomList extends Component {
  state = {};

  render() {
    return (
      <div>
        {this.props.rooms.map((room, index) => (
          <li key={index}>
            <button onClick={() => this.props.subscribeToRoom(room.id)}>
              {room.name}
            </button>
          </li>
        ))}
      </div>
    );
  }
}

export default RoomList;
