import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const PublicRoute = ({ component: Component, user, ...rest}) => {
    return (
        <Route 
        {...rest}
        render={props => {
            return localStorage.getItem('token') ? <Component {...props} /> : <Redirect to='/dashboard' />
        }} 
        />
    )
}

const mapStateToProps = state => ({
    user: state.data.user
})

export default connect(mapStateToProps)(PublicRoute)