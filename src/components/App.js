import React from "react"
import { Route, Switch } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import PrivateRoute from "../Auth/PrivateRoute"
import HeaderContainer from "../containers/HeaderContainer"
import Register from "./Register"
import LoginContainer from "../containers/LoginContainer"
import DashboardContainer from "../containers/DashboardContainer"
import ForgotPassword from "./ForgotPassword"
import GuestView from "./GuestView"
import Home from "./Home"
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
    <Toaster 
        position='bottom'
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              border: '2px solid #62d347',
            },
          },
          error: {
            style: {
              border: '2px solid #f94f4f'
            }
          }
        }}
      />
  </div>
)

export default App
