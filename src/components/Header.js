import React from 'react'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'

// Material-UI Imports:
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// Material-UI Styling:
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));

const Header = ({ clearUser }) => {

    const classes = useStyles()

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

        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' className={classes.title}>
                    Half Way There
                </Typography>
                <Button href='/register' color='inherit'>
                    Register
                </Button>
                <Button href='/login' color='inherit'>
                    Login
                </Button>
                <Button onClick={onLogOut} color='inherit'>
                    Log out
                </Button>
            </Toolbar>
        </AppBar>

        // <div>
        //     <nav>
        //         <a href='/register'>Register</a>
        //         <a href='/login'>Login</a>
        //         <button onClick={onLogOut}>
        //             Log out
        //         </button>
        //     </nav>
        // </div>
    )
}

export default Header