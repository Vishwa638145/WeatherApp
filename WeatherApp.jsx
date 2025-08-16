import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null); 
  const [error, setError]=useState("");
 

  const handleCityName = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f97831da2c59331464e19df7d0dfbde3&units=metric` 
      );
      setWeather(response.data); 
      setError("");
    } catch (error) {
      
      console.error("Error fetching data:", error.message); 
      setError("City Not Found");
    
    }
  };

  const handleClick = () => {
    fetchWeather();
  };

  return (
    <>
      <MainBox>
        <div className="logo-image">
          {/* <img src="/Logo.svg" alt="logo" /> */}
           <h1>WEATHER</h1> 
        </div>
        <div className="MainConatiner">
          <div className="leftside">
            <input
              type="text"
              placeholder="Enter City Name"
              value={city}
              onChange={handleCityName}
            />

            <Button onClick={handleClick}>Get Weather</Button>
            {weather && (
              <>
                <h1>{weather.name}</h1>
                <div className="wetherData">
                  <h3>{weather.main.temp}°C</h3>
                  <h3>{weather.weather[0].description}</h3>
                  <h3> LAT: {weather.coord.lat}</h3>
                  <h3> LON:{weather.coord.lon}</h3>
                  <h3> HUMIDITY:{weather.main.humidity}</h3>
                  <h3> WIND SPEED:{weather.wind.speed}</h3>
                </div>
              </>
            )}
            <h1>{error}</h1>
           
          </div>
          <div className="rightside">
            <img src="/weathe.png" alt="" />
          </div>
        </div>
      </MainBox>
    </>
  );
};

export default WeatherApp;

const MainBox = styled.div`
  width: 910px;
  height: 545px;
  border: 0.5px solid #5f3d70;
  backdrop-filter: blur(10px);

  border-radius: 10px;
  padding: 65px;

  .MainConatiner {
    display: flex;
    position: relative;
  }

  .leftside {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 50px;
  }
  .leftside input {
    width: 435px;
    height: 60px;
    border: 0.5px solid #5f3d70;
    background-color: transparent;

    border-radius: 10px;
    padding: 20px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 500;
    &::placeholder {
      color: #ffffff;
    }
  }
  .leftside h1 {
    font-size: 90px;
    font-weight: 800;
  }
  .wetherData {
    display: flex;
    gap: 20px;
  }
  .wetherData h3 {
    font-size: 25px;
    font-weight: 500;
  }
  .rightside img {
    position: absolute;
    right: -212px;
    top: -142px;
  }
`;

const Button = styled.div`
  max-width: 160px;
  min-height: 50px;
  border: 0.5px solid #5f3d70;
  background-color: transparent;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  position: relative;

  /* &::after {
 content: '';
 position: absolute;
 width: 102%;
 height: 107%;
 border-radius: 10px;
 background-image: linear-gradient(to bottom right, #8726B7, #EABFFF);
 z-index: -5;
  } */
`;