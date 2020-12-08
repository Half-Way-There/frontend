import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"

const StyledApp = styled.div`
  height: 100vh; 
  width: 100%;
`
function Map({
  options, onMount, className, onMountProps,
}) {
  const ref = useRef()
  const [map, setMap] = useState()

  useEffect(() => {
    const onLoad = () => setMap(new window.google.maps.Map(ref.current, options))
    if (!window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=geometry&libraries=places`
      document.head.append(script)
      script.addEventListener("load", onLoad)
      return () => script.removeEventListener("load", onLoad)
    } onLoad()
  }, [options])

  useEffect(() => {
    if (window.google) {
      function loadEpoly() {
        window.google.maps.LatLng.prototype.distanceFrom = function (newLatLng) {
          const EarthRadiusMeters = 6378137.0 // meters
          const lat1 = this.lat()
          const lon1 = this.lng()
          const lat2 = newLatLng.lat()
          const lon2 = newLatLng.lng()
          const dLat = (lat2 - lat1) * Math.PI / 180
          const dLon = (lon2 - lon1) * Math.PI / 180
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
          + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
          * Math.sin(dLon / 2) * Math.sin(dLon / 2)
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
          const d = EarthRadiusMeters * c
          return d
        }
        // === A method which returns a GLatLng of a point a given distance along the path ===
        // === Returns null if the path is shorter than the specified distance ===
        window.google.maps.Polygon.prototype.GetPointAtDistance = function (metres) {
          // some awkward special cases
          if (metres === 0) return this.getPath().getAt(0)
          if (metres < 0) return null
          if (this.getPath().getLength() < 2) return null
          let dist = 0
          let olddist = 0
          for (var i = 1; (i < this.getPath().getLength() && dist < metres); i++) {
            olddist = dist
            dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1))
          }
          if (dist < metres) {
            return null
          }
          const p1 = this.getPath().getAt(i - 2)
          const p2 = this.getPath().getAt(i - 1)
          const m = (metres - olddist) / (dist - olddist)
          return new window.google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m)
        }

        // === A method which returns an array of GLatLngs of points a given interval along the path ===
        window.google.maps.Polygon.prototype.GetPointsAtDistance = function (metres) {
          let next = metres
          const points = []
          // some awkward special cases
          if (metres <= 0) return points
          let dist = 0
          let olddist = 0
          for (let i = 1; (i < this.getPath().getLength()); i++) {
            olddist = dist
            dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1))
            while (dist > next) {
              const p1 = this.getPath().getAt(i - 1)
              const p2 = this.getPath().getAt(i)
              const m = (next - olddist) / (dist - olddist)
              points.push(new window.google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m))
              next += metres
            }
          }
          return points
        }

        // === Copy all the above functions to GPolyline ===
        window.google.maps.Polyline.prototype.distanceFrom = window.google.maps.Polygon.prototype.distanceFrom
        window.google.maps.Polyline.prototype.GetPointAtDistance = window.google.maps.Polygon.prototype.GetPointAtDistance
        window.google.maps.Polyline.prototype.GetPointsAtDistance = window.google.maps.Polygon.prototype.GetPointsAtDistance
      }
      loadEpoly()
    }
  }, [window.google])

  if (map && typeof onMount === "function") onMount(map, onMountProps)

  return (
    <StyledApp {...{ ref, className }} />
  )
}

Map.defaultProps = {
  options: {
    center: { lat: 48, lng: 8 },
    zoom: 5,
  },
}

export default Map
