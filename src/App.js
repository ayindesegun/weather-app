import React, { useState } from 'react';


const api = {
  key : "1dcd26b9a86a59be1ba69289437cc5ea",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
const [query, setQuery] = useState('')
const [weather, setWeather] = useState({})

const search = e => {
    if (e.key === 'Enter') {
      fetch (`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('')
        setWeather(result)
        
      })
    }
}

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
    let day = days[d.getDay()]
    let month = months[d.getMonth()]
    let date = d.getDate()
    let year = d.getFullYear()

    return `${day} ${month} ${date} ${year}`
  }
  return (

    <div className= {(typeof weather.main != "undefined") ? ((weather.main.temp > 25) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value) }
              value={query}
              onKeyPress={search}
              />
        </div>
        {(typeof weather.main !="undefined") ? (
          <div>
            <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
  <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
             <div className="temp">
               {Math.round(weather.main.temp)}°c
             </div>
             <div className="weather">
               {weather.weather[0].main}
             </div>
          </div>
          </div>
        ) : ('') }
      </main>
    </div>
  );
}

export default App;
