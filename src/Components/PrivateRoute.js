import React from "react";
import { Redirect, Route } from "react-router-dom";
import ChatApp from "../ChatApp";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (sessionStorage.getItem("loggedIn") === "loggedIn") {
          return <Component />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
