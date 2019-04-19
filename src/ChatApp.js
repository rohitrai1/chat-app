import React, { Component } from "react";
import MessageList from "./Components/MessageList";
import "bootstrap/dist/css/bootstrap.css";
import RoomList from "./Components/RoomList";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import SendMessageForm from "./Components/SendMessageForm";
import NewRoomForm from "./Components/NewRoomForm";
import "./Components/style.css";

class ChatApp extends Component {
  state = {
    roomId: null,
    messages: [],
    joinableRooms: [],
    joinedRooms: []
  };

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:14a52dea-6584-4314-bd13-3d27265b6e63",
      userId: "rovit",
      tokenProvider: new TokenProvider({
        url:
          "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/14a52dea-6584-4314-bd13-3d27265b6e63/token"
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => {
        console.log("Error on connection", err);
      });
  }
  getRooms = () => {
    console.log("current", this.currentUser.rooms);
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms: joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => {
        console.log(`Error getting joinable rooms: ${err}`);
      });
  };
  subscribeToRoom = roomId => {
    this.setState({
      messages: []
    });
    this.currentUser
      .subscribeToRoom({
        roomId,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id
        });
        this.getRooms();
      });
  };

  sendMessage = text => {
    if (!this.state.roomId) {
      alert("First select a room from the room list");
    } else {
      this.currentUser.sendMessage({
        text,
        roomId: this.state.roomId
      });
    }
  };

  createRoom = name => {
    this.currentUser
      .createRoom({
        name,
        private: false,
        addUserIds: ["rovit"],
        customData: { foo: 42 }
      })
      .then(room => {
        this.subscribeToRoom(room.id);
      })
      .catch(err => {
        console.log(`Error creating room ${err}`);
      });
  };

  render() {
    console.log("====chat app======", sessionStorage.getItem("loggedIn"));
    return (
      <div id="wrap">
        <div className="row row1">
          <div className="col-3 border rooms">
            <RoomList
              roomId={this.state.roomId}
              subscribeToRoom={this.subscribeToRoom}
              rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            />
          </div>
          <div className="col-9 border messagelist">
            <MessageList
              roomId={this.state.roomId}
              messages={this.state.messages}
            />
          </div>
        </div>
        <div className="row row2">
          <div className="col-3 border">
            <NewRoomForm createRoom={this.createRoom} />
          </div>
          <div className="col-9 border">
            <SendMessageForm sendMessage={this.sendMessage} />
          </div>
        </div>
      </div>
    );
  }
}
export default ChatApp;
