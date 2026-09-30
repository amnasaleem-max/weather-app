// ...existing code...
import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchIcon from '../assets/searchicon.png'
import breze from '../assets/breze.png'
import cloudy from '../assets/cloudy.png'
import sun from '../assets/sun.png'
import humidity from '../assets/humidity.png'
import partialycloudy from '../assets/partialycloudy.png'
import strom from '../assets/strom.png'


const Weather = () => {
  const inputRef = useRef()
  const allIcons = {
    "01d": sun,
    "01n": sun,
    "02d": partialycloudy,
    "02n": partialycloudy,
    "03d": partialycloudy,
    "03n": partialycloudy,
    "04d": cloudy,
    "04n": cloudy,
    "09d": cloudy,
    "09n": cloudy,
    "10d": strom,
    "10n": strom,
    "11d": strom,
    "11n": strom,
  }

  const [weatherData, setWeatherData] = useState({});

  const search = async (city) => {
    if(city === ''){
      alert('Please enter a city name');
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert('City not found');
      }
      console.log(data)
      const icon = allIcons[data.weather[0].icon] || sun;
      setWeatherData({
        humidity: data.main?.humidity ?? null,
        windSpeed: data.wind?.speed ?? null,
        temperature: Math.round(data.main?.temp ?? 0),
        location: data.name,
        icon: icon
      })
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  useEffect(() => {
    search("lahore");
  }, [])

  return (
    <div className='Weather'>
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='search' />
        <img src={searchIcon} alt='search icon'  onClick={()=>search(inputRef.current.value)}/>
      </div>
      <img src={weatherData.icon || sun} alt='weather' className='weather-icon' />
      <p className='temperature'>{weatherData.temperature ?? '--'}</p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className='col'>
          <img src={humidity} alt='humidity' className='humidity-icon' />
          <div>
            <p>{weatherData.humidity ? `${weatherData.humidity}%` : '--'}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={breze} alt='breze' className='breze-icon' />
          <div>
            <p>{weatherData.windSpeed ? `${weatherData.windSpeed} km/h` : '--'}</p>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
