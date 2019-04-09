import React, { Component } from "react";
import MessageList from "./Components/MessageList";
import "bootstrap/dist/css/bootstrap.css";
import RoomList from "./Components/RoomList";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import SendMessageForm from "./Components/SendMessageForm";

class App extends Component {
  state = {
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

        this.currentUser.subscribeToRoom({
          roomId: "31208032",
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            }
          }
        });
      })
      .catch(err => {
        console.log("Error on connection", err);
      });
  }

  sendMessage = text => {
    this.currentUser.sendMessage({
      text,
      roomId: "31208032"
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-3 border">
            <RoomList
              rooms={[...this.state.joinableRooms, ...this.state.joinableRooms]}
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
