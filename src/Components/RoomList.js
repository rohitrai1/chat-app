import React, { Component } from "react";

class RoomList extends Component {
  state = {};

  render() {
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id);
    return (
      <div className="row roomlist">
        <div className="offset-sm-2">
          <h2>Rooms:</h2>
          {orderedRooms.map((room, index) => (
            <li
              key={index}
              className={
                this.props.roomId === room.id
                  ? "navigation-active"
                  : "navigation"
              }
            >
              <button
                id="link"
                onClick={() => this.props.subscribeToRoom(room.id)}
              >
                {room.name}
              </button>
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default RoomList;
