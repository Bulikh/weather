import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initWeather, initLatLong } from "./store/actions/actions";
import Main from "./containers/main/main";
import Background from "./containers/background/background";
function App() {
  const dispatch = useDispatch();
  const { weather, city, lat, long } = useSelector(state => state);
  // console.log(weather, city, lat, long);
  useEffect(() => {
    dispatch(initLatLong());
  }, [dispatch]);
  useEffect(() => {
    if (city && lat && long) dispatch(initWeather(city, lat, long));
  }, [dispatch, city, lat, long]);

  return (
    <>
      <Background />
      {weather && <Main forecast={weather} city={city}></Main>}
    </>
  );
}

export default App;
