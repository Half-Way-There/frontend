import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"

// Material-UI Imports:
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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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

const Register = () => {
  // Material-UI Setting Styles:
  const classes = useStyles()

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const onChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  // Creating a firebase user
  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    if (form.password === form.confirmPassword) {
      auth.createUserWithEmailAndPassword(form.email, form.password)
        .then(({ user }) => user.getIdToken().then((idToken) => {
          localStorage.setItem("token", idToken)
          axios
            .post("http://localhost:5001/auth/register", { address: form.address }, {
              headers: {
                authorization: idToken,
              },
            })
            .then(() => {
              auth.signOut()
              localStorage.removeItem("token")
              history.push("/login")
            })
            .catch(() => {
                setError("This email is already associated with an account")
            })
        }))
    } else {
      setError("Passwords must match!")
    }
  }

  return (
    <>
      <div className={classes.root}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar} />
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form onSubmit={onSubmit} className={classes.form} noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    value={form.address}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={form.confirmPassword}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive marketing promotions and updates via email from Half-Way-There."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </>
  )
}

export default Register
