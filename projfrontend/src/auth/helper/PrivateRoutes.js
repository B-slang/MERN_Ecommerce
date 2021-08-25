import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

// form reactrouterdom for the restriction on routes

const PrivateRoute = ({ component: Component, ...rest }) => {
  // let auth = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutheticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;