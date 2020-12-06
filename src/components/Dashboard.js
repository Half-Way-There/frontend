import React, { useState, useEffect } from "react"
import { axiosWithAuth } from "../Auth/axiosWithAuth"
import HeaderContainer from '../containers/HeaderContainer'

// Material-UI Imports:
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import CssBaseline from "@material-ui/core/CssBaseline"
import { IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { Delete, Edit } from "@material-ui/icons"
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

// Material-UI Setting Styles:
const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#17171B',
    fontWeight: 600,
    fontFamily: 'Ubuntu',
    '&:hover': {
      background: '#f5c71a',
      color: 'black'
    }
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  root: {
    minHeight: '100vh',
    background: '#121212',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  gridItem: {
    background: '#F0F0F1'
  },
  fab: {
    color: '#fff',
    background: '#17171B',
    '&:hover': {
      color: 'black',
      background: '#f5c71a'
    }
  },
  deleteContact: {
    color: 'white',
    background: '#17171B',
    '&:hover': {
      color: 'black',
      background: '#f5c71a'
    }
  },
  textField: {
    '& label.Mui-focused': {
      color: 'black',
    },
    // Can't figure out how to make focused border color to #f5c71a
  }
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
  }, [setData])

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
    <>
    <div className={classes.root}>
    <HeaderContainer />
    <Container component="main" maxWidth="md">
      <CssBaseline />
      {/* Main Cards */}
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card className={classes.gridItem}>
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
                    className={classes.textField}
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
                    className={classes.textField}
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
                    className={classes.textField}
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
            <Card className={classes.gridItem}>
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
                  className={classes.textField}
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
                  className={classes.textField}
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
                          <Fab className={classes.fab} size='small' aria-label="edit">
                            <EditIcon />
                          </Fab>
                          </ListItemAvatar>
                          <ListItemText 
                            primary={contact.contactName}
                          />
                          <ListItemSecondaryAction>
                            <IconButton onClick={() => removeContact(contact.addressId)} className={classes.deleteContact} edge="end" size='small' aria-label="delete">
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
    </div>
    </>
  );
};
export default Dashboard;