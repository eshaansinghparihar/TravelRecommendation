import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [location,setLocation]=useState('')
  const [lat,setLat]=useState(0.00)
  const [long,setLong]=useState(0.00)
  const [places,setPlaces]=useState([])
  const [error,setError]=useState("");
  var inputLocation=""
  
  const commomCity=["Lucknow",
  "Bangalore",
  "Delhi",
  "Mumbai",
  "Chennai"]
    
  
  function errorHandler(error)
  {
    
  }
  function commoncityclickHandler(city)
  {
    var urltoCoordinates = "https://api.opentripmap.com/0.1/en/places/geoname?apikey=5ae2e3f221c38a28845f05b60e7759b29878873a69598c9d75b72fbe&name="+city;
    var lattitude=0,longitude=0;
    fetch(urltoCoordinates).
    then(response => response.json())
    .then(coordinates=> {
      // setLat(coordinates.lat)
      // setLong(coordinates.lon)
      lattitude=coordinates.lat;
      longitude=coordinates.lon;
      var urlToPlaces=`https://api.opentripmap.com/0.1/en/places/radius?apikey=5ae2e3f221c38a28845f05b60e7759b29878873a69598c9d75b72fbe&radius=10000&limit=50&offset=0&lon=${longitude}&lat=${lattitude}&rate=2&format=json` 
      fetch(urlToPlaces)
      .then(response=>response.json())
      .then(placeData=>setPlaces(placeData))
    })
    .catch(errorHandler);
  }
  function clickHandler()
  {
    var urltoCoordinates = "https://api.opentripmap.com/0.1/en/places/geoname?apikey=5ae2e3f221c38a28845f05b60e7759b29878873a69598c9d75b72fbe&name="+location;
    var lattitude=0,longitude=0;
    fetch(urltoCoordinates).
    then(response => response.json())
    .then(coordinates=> {
      // setLat(coordinates.lat)
      // setLong(coordinates.lon)
      lattitude=coordinates.lat;
      longitude=coordinates.lon;
      var urlToPlaces=`https://api.opentripmap.com/0.1/en/places/radius?apikey=5ae2e3f221c38a28845f05b60e7759b29878873a69598c9d75b72fbe&radius=10000&limit=50&offset=0&lon=${longitude}&lat=${lattitude}&rate=2&format=json` 
      fetch(urlToPlaces)
      .then(response=>response.json())
      .then(placeData=>setPlaces(placeData))
    })
    .catch(errorHandler);
  }

  function locationChangeHandler(event)
  {
    inputLocation=event.target.value
    setLocation(inputLocation)
  }
  return (
    <div className="App">
      <div className="App-header">
      <h1 className="Heading">goodTravel</h1>
      <div className="search">
      <input 
      value={location}
      placeholder="Enter a City name here !"
      onChange={locationChangeHandler}
      className="Input"
      />
      <button className="Button"
      onClick={clickHandler}
      >GO</button>
      </div>
      <h1 className="Heading">{location}</h1>
      <div >
      {commomCity.map(city=><button className="Buttonrow"
      onClick={()=>commoncityclickHandler(city)}
      >{city}</button>)}
      </div>

      {(places.length)?(places.map(place=><h6>{place.name}</h6>)):"Attractions of your city would appear here if available ! "}
      </div>
    </div>
  );
}

export default App;
