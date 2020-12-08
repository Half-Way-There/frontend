import React, { useState, useEffect } from "react"

// Material-UI Imports:
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import CssBaseline from "@material-ui/core/CssBaseline"
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { Delete } from "@material-ui/icons"
import Fab from "@material-ui/core/Fab"
import EditIcon from "@material-ui/icons/Edit"
import axiosWithAuth from "../Auth/axiosWithAuth"

// Material-UI Setting Styles:
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
    background: "#17171B",
    fontWeight: 600,
    fontFamily: "Ubuntu",
    "&:hover": {
      background: "#f5c71a",
      color: "black",
    },
  },
  root: {
    minHeight: "90vh",
    background: "#121212",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    paddingTop: theme.spacing(4),
  },
  gridItem: {
    background: "#F0F0F1",
    height: "80vh",
  },
  fab: {
    color: "#fff",
    background: "#17171B",
    "&:hover": {
      color: "black",
      background: "#f5c71a",
    },
  },
  deleteContact: {
    color: "white",
    background: "#17171B",
    "&:hover": {
      color: "black",
      background: "#f5c71a",
    },
  },
  textField: {
    "& label.Mui-focused": {
      color: "black",
    },
  },
  cardFormat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "center",
  },
  categories: {
    maxHeight: "17vh",
    overflowY: "auto",
    boxShadow: "inset 1px 1px 3px black",
    padding: "8px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    "&::-webkit-scrollbar": {
      width: "10px",
      cursor: "pointer",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },

  },
  listFormat: {
    minHeight: "10vh",
    maxHeight: "37vh",
    overflowY: "auto",
    boxShadow: "inset 1px 1px 3px black",
    padding: "8px",
    "&::-webkit-scrollbar": {
      width: "10px",
      cursor: "pointer",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },
}))

const Dashboard = ({ user, contacts, setData }) => {
  // Material-UI Declaring Classes
  const classes = useStyles()
  const [dense] = useState(false)
  const [settings, setSettings] = useState({
    address: user ? user.address || "" : "",
    defaultRadius: user ? user.defaultRadius || "" : "",
  })
  const [category, setCategory] = useState("")
  const [newContact, setNewContact] = useState({
    contactName: "",
    contactAddress: "",
  })

  useEffect(() => {
    axiosWithAuth()
      .post("auth/login", {})
      .then((res) => {
        setData(res.data)
        setSettings({
          address: res.data.user.address,
          defaultRadius: parseInt(res.data.user.defaultRadius, 10),
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [setData])

  const onChange = (e) => {
    const { name, value } = e.target
    setSettings({
      ...settings,
      [name]: value,
    })
  }

  const newContactOnChange = (e) => {
    const { name, value } = e.target
    setNewContact({
      ...newContact,
      [name]: value,
    })
  }

  const updateSettings = (e) => {
    e.preventDefault()
    axiosWithAuth()
      .post("users/update", {
        user: {
          address: settings.address,
          defaultRadius: settings.defaultRadius,
        },
      })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const addCategory = (e) => {
    e.preventDefault()
    axiosWithAuth()
      .post("users/category", {
        category: {
          category,
          userId: user.uid,
        },
      })
      .then((res) => {
        setData(res.data)
        setCategory("")
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const removeCategory = (id) => {
    axiosWithAuth()
      .delete(`users/category/${id}`, {
        category: {
          id,
        },
      })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const addContact = (e) => {
    e.preventDefault()
    axiosWithAuth()
      .post("contact/add", {
        contact: {
          name: newContact.contactName,
          address: newContact.contactAddress,
          userId: user.uid,
        },
      })
      .then((res) => {
        setData(res.data)
        setNewContact({
          contactName: "",
          contactAddress: "",
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const removeContact = (id) => {
    axiosWithAuth()
      .delete(`contact/remove/${id}`)
      .then((res) => {
        setData(res.data)
        setNewContact({
          contactName: "",
          contactAddress: "",
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <>
      <div className={classes.root}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          {/* Main Cards */}
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Card className={classes.gridItem}>
                  <CardContent className={classes.cardFormat}>
                    <Typography component="h1" variant="h5">
                      Account Settings
                    </Typography>
                    <form
                      className={classes.form}
                      autoComplete="off"
                      onSubmit={updateSettings}
                    >
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
                      Categories
                    </Typography>
                    {user && user.categories.length > 0 ? (
                      <Typography className={classes.categories} component="p">
                        {user.categories.map((each) => (
                          <span
                            style={{
                              border: "1px solid black",
                              borderRadius: "5px",
                              padding: "3px 5px",
                              margin: "0px 3px 5px 3px",
                              boxShadow: "1px 1px 3px black",
                            }}
                            key={each.id}
                          >
                            <span>{each.category}</span>
                            <Delete
                              style={{
                                verticalAlign: "middle",
                                cursor: "pointer",
                              }}
                              onClick={() => removeCategory(each.id)}
                            />
                          </span>
                        ))}
                      </Typography>
                    ) : null}
                    <form
                      className={classes.form}
                      autoComplete="off"
                      onSubmit={addCategory}
                    >
                      <Typography variant="h5">
                        New Category
                      </Typography>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="category"
                        label="Add Category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
                    <form
                      className={classes.form}
                      onSubmit={addContact}
                      autoComplete="off"
                    >
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
                      <Typography variant="h5">
                        Contacts
                      </Typography>
                      <List className={classes.listFormat} dense={dense}>
                        {contacts.map((contact) => (
                          <ListItem key={contact.addressId}>
                            <ListItemAvatar>
                              <Fab
                                className={classes.fab}
                                size="small"
                                aria-label="edit"
                              >
                                <EditIcon />
                              </Fab>
                            </ListItemAvatar>
                            <ListItemText primary={contact.contactName} />
                            <ListItemSecondaryAction>
                              <IconButton
                                onClick={() => removeContact(contact.addressId)}
                                className={classes.deleteContact}
                                edge="end"
                                size="small"
                                aria-label="delete"
                              >
                                <Delete />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
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
  )
}
export default Dashboard
