import {
  SET_ERROR,
  SET_LOADER,
  ADD_WEATHER,
  SET_CITY,
  SET_COORDS,
} from "../actions/actionCreators";
const initialState = {
  weather: null,
  loading: false,
  error: false,
  city: "",
  lat: null,
  long: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: true,
      };
    case ADD_WEATHER:
      return {
        ...state,
        loading: false,
        weather: action.payload.weather,
        city: action.payload.city,
      };
    case SET_CITY:
      return {
        ...state,
        city: action.payload.city,
      };
    case SET_COORDS:
      return {
        ...state,
        city: action.payload.city,
        lat: action.payload.lat,
        long: action.payload.long,
      };
    default:
      return state;
  }
};
export default weatherReducer;
