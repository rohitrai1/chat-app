import React, { Component } from "react";

class RoomList extends Component {
  state = {};

  render() {
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id);
    return (
      <div className="roomlist">
        <div className="row">
          <div className="col-12">
            <h2>Rooms:</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
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
      </div>
    );
  }
}

export default RoomList;
