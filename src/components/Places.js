import React from "react"
import styled from "styled-components"

const StyledPlaces = styled.div`
  height: 100vh;
  width: 0%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 1em;
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
  .location-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    margin: 10px;
    background-color: rgba( 255, 255, 255, 0.2);
    box-shadow: inset 3px 3px 5px black;
    border-radius: 10px;
    color: white;
    overflow-x: hidden;
  }
  .location-container p {
    padding: 0px;
    text-shadow: 1px 1px 3px black;
  }
  .location-container a {
    color: lightblue;
  }
  .image-container {
    width: 70px;
    height: 70px;
    margin-right: .3%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .text-info {
    width: 240px;
  }
`

function Places() {
  return (
    <StyledPlaces id="places" />
  )
}

export default Places
