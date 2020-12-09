import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import axiosWithAuth from "../Auth/axiosWithAuth"
import Search from "./Search"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
}))

const SearchResults = ({
  data, searchInfo, setData, setSearch,
}) => {
  // Declaring Material-UI Styles
  const classes = useStyles()

  const [contact, setContact] = useState("")
  const [customContact, setCustomContact] = useState("")
  const [category, setCategory] = useState("")
  const [customCategory, setCustomCategory] = useState("")
  const [contactDropdown, setContactDropdown] = useState(true)
  const [categoryDropdown, setCategoryDropdown] = useState(true)
  const [defaultRadius, setDefaultRadius] = useState()

  // handle Changes

  const handleContactTypeChange = (e) => {
    const { value } = e.target
    setContactDropdown(value === "dropdown")
  }
  const handleContactDropdown = (e) => {
    const { value } = e.target
    setContact(value)
  }
  const handleCategoryTypeChange = (e) => {
    const { value } = e.target
    setCategoryDropdown(value === "dropdown")
  }
  const handleCategoryDropdown = (e) => {
    const { value } = e.target
    setCategory(value)
  }

  const handleSubmit = () => {

  }

  useEffect(() => {
    axiosWithAuth()
      .post("auth/login", {})
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [setData])

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
  ]

  // Function for showing Radius labels
  const valueText = (value) => `${value}`

  return (
    <>
      {searchInfo !== null ? (
          <Search />
      ) : (
        <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open='true'
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
                                <MenuItem
                                  value={cat.category}
                                  key={cat.id}
                                >
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
                            onChange={(e) => setCustomCategory(e.target.value)}
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
                defaultValue={data.user !== null ? data.user.defaultRadius : 3}
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                getAriaValueText={valueText}
                marks={marks}
                min={1}
                max={10}
                value={defaultRadius}
                onChange={(e) => setDefaultRadius(e.target.value)}
                valueLabelDisplay="auto"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
          </Dialog>
      )}
    </>
  )
}

export default SearchResults
