import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  withRouter
} from "react-router-dom";
import UserLoginForm from "./Components/UserLoginForm";
import ChatApp from "./ChatApp";
import PrivateRoute from "./Components/PrivateRoute";

class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return <UserLoginForm />;
            }}
          />

          <PrivateRoute path="/chatapp" exact component={ChatApp} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
