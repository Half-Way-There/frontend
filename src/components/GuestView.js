import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Map from './Map'
import MapRequest from './MapRequest'
import Places from './Places'
import { auth } from '../firebase'

const StyledApp = styled.div`
  background-color: #121212;
  display: flex;
`

function App() {

  const [mapProps, setMapProps] = useState({
    options: { center: { lat: 39.80, lng: -98.55 }, zoom: 4.5 },
    onMount: null, 
  })
  
  const [formData, setFormData] = useState({
    firstAddress: '',
    secondAddress: '',
    category: '',
    radius: ''
  })

  const onInputChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value, 
    })
  }

  function submitInfo() {
    setMapProps({...mapProps, onMount: calcRoute})
    setFormData({
      firstAddress: '',
      secondAddress: '',
      category: '',
      radius: ''
    })
  }

  function calcRoute(map) {
    console.log("Calc Route Has Begun")
    const directionsService = new window.google.maps.DirectionsService()
    const directionsRenderer = new window.google.maps.DirectionsRenderer()
    directionsRenderer.setMap(map);

    directionsService.route(
      {
        origin: {
          query: formData.firstAddress,
        },
        destination: {
          query: formData.secondAddress,
        },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        /* IF THE STATUS OF THE RETURNED DATA IS OK THEN CONTINUE WITH TASKS  */
        if (status === "OK") {
          /* SET THE DIRECTIONS ON THE MAP */
          
          // directionsRenderer.setDirections(response);
          /* CREATE A GOOGLE POLYLINE OBJECT TO BE USED IN MIDPOINT CALCULATION */
          let polyline = new window.google.maps.Polyline({
            path: [],
            strokeColor: '#FF0000',
            strokeWeight: 3
          });
  
          /* CREATE BOUNDS AND LEGS OF THE MAP TO BE USED FOR CALCULATING THE MIDPOINT */
          let bounds = new window.google.maps.LatLngBounds();
          
          let legs = response.routes[0].legs;
          /* LOOP THROUGH THE LEGS, THEN STEPS, THEN SEGMENTS TO PUSH EVERY SEGMENT INTO THE POLYLINE OBJECT */
          for (let i = 0; i <legs.length; i++) {
            let steps = legs[i].steps;
            for (let j = 0; j <steps.length; j++) {
              let nextSegment = steps[j].path;
              for (let k = 0; k < nextSegment.length; k++) {
                polyline.getPath().push(nextSegment[k]);
                bounds.extend(nextSegment[k]);
              }
            }
          }
          /* TAKE THE POLYLINE OBJECT WHICH WAS JUST ADDED TO AND UTILIZE EPOLY'S FUNCTION GETPOINTATDISTANCE TO DETERMINE THE MIDPOINT (RETURNS A LAT, LONG OBJECT) FUNCTION COMPUTETOTALDISTANCE IS PASSED IN THE RESPONSE FROM GOOGLE TO CALCULATE THE TOTAL DISTANCE OF THE ROUTE AND DIVIDE IT IN TWO TO PROVIDE THE HALFWAY POINT */
          const midPoint = polyline.GetPointAtDistance(computeTotalDistance(response));
          const pointOne = response.routes[0].legs[0].steps[0]['start_location']
          const pointTwo = response.routes[0].legs[0].steps[response.routes[0].legs[0].steps.length - 1]['end_location']
          map.panTo(midPoint);
          map.setZoom(10);
          /* CREATE A MARKER FOR THE MIDPOINT TO DISPLAY ON THE MAP */
          let marker = new window.google.maps.Marker({
            position: midPoint,
            label: {
              color: 'white', // <= HERE
              fontSize: '11px',
              fontWeight: '900',
              text: 'The Middle'
            },
            icon: {                             
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"  
            },
            map: map
          });
          let pointOneMarker = new window.google.maps.Marker({
            position: pointOne,
            label: {
              color: 'white', // <= HERE
              fontSize: '11px',
              fontWeight: '900',
              text: 'A'
            },
            icon: {                             
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"  
            },
            map: map
          });
          let pointTwoMarker = new window.google.maps.Marker({
            position: pointTwo,
            label: {
              color: 'white', // <= HERE
              fontSize: '11px',
              fontWeight: '900',
              text: 'B'
            },
            icon: {                             
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"  
            },
            map: map
          });
          /* CREATE A VARIABLE TO STORE THE REQUEST TO BE MADE TO GOOGLE FOR LOCATIONS MATCHING THE KEYWORD PROVIDED AND IN THE RADIUS PROVIDED SURROUNDING THE MIDPOINT  */
          let request = {
            location: midPoint,
            radius: formData.radius * 1609.34,
            keyword: formData.category
          };
          /* CREATE THE SERVICE OBJECT THAT WILL DO THE REQUEST THEN MAKE THE REQUEST AND WITH THE RESULTS USE THE INLINE CALLBACK FUNCTION */
          let service = new window.google.maps.places.PlacesService(map);
          service.nearbySearch(request, (results, status) => {
            /* THIS IS THE CALLBACK FUNCTION FOR THE REQUEST WHICH HAS RECIEVED THE RESULTS AND STATUS IF THE STATUS IS OK CONTINUE*/
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              /* LOOP THROUGH THE RESULTS FROM THE NEARBY SEARCH TO DO ADDITIONAL TASKS FOR EACH LOCATION FOUND*/
              results.forEach((item, index) => {
                /* GOOGLE ONLY ALLOWS 9 RESULTS AT A TIME FOR A GETDETAILS REQUEST SO ONLY GET THE DETAILS OF THE FIRST 9 */
                  if(index < 9) {
                    /* REQUEST DETAILS OF EACH PLACE BY PROVIDING AN OBJECT WITH THE PLACE ID AND THE FIELDS REQUESTED */
                    let locationMarker = new window.google.maps.Marker({
                      position: item.geometry.location,
                      title: item.name,
                      map: map
                    });
                    service.getDetails({
                      placeId: item.place_id,
                      fields: ['name', 'rating', 'formatted_phone_number', 'formatted_address', 'url', 'photo', 'website']
                    }, function(place, status) {
                      /* THIS IS THE CALLBACK FUNCTION FOR THE REQUEST */
                      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        /* IS THE STATUS IS OK THEN APPEND THE INFORMATION TO THE DOM */
                        // TODO: CREATE AND APPEND DOM ELEMENTS NECESSARY FOR A BOX WITH ALL INFO
                        let placesContainer = document.querySelector('#places')
                        placesContainer.style.width = '55%';
                        placesContainer.style.minWidth = '400px';
                        let resultLocation = document.getElementById('places')
            
                        let container = document.createElement('div')
                        container.classList.add('location-container')
  
                        let imageContainer = document.createElement('div')
                        imageContainer.classList.add('image-container')
                        imageContainer.style.backgroundImage = `url(${place.photos[0].getUrl()})`
                        container.appendChild(imageContainer)
  
                        let textContainer = document.createElement('div')
                        textContainer.classList.add('text-info')
  
                        let name = document.createElement('p')
                        name.classList.add('name')
                        name.textContent = place.name
  
                        let url = document.createElement('p')
                        url.classList.add('url')
                        let urlLink = document.createElement('a')
                        urlLink.href = place.website
                        urlLink.textContent = place.website
                        url.appendChild(urlLink)
  
                        let phone = document.createElement('p')
                        phone.classList.add('phone')
                        phone.textContent = place.formatted_phone_number
  
                        let address = document.createElement('p')
                        address.classList.add('address')
                        let addressLink = document.createElement('a')
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
                        console.log("error: status=" + status);
                      }
                    });
                  } else {
                    console.log('nope')
                  }
              });
            } else {
              // TODO: If there are no results do something
              console.log(status);
            }
          });
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  function computeTotalDistance(result) {
    let totalDist = 0;
    let myroute = result.routes[0];
    for (let i = 0; i < myroute.legs.length; i++) {
      totalDist += myroute.legs[i].distance.value;    
    }
  
    return totalDist / 2;
  }

  return (
    <StyledApp className="App">
      <MapRequest setMapProps={setMapProps} submitInfo={submitInfo} formData={formData} setFormData={onInputChange} newSetFormData={setFormData}/>
      <MemoChild {...mapProps}/>
      <Places />
    </StyledApp>
  );
}

export default App;

const MemoChild = React.memo(Map);
