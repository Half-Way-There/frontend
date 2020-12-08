import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  appBarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  appBar: {
    background: "none",
  },
  appBarTitle: {
    flexGrow: "1",
    color: "white",
    fontFamily: "Ubuntu",
    textTransform: "uppercase",
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
  colorText: {
    color: "#f5c71a",
  },
  title: {
    color: "white",
    fontSize: "4rem",
    fontFamily: "Ubuntu",
  },
  container: {
    textAlign: "center",
  },
  containerButton: {
    margin: theme.spacing(1),
    color: "white",
    fontFamily: "Ubuntu",
    fontSize: "1.5rem",
    fontWeight: 600,
    background: "#f5c71a",
    "&:hover": {
      color: "#000000",
      background: "#f5c71a",
    },
  },
}))

const HomeHeader = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>

      <div className={classes.container}>
        <h1 className={classes.title}>
          The most innovative way to meet up
          {" "}
          <br />
          Halfway
          {" "}
          <span className={classes.colorText}>There</span>
        </h1>
        <Button href="/register" className={classes.containerButton}>
          Register
        </Button>
        <Button href="/login" className={classes.containerButton}>
          Login
        </Button>
      </div>
    </div>
  )
}

export default HomeHeader
