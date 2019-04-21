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
import UserSignUpForm from "./Components/UserSignUpForm";
import { homedir } from "os";
import Home from "./Components/Home";

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
          <Route path="/signup" exact component={UserSignUpForm} />
          <Route path="/home" exact component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
