import React from 'react'
import HeaderContainer from '../containers/HeaderContainer'
import LoginContainer from '../containers/LoginContainer'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import { Route, Switch } from 'react-router-dom'
import GuestView from './GuestView'
import PrivateRoute from '../Auth/PrivateRoute'

const App = () => {
    return (
        <div>
            <HeaderContainer />
                <Switch>
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={LoginContainer} />
                    <Route path='/guest-view' component={GuestView} />
                    <PrivateRoute path='/protected' component={GuestView} />
                </Switch>
        </div>
    )
}

export default App