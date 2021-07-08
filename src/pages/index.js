import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Navigation from "../components/Navigation/Navigation";

const Routers = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path={"/"} component={Home} />
      </Switch>
    </div>
  );
};

export default Routers;
