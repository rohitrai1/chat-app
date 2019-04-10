import React, { Component } from "react";
import MessageList from "./Components/MessageList";
import "bootstrap/dist/css/bootstrap.css";
import RoomList from "./Components/RoomList";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import SendMessageForm from "./Components/SendMessageForm";

class App extends Component {
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
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-3 border">
            <RoomList
              subscribeToRoom={this.subscribeToRoom}
              rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            />
          </div>
          <div className="col-9 border">
            <MessageList messages={this.state.messages} />
          </div>
        </div>
        <div className="row">
          <div className="col-3 border"> </div>
          <div className="col-9 border">
            <SendMessageForm sendMessage={this.sendMessage} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
