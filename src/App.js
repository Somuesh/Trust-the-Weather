import React from "react";
import { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import { toast, ToastContainer } from "react-toastify";

/* CSS imports  */
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({})

    const search = async (e) => {
        if (e.key === 'Enter') {
            try {
                const data = await fetchWeather(query);
                //console.log(data);
                setWeather(data);
                // console.log(weather)
                setQuery('');
            }
            catch (error) {
                const notify = () => {
                    toast("Enter correct city name");
                }
                notify();
            }

        }
    }

    return (
        <div className="main-container">
            <input
                type="text"
                className="search"
                placeholder="Enter City Name..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
                onKeyDown={search}
            />
            <ToastContainer />
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <span>{weather.weather[0].description}</span>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default App;