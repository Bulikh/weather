import axios from "axios";
import {
  SET_ERROR,
  SET_LOADER,
  ADD_WEATHER,
  SET_CITY,
  SET_COORDS,
} from "./actionCreators";

export const addWeather = (city, weather) => {
  return {
    type: ADD_WEATHER,
    payload: {
      weather,
      city,
    },
  };
};

export const setLoader = () => {
  return {
    type: SET_LOADER,
  };
};
export const setError = error => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};

export const initWeather = (city, lat, long) => {
  return dispatch => { 
    dispatch(setLoader());
    console.log(city, lat, long)
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_WEATHER_KEY}`
      )
      .then(res => {
        dispatch(addWeather(city, res.data));
      })
      .catch(err => dispatch(setError(err)));
  };
};
export const setLatLong = (city, lat, long) => {
  return {
    type: SET_COORDS,
    payload: {
      city,
      lat,
      long,
    },
  };
};
export const setCity = city => {
  return {
    type: SET_CITY,
    payload: {
      city,
    },
  };
};
export const initLatLong = () => {
  return dispatch => {
    axios
      .get(`https://geolocation-db.com/json/`)
      .then(res =>
        dispatch(
          setLatLong(res.data.city, res.data.latitude, res.data.longitude)
        )
      )
      .catch(err => console.log(err));
  };
};
