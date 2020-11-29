import React, { useState, useEffect } from "react";
// Material-UI Imports:
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Delete, Edit } from "@material-ui/icons";
import { axiosWithAuth } from '../Auth/axiosWithAuth'
import { setData } from "../Store/actions";
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
    flexDirection: "column",
    alignItems: "center",
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
const Dashboard = ({user, contacts, getData}) => {
  //Material-UI Declaring Classes
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [settings, setSettings] = useState({
    address: user ? user.address || "" : "",
    radius: user ? user.defaultRadius || "" : "",
    categories: ""
  })
  const [newContact, setNewContact] = useState({
    contactName: "",
    contactAddress: ""
  })

  useEffect(() => {
    axiosWithAuth().post('auth/login', {})
      .then(res => {
          setData(res.data)
          console.log(res.data)
      })
      .catch(err => {
          console.log(err.message)
      })
    
  }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setSettings({
      ...settings,
      [name]: value
    })
  }
  const newContactOnChange = (e) => {
    console.log(user.uid)
    const { name, value } = e.target
    setNewContact({
      ...newContact,
      [name]: value
    })
  }
  const addContact = e => {
    console.log(user.uid)
    e.preventDefault()
    axiosWithAuth().post('contact/add',{
      
      contact: {
      name: newContact.name,
      address: newContact.address,
      userId: user.uid
    }})
    .then(res => {
      setData(res.data)
    })
    .catch(err => {
      console.log(err.message)
    })
  }
  return (
    <Container component="main" maxWidth="md">
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
      <Container component="main">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography component="h1" variant="h5">
                  Account Settings
                </Typography>
                <form className={classes.form} autoComplete="off">
                  {" "}
                  {/* Add onSubmit */}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    value={settings.address}
                    onChange={onChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="radius"
                    label="Default Radius"
                    name="radius"
                    type="integer"
                    value={settings.defaultRadius}
                    onChange={onChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="category"
                    label="Add Category"
                    name="category"
                    value={settings.categories}
                    onChange={onChange}
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
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography component="h1" variant="h5">
                  New Contact
                </Typography>
                <form className={classes.form} autoComplete='off'>
                  <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='contactName'
                  label='Contact Name'
                  name='contactName'
                  value={newContact.contactName}
                  onChange={newContactOnChange}
                  />
                  <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='contactAddress'
                  label='Contact Address'
                  name='contactAddress'
                  value={newContact.contactAddress}
                  onChange={newContactOnChange}
                  />
                  <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={addContact}
                      >
                        Add Contact
                      </Button>
                </form>
                <div className={classes.demo}>
                  <List dense={dense}>
                    {contacts.map( contact => {
                      return (
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <Edit />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={contact.contactName}
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                              <Delete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                    })}
                  </List>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* End Main Cards */}
      </Container>
    </Container>
  );
};
export default Dashboard;