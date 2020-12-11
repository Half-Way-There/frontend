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
import Places from "./Places"
import MapFromSearchContainer from "../containers/MapFromSearchContainer"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    height: "90vh"
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

const SearchResults = ({ data, searchInfo, setData, setSearch }) => {
  // Declaring Material-UI Styles
  const classes = useStyles()
  const [mapProps, setMapProps] = useState({
    options: { center: { lat: 39.80, lng: -98.55 }, zoom: 4.5 },
    onMount: null,
  })
  const [contact, setContact] = useState("")
  const [customContact, setCustomContact] = useState("")
  const [category, setCategory] = useState("")
  const [customCategory, setCustomCategory] = useState("")
  const [contactDropdown, setContactDropdown] = useState(true)
  const [categoryDropdown, setCategoryDropdown] = useState(true)
  const [open, setOpen] = useState(true)
  const [completedInfo, setCompletedInfo] = useState()
  // eslint-disable-next-line max-len
  const [defaultRadius, setDefaultRadius] = useState(data.user !== null ? data.user.defaultRadius : 3)

  const handleChange = (event, newValue) => {
    setDefaultRadius(newValue)
  }

  const hangleCommittedChange = (event, newValue) => {
    setDefaultRadius(newValue)
  }

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
    const search = {
      home: data.user.address,
      contact: contactDropdown ? contact : customContact,
      radius: defaultRadius,
      category: categoryDropdown ? category : customCategory,
    }
    setOpen(false)
    setMapProps({ ...mapProps, onMount: calcRoute, contact: search.contact, radius: search.radius, category: search.category })
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

  useEffect(() => {
    if (data.user !== null) {
      setDefaultRadius(+data.user.defaultRadius)
    }
  }, [data])

  function calcRoute(map, contact, radius, category) {
    console.log("Calc Route Has Begun")
    const directionsService = new window.google.maps.DirectionsService()
    const directionsRenderer = new window.google.maps.DirectionsRenderer()
    directionsRenderer.setMap(map)

    directionsService.route(
      {
        origin: {
          query: data.user.address,
        },
        destination: {
          query: contact,
        },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        /* IF THE STATUS OF THE RETURNED DATA IS OK THEN CONTINUE WITH TASKS  */
        if (status === "OK") {
          /* SET THE DIRECTIONS ON THE MAP */

          // directionsRenderer.setDirections(response);
          /* CREATE A GOOGLE POLYLINE OBJECT TO BE USED IN MIDPOINT CALCULATION */
          const polyline = new window.google.maps.Polyline({
            path: [],
            strokeColor: "#FF0000",
            strokeWeight: 3,
          })

          /* CREATE BOUNDS AND LEGS OF THE MAP TO BE USED FOR CALCULATING THE MIDPOINT */
          const bounds = new window.google.maps.LatLngBounds()

          const { legs } = response.routes[0]
          /* LOOP THROUGH THE LEGS, THEN STEPS, THEN SEGMENTS TO PUSH EVERY SEGMENT INTO THE POLYLINE OBJECT */
          for (let i = 0; i < legs.length; i++) {
            const { steps } = legs[i]
            for (let j = 0; j < steps.length; j++) {
              const nextSegment = steps[j].path
              for (let k = 0; k < nextSegment.length; k++) {
                polyline.getPath().push(nextSegment[k])
                bounds.extend(nextSegment[k])
              }
            }
          }
          /* TAKE THE POLYLINE OBJECT WHICH WAS JUST ADDED TO AND UTILIZE EPOLY'S FUNCTION GETPOINTATDISTANCE TO DETERMINE THE MIDPOINT (RETURNS A LAT, LONG OBJECT) FUNCTION COMPUTETOTALDISTANCE IS PASSED IN THE RESPONSE FROM GOOGLE TO CALCULATE THE TOTAL DISTANCE OF THE ROUTE AND DIVIDE IT IN TWO TO PROVIDE THE HALFWAY POINT */
          const midPoint = polyline.GetPointAtDistance(computeTotalDistance(response))
          const pointOne = response.routes[0].legs[0].steps[0].start_location
          const pointTwo = response.routes[0].legs[0].steps[response.routes[0].legs[0].steps.length - 1].end_location
          map.panTo(midPoint)
          map.fitBounds(bounds);
          // map.setZoom(10)
          /* CREATE A MARKER FOR THE MIDPOINT TO DISPLAY ON THE MAP */
          const marker = new window.google.maps.Marker({
            position: midPoint,
            label: {
              color: "white", // <= HERE
              fontSize: "11px",
              fontWeight: "900",
              text: "The Middle",
            },
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            },
            map,
          })
          const pointOneMarker = new window.google.maps.Marker({
            position: pointOne,
            label: {
              color: "white", // <= HERE
              fontSize: "11px",
              fontWeight: "900",
              text: "A",
            },
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            },
            map,
          })
          const pointTwoMarker = new window.google.maps.Marker({
            position: pointTwo,
            label: {
              color: "white", // <= HERE
              fontSize: "11px",
              fontWeight: "900",
              text: "B",
            },
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            },
            map,
          })
          // eslint-disable-next-line max-len
          /* CREATE A VARIABLE TO STORE THE REQUEST TO BE MADE TO GOOGLE FOR LOCATIONS MATCHING THE KEYWORD PROVIDED AND IN THE RADIUS PROVIDED SURROUNDING THE MIDPOINT  */
          const request = {
            location: midPoint,
            radius: radius * 1609.34,
            keyword: category,
          }
          /* CREATE THE SERVICE OBJECT THAT WILL DO THE REQUEST THEN MAKE THE REQUEST AND WITH THE RESULTS USE THE INLINE CALLBACK FUNCTION */
          const service = new window.google.maps.places.PlacesService(map)
          service.nearbySearch(request, (results, status) => {
            /* THIS IS THE CALLBACK FUNCTION FOR THE REQUEST WHICH HAS RECIEVED THE RESULTS AND STATUS IF THE STATUS IS OK CONTINUE */
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              /* LOOP THROUGH THE RESULTS FROM THE NEARBY SEARCH TO DO ADDITIONAL TASKS FOR EACH LOCATION FOUND */
              results.forEach((item, index) => {
                /* GOOGLE ONLY ALLOWS 9 RESULTS AT A TIME FOR A GETDETAILS REQUEST SO ONLY GET THE DETAILS OF THE FIRST 9 */
                if (index < 9) {
                  /* REQUEST DETAILS OF EACH PLACE BY PROVIDING AN OBJECT WITH THE PLACE ID AND THE FIELDS REQUESTED */
                  const locationMarker = new window.google.maps.Marker({
                    position: item.geometry.location,
                    title: item.name,
                    map,
                  })
                  service.getDetails({
                    placeId: item.place_id,
                    fields: ["name", "rating", "formatted_phone_number", "formatted_address", "url", "photo", "website"],
                  }, (place, status) => {
                    /* THIS IS THE CALLBACK FUNCTION FOR THE REQUEST */
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                      /* IS THE STATUS IS OK THEN APPEND THE INFORMATION TO THE DOM */
                      // TODO: CREATE AND APPEND DOM ELEMENTS NECESSARY FOR A BOX WITH ALL INFO
                      const placesContainer = document.querySelector("#places")
                      placesContainer.style.width = "55%"
                      placesContainer.style.minWidth = "400px"
                      const resultLocation = document.getElementById("places")

                      const container = document.createElement("div")
                      container.classList.add("location-container")

                      if(place.photos) {
                        const imageContainer = document.createElement("div")
                        imageContainer.classList.add("image-container")
                        imageContainer.style.backgroundImage = `url(${place.photos[0].getUrl()})`
                        container.appendChild(imageContainer)
                      }
                      

                      const textContainer = document.createElement("div")
                      textContainer.classList.add("text-info")

                      const name = document.createElement("p")
                      name.classList.add("name")
                      name.textContent = place.name

                      const url = document.createElement("p")
                      url.classList.add("url")
                      const urlLink = document.createElement("a")
                      urlLink.href = place.website
                      urlLink.textContent = place.website
                      url.appendChild(urlLink)

                      const phone = document.createElement("p")
                      phone.classList.add("phone")
                      phone.textContent = place.formatted_phone_number

                      const address = document.createElement("p")
                      address.classList.add("address")
                      const addressLink = document.createElement("a")
                      addressLink.href = place.url
                      addressLink.textContent = place.formatted_address
                      address.appendChild(addressLink)

                      textContainer.appendChild(name)
                      textContainer.appendChild(url)
                      textContainer.appendChild(phone)
                      textContainer.appendChild(address)
                      container.appendChild(textContainer)
                      resultLocation.appendChild(container)
                    } else {
                      console.log(`error: status=${status}`)
                    }
                  })
                } else {
                  console.log("nope")
                }
              })
            } else {
              // TODO: If there are no results do something
              console.log(status)
            }
          })
        } else {
          window.alert(`Directions request failed due to ${status}`)
        }
      },
    )
  }

  function computeTotalDistance(result) {
    let totalDist = 0
    const myroute = result.routes[0]
    for (let i = 0; i < myroute.legs.length; i++) {
      totalDist += myroute.legs[i].distance.value
    }

    return totalDist / 2
  }
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
      <div className={classes.root}>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
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
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                getAriaValueText={valueText}
                marks={marks}
                min={1}
                max={10}
                value={defaultRadius}
                onChange={handleChange}
                onChangeCommitted={hangleCommittedChange}
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
        <MemoChild {...mapProps} />
        <Places />
      </div>
    </>
  )
}

export default SearchResults

const MemoChild = React.memo(MapFromSearchContainer)
