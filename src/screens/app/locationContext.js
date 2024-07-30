import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  getDataFromAsyncStorage,
  setDataToAsyncStorage,
  removeDataFromAsyncStorage,
} from "/Users/tanmaygirdhar/ReactNative/WeatherApp/src/utils/asyncStorage.js";

const LocationContext = createContext();

const API_KEY = "be1c284fc6564c83938100901242407";

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {
      const storedLocations = await getDataFromAsyncStorage();
      setLocations(storedLocations);
    };
    loadLocations();
  }, []);

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`
      );

      if (response.status === 200) {
        const { temp_c, condition } = response.data.current;
        return { temp: temp_c, condition: condition.text };
      }
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
    return { temp: "N/A", condition: "Unknown" };
  };

  const addLocation = async (cityName) => {
    const weatherData = await fetchWeatherData(cityName);
    const newLocation = { location: cityName, ...weatherData };
    setLocations((prevLocations) => {
      const updatedLocations = [...prevLocations, newLocation];
      setDataToAsyncStorage(newLocation);  
      return updatedLocations;
    });
  };

  const removeLocation = (cityName) => {
    setLocations((prevLocations) => {
      const updatedLocations = prevLocations.filter(
        (location) => location.location !== cityName
      );
      removeDataFromAsyncStorage(cityName);  
      return updatedLocations;
    });
  };

  return (
    <LocationContext.Provider
      value={{ locations, addLocation, removeLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocations = () => useContext(LocationContext);
