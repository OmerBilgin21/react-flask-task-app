import { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import propTypes from "prop-types";
import SaveData from "../SaveData";
import sunnySvg from "../../assets/sunny.svg";
import cloudySvg from "../../assets/cloudy.svg";
import heavyFogSvg from "../../assets/heavy_fog_wind.svg";
import rainySvg from "../../assets/rainy.svg";
import heavyRainSvg from "../../assets/heavy_rain.svg";
import lightSnowSvg from "../../assets/light_snow.svg";
import heavySnowSvg from "../../assets/heavy_snow.svg";
import thunderstormSvg from "../../assets/thunderstorm.svg";
import "./WeatherComponent.css";

const WeatherComponent = ({ setSelectedOptions, selectedOptions }) => {
  WeatherComponent.propTypes = {
    selectedOptions: propTypes.object.isRequired,
    setSelectedOptions: propTypes.func.isRequired,
  };

  const [weather, setWeather] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [precipitationProbability, setPrecipitationProbability] = useState();
  const [temperature, setTemperature] = useState();
  const [wco, setWco] = useState();
  const [loading, setLoading] = useState(true);
  const eventObj = {};

  useEffect(() => {
    axios(
      `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode&timezone=CET`
    )
      .then((r) => {
        setWeather(r.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(true);
      });
  }, []);

  useEffect(() => {
    if (selectedTime) {
      const usableTime = selectedTime.split(" at ").join("T");
      const weatherIndex = weather.hourly.time.indexOf(usableTime);

      if (weatherIndex !== -1) {
        setPrecipitationProbability(
          weather.hourly.precipitation_probability[weatherIndex]
        );
        setTemperature(weather.hourly.temperature_2m[weatherIndex]);
        setWco(weather.hourly.weathercode[weatherIndex]);
        eventObj.time = usableTime;
        setSelectedOptions((selectedOptions) => ({
          ...selectedOptions,
          ...eventObj,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTime]);

  useEffect(() => {
    // because we fetch that time options the defaultValue is hard to maintain
    // because of react strict mode
    // at development useEffect with empty dependency: [] renders twice
    // and that messes up the defaultValue property of form.select
    // the default value kind of unnecessary but nice to have I think
    if (!loading) setSelectedTime("2023-05-23 at 00:00");
  }, [loading]);

  if (!weather) return <p>Loading!</p>;

  return (
    <>
      <Form.Group>
        <Row>
          <Col>
            <Form.Label>Select the time:</Form.Label>
          </Col>
          <Col>
            <Form.Select
              className="bg-dark text-light"
              onChange={(e) => {
                setSelectedTime(e.target.value);
              }}
            >
              {weather.hourly.time.map((element) => (
                <option defaultValue="Please select" key={element}>
                  {element.split("T").join(" at ")}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        <br />
        <Row>
          {selectedTime ? (
            <>
              <div className="">
                {wco >= 0 && wco <= 44 && (
                  <img className="weather-logo" src={sunnySvg} />
                )}
                {wco >= 45 && wco <= 55 && (
                  <img className="weather-logo" src={cloudySvg} />
                )}
                {wco >= 56 && wco <= 60 && (
                  <img className="weather-logo" src={heavyFogSvg} />
                )}
                {wco >= 61 && wco <= 65 && (
                  <img className="weather-logo" src={rainySvg} />
                )}
                {wco >= 66 && wco <= 70 && (
                  <img className="weather-logo" src={heavyRainSvg} />
                )}
                {wco >= 71 && wco <= 79 && (
                  <img className="weather-logo" src={lightSnowSvg} />
                )}
                {wco >= 80 && wco <= 84 && (
                  <img className="weather-logo" src={heavySnowSvg} />
                )}
                {wco >= 84 && wco <= 99 && (
                  <img className="weather-logo" src={thunderstormSvg} />
                )}
              </div>

              <Form.Label>
                Precipitation probability on {selectedTime} is{" "}
                {precipitationProbability}
              </Form.Label>
              <Form.Label>
                Temperature on {selectedTime} is {temperature}{" "}
              </Form.Label>
            </>
          ) : (
            <>
              <Form.Label>
                Please select a time to see the weather forecast.
              </Form.Label>
            </>
          )}
        </Row>
        <br />
      </Form.Group>
      <SaveData selectedOptions={selectedOptions} />
    </>
  );
};

export default WeatherComponent;
