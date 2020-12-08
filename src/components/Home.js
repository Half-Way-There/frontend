import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import HomeHeader from "./HomeHeader"

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${`${process.env.PUBLIC_URL}assets/backgroundCity.jpg`})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}))

const Home = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <HomeHeader />
    </div>
  )
}

export default Home
