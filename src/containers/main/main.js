import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import bgImage from "../../assets/weather.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faTint,
  faCloudMeatball,
} from "@fortawesome/free-solid-svg-icons";
import { kelvinToCelsius } from "../../utils/index";
import { initWeather } from "../../store/actions/actions";
const MainContainer = styled.main`
  max-width: 1024px;
  width: 100%;
  background-image: url(${bgImage});
  background-size: 100% auto;
  display: flex;
  flex-direction: column;
  border: 10px solid #252e3f;
  position: absolute;
  left: 50%;
  top: 50%;
  height: 500px;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 0 25px #000;
  @media (max-width: 800px) {
    max-width: unset;
    height: unset;
    flex-direction: column;
    position: relative;
    transform: none;
    left: 0;
    top: 0;
    justify-content: center;
    background: #000;
  }
`;
const Section = styled.section`
  width: 100%;
  height: ${props => props.height};
  background: ${props => props.background};
  display: flex;
  justify-content: space-between;
  margin: 0;
  box-sizing: border-box;
  padding: 0 15px;
  margin-top: ${props => (props.top ? props.top + "px" : "0px")};
  div {
    display: flex;
    align-items: center;
  }
  h3 {
    margin-left: 5px;
  }
  @media (max-width: 800px) {
    height: unset;
    flex-direction: column;
  }
`;
const Title = styled.h1`
  font-size: 25px;
  width: 100%;
  text-align: center;
  color: #fff;
  margin: 5px 0;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;
const Div = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  color: #fff;
  text-align: center;
  &:first-child {
    align-items: flex-start;
    box-sizing: border-box;
    padding-left: 30px;
  }
  section {
    margin: 0 0 30px 0;
  }
  h2 {
    margin: 0 0 5px 0;
  }
  h3 {
    font-size: 16px;
    font-weight: normal;
    margin-top: 0;
    margin-bottom: 0;
  }
  h2 {
    font-size: 20px;
  }
  figure {
    margin: 0;
    padding: 0;
    img {
      width: 60px;
      height: 60px;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
    margin: 20px 0;
    &:first-child {
      align-items: center;
      padding: 0;
    }
    section {
      margin: 30px 0;
    }
    &:nth-child(1) {
      order: 2;
    }
    &:nth-child(2) {
      order: 1;
    }
    &:nth-child(3) {
      order: 3;
    }
  }
`;

const Article = styled.article`
  cursor: pointer;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin: 0 10px;
  padding: 5px 5px;
  transition: 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  margin: 0;
  border-radius: 5px;
  img {
    width: 50px;
    height: 50px;
  }
  h2,
  h3 {
    color: #fff;
    margin: 0;
  }
  h2 {
    font-size: 25px;
  }
  h3 {
    font-weight: normal;
    font-size: 14px;
  }
`;
const Input = styled.input`
  border: none;
  background: transparent;
  border: 1px solid #eee;
  border-radius: 3px;
  margin-top: 5px;
  padding: 10px;
  &::placeholder {
    color: #000;
    font-weight: bold;
  }
`;
const Button = styled.button`
  padding: 10px 5px;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  color: #000;
`;
const Main = ({ forecast, city }) => {
  const [inputValue, setInputValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const onHandleSubmit = e => {
    e.preventDefault();

    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${inputValue}&key=657b88e76a6f4e0484bddac6a5eac037`
      )
      .then(res =>
        dispatch(
          initWeather(
            inputValue.charAt(0).toUpperCase() + inputValue.slice(1),
            res.data.results[0].geometry.lat,
            res.data.results[0].geometry.lng
          )
        )
      )
      // console.log(res.data.results[0].geometry))
      .catch(err => console.log(err));
  };
  return (
    <MainContainer>
      <Title>Weather Forecast Today</Title>
      <Section height="unset">
        <Div>
          <figure>
            <img
              src={
                process.env.REACT_APP_WEATHER_ICON_URL +
                forecast.current.weather[0].icon +
                "@2x.png"
              }
              alt={forecast.current.weather[0].main + " weather"}
            />
          </figure>
          <h2>{forecast.current.weather[0].main}</h2>
          <h3>{city}</h3>
          <h2>
            {kelvinToCelsius(forecast.current.temp)} {"\u2103"}
          </h2>
        </Div>
        <Div>
          <Button onClick={() => setShowForm(!showForm)}>
            Choose another city
          </Button>
          {showForm && (
            <form onSubmit={onHandleSubmit}>
              <Input
                onChange={e => setInputValue(e.target.value)}
                type="text"
                value={inputValue}
                placeholder="Enter city name"
              />
            </form>
          )}
        </Div>
        <Div>
          <section>
            <div>
              <FontAwesomeIcon icon={faTint} size="lg" />
              <h3>Humidity</h3>
            </div>
            <h2>{forecast.current.humidity + "%"}</h2>
          </section>
          <section>
            <div>
              <FontAwesomeIcon icon={faCloudMeatball} size="lg" />
              <h3>Air pressure</h3>
            </div>
            <h2>{forecast.current.pressure + " PS"}</h2>
          </section>
          <section>
            <div>
              <FontAwesomeIcon icon={faWind} size="lg" />
              <h3>Wind Speed</h3>
            </div>
            <h2>{forecast.current.wind_speed + " km/h"}</h2>
          </section>
        </Div>
      </Section>
      <Title>Weather forecast next days</Title>
      <Section height="unset" top="45">
        {forecast.daily.map(item => (
          <Article key={item.dt}>
            <h3>{new Date(item.dt * 1000).toUTCString().slice(0, 7)}</h3>
            <h3>{item.weather[0].description}</h3>
            <img
              src={
                process.env.REACT_APP_WEATHER_ICON_URL +
                item.weather[0].icon +
                "@2x.png"
              }
              alt={item.weather[0].main + " weather"}
            />
            <h2>{kelvinToCelsius(item.temp.day).toFixed(0) + "\u2103"}</h2>
          </Article>
        ))}
      </Section>
    </MainContainer>
  );
};

export default Main;
