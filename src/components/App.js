import React from "react";
import LoginContainer from "../containers/LoginContainer";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import { Route, Switch } from "react-router-dom";
import GuestView from "./GuestView";
import PrivateRoute from "../Auth/PrivateRoute";
// import PublicRoute from '../Auth/PublicRoute'
import DashboardContainer from "../containers/DashboardContainer";
import Home from "./Home";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/guest-view" component={GuestView} />
        <PrivateRoute exact path="/dashboard" component={DashboardContainer} />
      </Switch>
    </div>
  );
};

export default App;
