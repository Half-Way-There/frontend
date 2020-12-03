import React, { useState } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

// Material-UI Imports:
import { AppBar, Toolbar, Typography } from "@material-ui/core";
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
    margin: theme.spacing(3),
    minWidth: 500,
  },
}));

const Header = ({ user, clearUser }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [category, setCategory] = useState("");

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

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Half Way There
        </Typography>
        {user === null ? (
          <Button href="/register" color="inherit">
            Register
          </Button>
        ) : null}
        {user === null ? (
          <Button href="/login" color="inherit">
            Login
          </Button>
        ) : null}
        {user !== null ? (
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
                <InputLabel id="demo-dialog-select-label">Contact</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value=""
                  onChange={handleChange}
                  input={<Input />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Contact 1</MenuItem>
                  <MenuItem value={20}>Contact 2</MenuItem>
                  <MenuItem value={30}>Contact 3</MenuItem>
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-dialog-select-label">Category</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value=""
                  onChange={handleChange}
                  input={<Input />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Category 1</MenuItem>
                  <MenuItem value={20}>Category 2</MenuItem>
                  <MenuItem value={30}>Category 3</MenuItem>
                </Select>
              </FormControl>
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
