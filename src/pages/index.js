import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Navigation from "../components/Navigation/Navigation";
import Compare from "./Compare";
import Report from "./Report";
import withBoundary from "../hoc/withErrorBoundary";

const Routers = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/compare"} component={Compare} />
        <Route exact path={"/report"} component={Report} />
        <Route
          render={({ history }) => {
            history.replace("/");
          }}
        />
      </Switch>
    </div>
  );
};

export default withBoundary(Routers);
