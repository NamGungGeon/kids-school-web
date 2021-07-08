import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Navigation from "../components/Navigation/Navigation";
import Compare from "./Compare";

const Routers = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/compare"} component={Compare} />
      </Switch>
    </div>
  );
};

export default Routers;
