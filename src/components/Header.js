import React from 'react'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'

const Header = ({ clearUser }) => {

    const history = useHistory()

    const onLogOut = () => {
        localStorage.removeItem('token')
        auth.signOut()
        .then(() => {
            clearUser()
            history.push('/login')
        })
    }

    return (
        <div>
            <nav>
                <a href='/register'>Register</a>
                <a href='/login'>Login</a>
                <button onClick={onLogOut}>
                    Log out
                </button>
            </nav>
        </div>
    )
}

export default Header