import React, { useState, useEffect } from "react"
import { axiosWithAuth } from "../Auth/axiosWithAuth"

// Material-UI Imports:
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import CssBaseline from "@material-ui/core/CssBaseline"
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { Delete, Edit } from "@material-ui/icons"

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

const Dashboard = ({user, contacts, setData}) => {
  //Material-UI Declaring Classes
  const classes = useStyles()
  const [dense, setDense] = useState(false)
  const [settings, setSettings] = useState({
    address: user ? user.address || "" : "",
    defaultRadius: user ? user.defaultRadius || "" : ""
  })
  const [category, setCategory] = useState("")
  const [newContact, setNewContact] = useState({
    contactName: "",
    contactAddress: ""
  })

  useEffect(() => {
    axiosWithAuth().post("auth/login", {})
      .then(res => {
          setData(res.data)
          setSettings({
            address: res.data.user.address,
            defaultRadius: parseInt(res.data.user.defaultRadius, 10)
          })
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
    const { name, value } = e.target
    setNewContact({
      ...newContact,
      [name]: value
    })
  }

  const updateSettings = e => {
    e.preventDefault()
    axiosWithAuth().post("users/update", { 
      user: {
        address: settings.address,
        defaultRadius: settings.defaultRadius
      }
    })
    .then(res => {
      setData(res.data)
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  const addCategory = e => {
    e.preventDefault()
    axiosWithAuth().post("users/category", {
      category: {
        category: category,
        userId: user.uid
      }
    })
    .then(res => {
      setData(res.data)
      setCategory("")
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  const removeCategory = (id) => {
    axiosWithAuth().delete(`users/category/${id}`, { 
      category: {
        id: id
    }})
    .then(res => {
      setData(res.data)
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  const addContact = e => {
    e.preventDefault()
    axiosWithAuth().post("contact/add", {
      contact: {
      name: newContact.contactName,
      address: newContact.contactAddress,
      userId: user.uid
    }})
    .then(res => {
      setData(res.data)
      setNewContact({
        contactName: "",
        contactAddress: ""
      })
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  const removeContact = id => {
    axiosWithAuth().delete(`contact/remove/${id}`)
    .then(res => {
      setData(res.data)
      setNewContact({
        contactName: "",
        contactAddress: ""
      })
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
          component="h3"
          variant="h4"
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
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography component="h1" variant="h5">
                  Account Settings
                </Typography>
                <form className={classes.form} autoComplete="off" onSubmit={updateSettings}>
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
                    id="defaultRadius"
                    label="Default Radius"
                    name="defaultRadius"
                    type="integer"
                    value={settings.defaultRadius}
                    onChange={onChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Update Settings
                  </Button>
                </form>
                <Typography component="h1" variant="h5">
                  Search Categories
                </Typography>
                {user && user.categories.length > 0  ? <Typography component="p">
                  Current Categories: {user.categories.map(each => <span style={{ border: "1px solid black", borderRadius: "5px", padding: "3px 5px", boxShadow: "1px 1px 3px black" }} key={each.id}><span>{each.category}</span><Delete style={{ verticalAlign: "middle", cursor: "pointer"}} onClick={() => removeCategory(each.id)} /></span>)}
                </Typography> : null}
                <form className={classes.form} autoComplete="off" onSubmit={addCategory}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="category"
                    label="Add Category"
                    name="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Add Category
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
                <form className={classes.form} onSubmit={addContact} autoComplete="off">
                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="contactName"
                  label="Contact Name"
                  name="contactName"
                  value={newContact.contactName}
                  onChange={newContactOnChange}
                  />
                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="contactAddress"
                  label="Contact Address"
                  name="contactAddress"
                  value={newContact.contactAddress}
                  onChange={newContactOnChange}
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
                <div className={classes.demo}>
                  <List dense={dense}>
                    {contacts.map( contact => {
                      return (
                        <ListItem key={contact.addressId}>
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
                              <Delete onClick={() => removeContact(contact.addressId)} />
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