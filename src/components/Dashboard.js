import React from "react";

// Material-UI Imports:
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// Material-UI Copyright Information:
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/login">
        Half-Way-There
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Material-UI Setting Styles:
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

const Dashboard = () => {
  //Material-UI Declaring Classes
  const classes = useStyles();

  return (
    <>
      <CssBaseline />

      {/* Hero Content */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Welcome back, User!
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          This is your personal dashboard! Quickly control your account
          settings, contact lists, and additional options.
        </Typography>
      </Container>
      {/* End Hero Content */}

      {/* Main Cards */}
      <Container maxWidth='xs' component='main'>
      <Grid 
        container 
        direction='row' 
        justify='space-evenly' 
        alignItems='center' 
        maxWidth="xs" 
        spacing={6}
      >
          <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography component="h1" variant="h5">
                Account Settings
              </Typography>
              <form 
              className={classes.form}
              autocomplete="off"
              >
                {" "}
                {/* Add onSubmit */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  // Add value & onChange
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="radius"
                  label="Default Radius"
                  name="radius"
                  type="integer"
                  // Add value & onChange
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="category"
                  label="Add Category"
                  name="category"
                  // Add value & onChange
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Update
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        </Grid>
        <Grid 
        container 
        direction='row' 
        justify='space-evenly' 
        alignItems='center' 
        maxWidth="xs" 
        spacing={6}
      >
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography component="h1" variant="h5">
                New Contact
              </Typography>
              <form className={classes.form} autocomplete="off">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="contactName"
                  label="Contact Name"
                  name="contactName"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="contactAddress"
                  label="Contact Address"
                  name="contactAddress"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add Contact
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
      {/* End Main Cards */}
    </>
  );
};

export default Dashboard;
