import React, { Component } from "react";

class RoomList extends Component {
  state = {};

  render() {
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id);
    return (
      <div>
        {orderedRooms.map((room, index) => (
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
