import React, {useState,useRef, useEffect} from 'react'
const api = {
  key: "f082c782308c74e689358d93b59505e4",
  base: "https://api.openweathermap.org/data/2.5/",
}

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [getWidth,setGetWidth] = useState("")
  const elemRef = useRef();
  const search = async (evt) => {
    if(evt.key === "Enter") {
      try {
        const res = await fetch(`${api.base}weather?q=${query}&unit=metric&APPID=${api.key}`);
        const resData = await res.json();
        setWeather(resData);
        setQuery('');
        console.log('resData', resData);
      }
      catch (error) {
        console.log('error');
        console.log('error',error);
      }
    }
  }

  const getTemp = (arg) => {
    console.log('arg', arg);
    
    return `${arg.slice(0,2)}.${arg.slice(2)}c`;
  }

  const dateBuilder = (d) => {
    console.log('d',d.getDate());
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
  console.log('width outside',window.innerWidth);
  return (<>
  {window.innerWidth > 400 ? (
    <div className='container'>
     <h2>Please switch to mobile i.e. width below 400px</h2>
    </div>) : 
    (
    <div className={(typeof weather.main != "undefined") ? ((Math.round(weather.main.temp).toString().slice(0,2) > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(weather.cod === 200) &&
        <>
        <div className='location-box'>
          <div className='location'>{`${weather.name}, ${weather.sys.country}`}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className='weather-box'>
          <div className='temp'>{getTemp((Math.round(weather.main.temp)).toString())}</div>
          <div className='weather'>{weather.weather[0].main}</div>
        </div>
        </>}
      </main>
    </div>
    )}
    </>
  )
}

export default App