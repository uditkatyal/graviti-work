import React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Pin from "../../Assets/Images/pin.svg";
import { useState, useRef } from "react";
import "./Map.css";

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const center = { lat: 48.8584, lng: 2.2945 };
  //   const [map, setMap] = useState(/**@type google.maps.Map */ null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [place1, setPlace1] = useState(null);
  const [place2, setPlace2] = useState(null);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  if (!isLoaded) return null;

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setPlace1(results.routes[0].legs[0].start_address);
    setPlace2(results.routes[0].legs[0].end_address);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }
  return (
    <div className="container-map-details">
      <div>
        <div className="map-details">
          <div>
            <label className="label-styles" htmlFor="origin">
              Origin
            </label>
            <div>
              <img className="pin-icon" src={Pin} alt="" />
              <Autocomplete>
                <input
                  for="origin"
                  type="text"
                  ref={originRef}
                  className="input-styles"
                />
              </Autocomplete>
            </div>

            <label className="label-styles" htmlFor="destination">
              Destination
            </label>
            <div>
              <img className="pin-icon" src={Pin} alt="" />
              <Autocomplete>
                <input
                  for="destination"
                  type="text"
                  ref={destinationRef}
                  className="input-styles"
                />
              </Autocomplete>
            </div>
          </div>
          <div>
            <div>
              <button className="calculate-btn" onClick={calculateRoute}>
                Calculate
              </button>
            </div>
            <div>
              <button className="clear-btn" onClick={clearRoute}>
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="data-recieved">
          <div>
            <p>Distance is {distance}</p>
          </div>
          <div>
            <p>Duration is {duration}</p>
          </div>
          <div>
            <p>
              the distance between {place1} and {place2} is {distance}
            </p>
          </div>
        </div>
      </div>

      <div>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{
            height: "60vh",
            width: "40vw",
          }}
          //   onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
