import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, currentUser, ...rest}) => {
    return (
        <Route 
        {...rest}
        render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to='/login' />
        }} 
        />
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(PrivateRoute)