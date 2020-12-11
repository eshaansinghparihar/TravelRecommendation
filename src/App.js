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
  "Chennai",
  "Ahmedabad"]
    
  
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
      var urlToPlaces=`https://api.opentripmap.com/0.1/en/places/radius?apikey=5ae2e3f221c38a28845f05b60e7759b29878873a69598c9d75b72fbe&radius=10000&limit=100&offset=0&lon=${longitude}&lat=${lattitude}&rate=2&format=json` 
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
      setLocation("")
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

  const placeCard=places.length && places.map(place=>{
    var urltoMap="https://maps.google.com?q="+place.point.lat+","+place.point.lon;
    return(
    <div class="card">
    <div class="container">
    <h3><b>{place.name}</b></h3>
    <h4>Rated {place.rate}</h4>
    <h5>Aproxx {(place.dist/1000).toFixed(2)} kms from City Centre</h5>
    <button className="Buttonrownav"
    ><a target="_blank" href={urltoMap}>Open in Google Maps</a></button>
    <h5></h5>
    <h5></h5>
    </div>
    </div>
)});
    
    
  

  return (
    <div className="App">
      <div className="App-header">
      <h1 className="Heading">goodTravel</h1>
      <h1 className="Heading"> </h1>
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
      <h1 className="Heading"> </h1>
      <div >
      {commomCity.map(city=><button className="Buttonrow"
      onClick={()=>commoncityclickHandler(city)}
      >{city}</button>)}
      </div>

      {(places.length)? placeCard :(
        <div class="cardhigh">
        <div class="container">
        <h1 className="Heading"> </h1>
        <h3><b>Tourist Attractions of your city would appear here if available ! </b></h3>
        <p>We are still exploring your city if the attractions don't appear on Search.</p>
        <h1 className="Heading"> </h1>
        </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;
