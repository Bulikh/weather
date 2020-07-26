import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initWeather, initLatLong } from "./store/actions/actions";
import Main from "./containers/main/main";
import Background from "./containers/background/background";
import Spinner from "./components/UI/spinner/spinner";
import styled, { createGlobalStyle } from "styled-components";
import usePrevCoords from "./hooks/usePrevCoords";
const SSpinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Josefin Sans', sans-serif;
  }
`;
function App() {
  const dispatch = useDispatch();
  const { weather, city, lat, long, loading } = useSelector(state => state);
  const prev = usePrevCoords({ city, lat, long });
  useEffect(() => {
    dispatch(initLatLong());
  }, [dispatch]);
  useEffect(() => {
    if (prev) {
      if (!prev.lat && !prev.long) {
        if (city && lat && long) dispatch(initWeather(city, lat, long));
      }
    }
  }, [dispatch, city, lat, long, prev]);
  let content = weather && <Main forecast={weather} city={city}></Main>;
  if (loading) {
    content = (
      <SSpinner>
        <Spinner />
      </SSpinner>
    );
  }
  return (
    <>
      <GlobalStyle />
      <Background />
      {content}
    </>
  );
}

export default App;
