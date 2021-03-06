import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import toast from 'react-hot-toast'

// Material-UI Imports for styling:
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { auth } from "../firebase"

// Material-UI Copyright Information:
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/login">
        Half-Way-There
      </Link>
      {" "}
      {new Date().getFullYear()}
      .
    </Typography>
  )
}

// Material-UI Styling:
const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  root: {
    minHeight: "100vh",
    // background: "#121212",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = ({ setData }) => {
  // Material-UI Setting Styles:
  const classes = useStyles()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const history = useHistory()

  const onChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  // Create a token then verify on the server side
  const onSubmit = (e) => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(form.email, form.password)
      .then(({ user }) => user.getIdToken().then((idToken) => {
        console.log(user)
        localStorage.setItem("token", idToken)
        axios
          .post(`${process.env.REACT_APP_BACKEND}auth/login`, { idToken }, {
            headers: {
              authorization: idToken,
            },
          })
          .then((res) => {
            toast.success('Welcome Back to Half Way There!')
            setData(res.data)
            history.push("/dashboard")
          })
          .catch((err) => {
            toast.error('Incorrect username or password');
          })
      }))
      .catch((err) => {
        toast.error('This account with this email doesn\'t exist please login first');
      })
  }

  return (
    <>
      <div className={classes.root}>
        <Container component="main" maxWidth="xs">

          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar} />
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form onSubmit={onSubmit} className={classes.form} autoComplete="off">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={form.email}
                onChange={onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={form.password}
                onChange={onChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    Don&#39;t have an account? Register
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
