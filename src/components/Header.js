import React, { useState } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

// Material-UI Imports:
import { AppBar, FormControlLabel, Radio, RadioGroup, TextField, Toolbar, Typography } from "@material-ui/core";
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

// Material-UI Styling:
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootTwo: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  title: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
}));

const Header = ({ data, clearUser }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false)
  const [contact, setContact] = useState("")
  const [customContact, setCustomContact] = useState("")
  const [category, setCategory] = useState("")
  const [customCategory, setCustomCategory] = useState("")
  const [contactDropdown, setContactDropdown] = useState(true)
  const [categoryDropdown, setCategoryDropdown] = useState(true)

  const handleChange = (event) => {
    setContact("");
    setCategory("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
    const { value } = e.target
    setContactDropdown(value === "dropdown" ? true : false)
  }

  const handleCategoryTypeChange = (e) => {
    const { value } = e.target
    setCategoryDropdown(value === "dropdown" ? true : false)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Half Way There
        </Typography>
        {data.user === null ? (
          <Button href="/register" color="inherit">
            Register
          </Button>
        ) : null}
        {data.user === null ? (
          <Button href="/login" color="inherit">
            Login
          </Button>
        ) : null}
        {data.user !== null ? (
          <Button onClick={onLogOut} color="inherit">
            Log out
          </Button>
        ) : null}
        <Button onClick={handleClickOpen} color='inherit'>Search</Button>
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
                  <TextField id="standard-basic" label="Address" value={customContact} onChange={e => setCustomContact(e.target.value)} />
                ) : (
                  <RadioGroup row aria-label="contactType" labelId="demo-dialog-type-label"  name="contactType" value={customContact} onChange={handleContactTypeChange}>
                    <FormControlLabel value="dropdown" control={<Radio checked={contactDropdown} />} label="Saved Contacts" />
                    <FormControlLabel value="custom" control={<Radio checked={!contactDropdown} />} label="Custom Contact" />
                  </RadioGroup>
                )}
              </FormControl>
              <FormControl className={classes.formControl}>
              
                {contactDropdown ? (
                  <>
                    <InputLabel id="demo-dialog-select-label">Contact</InputLabel>
                    <Select
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      value=""
                      onChange={handleChange}
                      input={<Input />}
                    >
                      {data.contacts.map(contact => {
                        return <MenuItem value={contact.address}>{contact.contactName}</MenuItem>
                      })}
                    </Select>
                  </>
                ) : (
                  <TextField id="standard-basic" label="Address" />
                )}
              </FormControl>
              {data.user ? (
              <FormControl className={classes.formControl}>
                { data.user.categories.length === 0 ? (
                  <TextField id="standard-basic" label="Category" />
                ) : (
                  <RadioGroup row aria-label="contactType" labelId="demo-dialog-type-label"  name="contactType" value={customContact} onChange={handleCategoryTypeChange}>
                    <FormControlLabel value="dropdown" control={<Radio checked={categoryDropdown} />} label="Saved Categories" />
                    <FormControlLabel value="custom" control={<Radio checked={!categoryDropdown} />} label="Custom Category" />
                  </RadioGroup>
                )}
              </FormControl>
              ) : null}
              {data.user ? (
                <FormControl className={classes.formControl}>
                  {categoryDropdown ? (
                    <>
                      <InputLabel id="demo-dialog-select-label-2">Category</InputLabel>
                      <Select
                        labelId="demo-dialog-select-label-2"
                        id="demo-dialog-select-cat"
                        value=""
                        onChange={handleChange}
                        input={<Input />}
                      >
                        {data.user.categories.map(category => {
                          return <MenuItem value={category.category}>{category.category}</MenuItem>
                        })}
                      </Select>
                    </>
                  ) : (
                    <TextField id="standard-basic" label="Category" />
                  )}
                </FormControl>
              ) : null}
            </form>
            <div className={classes.rootTwo}>
              <Typography id="input-slider" gutterBottom>
                Radius
              </Typography>
              <Slider
              defaultValue={0.00000005}
              
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              marks
              min={1}
              max={10}
              valueLabelDisplay="auto"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
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
  );
};

export default Header;
