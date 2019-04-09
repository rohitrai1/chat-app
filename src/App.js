import React, { Component } from "react";
import MessageList from "./Components/MessageList";
import "bootstrap/dist/css/bootstrap.css";
import RoomList from "./Components/RoomList";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

class App extends Component {
  state = {
    messages: []
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
        currentUser.subscribeToRoom({
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
  render() {
    return (
      <div className="row">
        <div className="col-3 border">
          <RoomList />
        </div>
        <div className="col-9 border">
          <MessageList messages={this.state.messages} />
        </div>
      </div>
    );
  }
}
export default App;
