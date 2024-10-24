import React, { useEffect, useState } from "react";
import axios from "axios";
import "../scss/pages/weather/_weather.scss";
import clear_icon from "../assets/clear.png";

const initialWeatherData = {
  forecast: {
    forecastday: [
      {
        date: "2024-07-01",
        day: {
          avgtemp_c: 25,
          condition: {
            text: "Sunny",
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
          },
        },
      },
      {
        date: "2024-07-02",
        day: {
          avgtemp_c: 22,
          condition: {
            text: "Partly Cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
          },
        },
      },
      {
        date: "2024-07-03",
        day: {
          avgtemp_c: 24,
          condition: {
            text: "Cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/119.png",
          },
        },
      },
      {
        date: "2024-07-04",
        day: {
          avgtemp_c: 26,
          condition: {
            text: "Sunny",
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
          },
        },
      },
    ],
  },
};

const Weather = () => {
  const [weatherData, setWeatherData] = useState(initialWeatherData);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!location) return; 
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${
            import.meta.env.VITE_WEATHER_API
          }&q=${location}&days=4&aqi=yes&alerts=yes`
        );
        setWeatherData(response.data);
        console.log("API Response:", response.data); 
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData(); 
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    console.log("Current Location:", event.target.value); 
  };

  return (
    <div className="weather">
      <h1 className="top_info">WEATHER FORECAST</h1>
      <div className="search_bar">
        <input
          className="location_input"
          type="text"
          placeholder="Search city"
          value={location}
          onChange={handleLocationChange}
        />
      </div>
      <div className="cards">
        {weatherData.forecast.forecastday.map((day) => (
          <div className="card" key={day.date}>
            <h2>{day.date}</h2>
            <div className="img">
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
              />
            </div>
            <h3>{day.day.avgtemp_c} °C</h3>
            <h3>{day.day.condition.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
