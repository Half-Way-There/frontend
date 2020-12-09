import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// Material-UI Imports:
import {
  AppBar,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import { auth } from "../firebase";
// Material-UI Styling:
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "10vh",
  },
  rootTwo: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  title: {
    flexGrow: "1",
    color: "white",
    fontFamily: "Ubuntu",
    textTransform: "uppercase",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
  colorText: {
    color: "#f5c71a",
  },
  appBarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  appBar: {
    background: "black",
    boxShadow: "1px 1px 3px black",
    position: "relative",
    zIndex: 1,
  },
  appBarButton: {
    color: "white",
    fontFamily: "Ubuntu",
    fontWeight: 600,
    fontSize: "1rem",
    "&:hover": {
      color: "#f5c71a",
    },
  },
}));
const Header = ({ data, clearUser, setSearch }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [customContact, setCustomContact] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [contactDropdown, setContactDropdown] = useState(true);
  const [categoryDropdown, setCategoryDropdown] = useState(true);
  const [defaultRadius, setDefaultRadius] = useState(data.user !== null ? data.user.defaultRadius : 3);

  useEffect(() => {
    if (data.user !== null) {
      setDefaultRadius(+data.user.defaultRadius)
    }
  }, [data])


  // Marks for Slider labels
  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 7,
      label: "7",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 9,
      label: "9",
    },
    {
      value: 10,
      label: "10",
    },
  ];

  // Function for showing Radius labels
  const valueText = (value) => `${value}`;

  const handleSubmit = () => {
    const search = {
      home: data.user.address,
      contact: contactDropdown ? contact : customContact,
      radius: defaultRadius,
      category: categoryDropdown ? category : customCategory,
    }
    setSearch(search)
  }

  const handleChange = (event, newValue) => {
    setDefaultRadius(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setContact("");
    setCustomContact("");
    setCategory("");
    setCustomCategory("");
    setContactDropdown(true);
    setCategoryDropdown(true);
    setDefaultRadius(data.user.defaultRadius);
  };
  const history = useHistory();
  const onLogOut = () => {
    localStorage.removeItem("token");
    auth.signOut().then(() => {
      clearUser();
      history.push("/login");
    });
  };
  const handleContactTypeChange = (e) => {
    const { value } = e.target;
    setContactDropdown(value === "dropdown");
  };
  const handleContactDropdown = (e) => {
    const { value } = e.target;
    setContact(value);
  };
  const handleCategoryTypeChange = (e) => {
    const { value } = e.target;
    setCategoryDropdown(value === "dropdown");
  };
  const handleCategoryDropdown = (e) => {
    const { value } = e.target;
    setCategory(value);
  };
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar} elevation={0}>
          <Toolbar className={classes.appBarWrapper}>
            <h1 className={classes.title}>
              Halfway <span className={classes.colorText}>There</span>
            </h1>
            {data.user === null ? (
              <Button
                className={classes.appBarButton}
                href="/register"
                color="inherit"
              >
                Register
              </Button>
            ) : null}
            {data.user === null ? (
              <Button
                className={classes.appBarButton}
                href="/login"
                color="inherit"
              >
                Login
              </Button>
            ) : null}
            {data.user !== null ? (
              <Button
                className={classes.appBarButton}
                onClick={onLogOut}
                color="inherit"
              >
                Log out
              </Button>
            ) : null}
            {data.user !== null ? (
              <Button
                className={classes.appBarButton}
                onClick={handleClickOpen}
                color="inherit"
              >
                Search
              </Button>
            ) : null}
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>New Search</DialogTitle>
              <DialogContent>
                <form className={classes.container}>
                  <FormControl className={classes.formControl}>
                    {data.contacts.length === 0 ? (
                      <TextField
                        id="standard-basic"
                        label="Address"
                        value={customContact}
                        onChange={(e) => setCustomContact(e.target.value)}
                      />
                    ) : (
                      <>
                        <RadioGroup
                          row
                          aria-label="contactType"
                          labelid="demo-dialog-type-label"
                          name="contactType"
                          value={customContact}
                          onChange={handleContactTypeChange}
                        >
                          <FormControlLabel
                            value="dropdown"
                            control={<Radio checked={contactDropdown} />}
                            label="Saved Contacts"
                          />
                          <FormControlLabel
                            value="custom"
                            control={<Radio checked={!contactDropdown} />}
                            label="Custom Contact"
                          />
                        </RadioGroup>
                        <FormControl className={classes.formControl}>
                          {contactDropdown ? (
                            <>
                              <InputLabel id="demo-dialog-select-label">
                                Contact
                              </InputLabel>
                              <Select
                                labelid="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={contact}
                                onChange={handleContactDropdown}
                                input={<Input />}
                              >
                                {data.contacts.map((person) => (
                                  <MenuItem
                                    value={person.address}
                                    key={person.addressId}
                                  >
                                    {person.contactName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </>
                          ) : (
                            <TextField
                              value={customContact}
                              id="standard-basic"
                              label="Address"
                              onChange={(e) => setCustomContact(e.target.value)}
                            />
                          )}
                        </FormControl>
                      </>
                    )}
                  </FormControl>

                  {data.user ? (
                    <FormControl className={classes.formControl}>
                      {data.user.categories.length === 0 ? (
                        <TextField
                          id="standard-basic"
                          label="Category"
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                        />
                      ) : (
                        <>
                          <RadioGroup
                            row
                            aria-label="contactType"
                            labelid="demo-dialog-type-label"
                            name="contactType"
                            value={customContact}
                            onChange={handleCategoryTypeChange}
                          >
                            <FormControlLabel
                              value="dropdown"
                              control={<Radio checked={categoryDropdown} />}
                              label="Saved Categories"
                            />
                            <FormControlLabel
                              value="custom"
                              control={<Radio checked={!categoryDropdown} />}
                              label="Custom Category"
                            />
                          </RadioGroup>
                          <FormControl className={classes.formControl}>
                            {categoryDropdown ? (
                              <>
                                <InputLabel id="demo-dialog-select-label-2">
                                  Category
                                </InputLabel>
                                <Select
                                  labelid="demo-dialog-select-label-2"
                                  id="demo-dialog-select-cat"
                                  value={category}
                                  onChange={handleCategoryDropdown}
                                  input={<Input />}
                                >
                                  {data.user.categories.map((cat) => (
                                    <MenuItem value={cat.category} key={cat.id}>
                                      {cat.category}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </>
                            ) : (
                              <TextField
                                id="standard-basic"
                                label="Category"
                                value={customCategory}
                                onChange={(e) =>
                                  setCustomCategory(e.target.value)
                                }
                              />
                            )}
                          </FormControl>
                        </>
                      )}
                    </FormControl>
                  ) : null}
                </form>
                <div className={classes.rootTwo}>
                  <Typography id="input-slider" gutterBottom>
                    Radius
                  </Typography>
                  <Slider
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    getAriaValueText={valueText}
                    marks={marks}
                    min={1}
                    max={10}
                    value={data.user !== null ? data.user.defaultRadius : 3}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};
export default Header;
