import React, { useState } from 'react'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

// Material-UI Imports for styling:
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HeaderContainer from '../containers/HeaderContainer';

// Material-UI Copyright Information:
function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/login">
          Half-Way-There
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  // Material-UI Styling:
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    root: {
      minHeight: '100vh',
      background: '#121212',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  

const Login = ({ setData }) => {

    // Material-UI Setting Styles:
    const classes = useStyles()

    const [ form, setForm ] = useState({
        email: '',
        password: ''
    })
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    const onChange = e => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    // Create a token then verify on the server side
    const onSubmit = e => {
        e.preventDefault()
        setLoading(true)
        auth.signInWithEmailAndPassword(form.email, form.password)
        .then(({user}) => {
            return user.getIdToken().then((idToken) => {
                localStorage.setItem('token', idToken)
                axios
                  .post('http://localhost:5001/auth/login', { idToken }, {
                      headers: {
                        authorization: idToken
                      }
                  })
                  .then(res => {
                      setData(res.data)
                      history.push('/dashboard')
                  })
                  .catch(err => {
                      setError(err.message)
                  })
            })
        })
        .catch(err => {
          console.log(err)
        })
    }

    return (
        <>
          <div className={classes.root}>
            <HeaderContainer />
            <Container component='main' maxWidth='xs'>
              
                <CssBaseline />
                {error ? <p>{error}</p> : null}
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Login
                    </Typography>
                <form onSubmit={onSubmit} className={classes.form} autoComplete='off'>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        value={form.email}
                        onChange={onChange}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        value={form.password}
                        onChange={onChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember me'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href='/forgot-password' variant='body2'>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='/register' variant='body2'>
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
      </div>
    </>
    )
}

export default Login
