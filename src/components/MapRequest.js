import React from "react"
import styled from "styled-components"

const StyledMapRequest = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  padding: 0% 3%;
  height: 90vh;
  .first-address h2 {
    color: #c7c7c7;
    text-align: center;
    padding-top: 6%;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 200;
    padding-bottom: 2%;
  }
  .second-address h2 {
    color: #c7c7c7;
    text-align: center;
    padding-top: 6%;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 200;
    padding-bottom: 2%;
  }
  .category h2 {
    color: #c7c7c7;
    text-align: center;
    padding-top: 6%;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 200;
    padding-bottom: 2%;
  }
  .radius h2 {
    color: #c7c7c7;
    text-align: center;
    padding-top: 6%;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 200;
    padding-bottom: 2%;
  }
  .button {
    text-align: center;
  }
  .button #findRoute {
    background: #121212;
    border: none;
    outline: none;
    border-radius: 40px;
    padding-top: 4%;
    padding-bottom: 4%;
    padding-right: 20%;
    padding-left: 20%;
    color: #c7c7c7;
    font-size: 1.2rem;
    box-shadow: inset -2px -2px 6px rgba(255,255,255,0.05), inset 2px 2px 6px rgba(0, 0, 0, 0.8);
    text-align: center;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
  }
  .button #findRoute:hover {
    color: white;
  }
  .first-address #start {
    background: #121212;
    border: none;
    outline: none;
    border-radius: 40px;
    padding: 5px 15px;
    color: #c7c7c7;
    font-size: 18px;
    box-shadow: inset -2px -2px 6px rgba(255,255,255,0.05), inset 2px 2px 6px rgba(0, 0, 0, 0.8);
    text-align: center;
  }
  .second-address #end {
    background: #121212;
    border: none;
    outline: none;
    border-radius: 40px;
    padding: 5px 15px;
    color: #c7c7c7;
    font-size: 18px;
    box-shadow: inset -2px -2px 6px rgba(255,255,255,0.05), inset 2px 2px 6px rgba(0, 0, 0, 0.8);
    text-align: center;
  }
  .category #category {
    background: #121212;
    border: none;
    outline: none;
    border-radius: 40px;
    padding: 5px 15px;
    color: #c7c7c7;
    font-size: 18px;
    box-shadow: inset -2px -2px 6px rgba(255,255,255,0.05), inset 2px 2px 6px rgba(0, 0, 0, 0.8);
    text-align: center;
  }
  .radius #radius {
    background: #121212;
    border: none;
    outline: none;
    border-radius: 40px;
    padding: 5px 15px;
    color: #c7c7c7;
    font-size: 18px;
    box-shadow: inset -2px -2px 6px rgba(255,255,255,0.05), inset 2px 2px 6px rgba(0, 0, 0, 0.8);
    text-align: center;
  }
`

function MapRequest({ formData, submitInfo, setFormData }) {
  function handleSubmit(e) {
    e.preventDefault()
    submitInfo()
  }
  return (
    <StyledMapRequest className="clean">
      <div className="first-address">
        <h2>First Address: </h2>
        <input type="text" name="firstAddress" id="start" value={formData.firstAddress} onChange={(e) => setFormData(e)} />
      </div>
      <div className="second-address">
        <h2>Second Address: </h2>
        <input type="text" name="secondAddress" id="end" value={formData.secondAddress} onChange={(e) => setFormData(e)} />
      </div>
      <div className="category">
        <h2>Category: </h2>
        <input type="text" name="category" placeholder="Food, Coffee, etc..." id="category" value={formData.category} onChange={(e) => setFormData(e)} />
      </div>
      <div className="radius">
        <h2>Radius :</h2>
        <input type="number" name="radius" id="radius" placeholder="0 - 10" value={formData.radius} onChange={(e) => setFormData(e)} />
      </div>
      <div className="button">
        <button type="button" onClick={handleSubmit} id="findRoute">Check</button>
      </div>
    </StyledMapRequest>
  )
}

export default MapRequest
