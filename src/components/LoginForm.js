import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import fetchLogin from '../Store/actions'

const LoginForm = (props) => {

    useEffect(() => {
        props.fetchLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        data: state.data
    }
}

export default connect(mapStateToProps, { fetchLogin })(LoginForm)
