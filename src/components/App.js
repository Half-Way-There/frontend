import React from "react"
import { Route, Switch } from "react-router-dom"
import LoginContainer from "../containers/LoginContainer"
import Register from "./Register"
import ForgotPassword from "./ForgotPassword"
import GuestView from "./GuestView"
import PrivateRoute from "../Auth/PrivateRoute"
import DashboardContainer from "../containers/DashboardContainer"
import Home from "./Home"
import HeaderContainer from "../containers/HeaderContainer"
import SearchResultsContainer from "../containers/SearchResultsContainer"

const App = () => (
  <div>
    <HeaderContainer />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path="/guest-view" component={GuestView} />
      <PrivateRoute exact path="/dashboard" component={DashboardContainer} />
      <PrivateRoute exact path="/search-results" component={SearchResultsContainer} />
    </Switch>
  </div>
)

export default App
