import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, user, ...rest}) => {
    return (
        <Route 
        {...rest}
        render={props => {
            return user ? <Component {...props} /> : <Redirect to='/login' />
        }} 
        />
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(PrivateRoute)