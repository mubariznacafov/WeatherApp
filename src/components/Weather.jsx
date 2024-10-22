import React from "react";
import "../scss/pages/weather/_weather.scss";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import cloud_icon from "../assets/cloud.png";
import { useEffect } from "react";

const Weather = () => {
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      console.log(import.meta.env.VITE_APP_ID);
    } catch (error) {}
  };
  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search_bar">
        <input type="text" placeholder="Search" />
        <div className="search_icon">
          <img src={search_icon} alt="" />
        </div>
        <div className="current_weather">
          <div className="img">
            <img src={clear_icon} alt="" />
          </div>
          <div className="degree">
            <p>16°C</p>
          </div>
          <div className="city">
            <p>London</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
