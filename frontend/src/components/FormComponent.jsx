import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import WeatherComponent from "./weatherComponent/WeatherComponent";
import propTypes from "prop-types";

function FormComponent({ data }) {
  FormComponent.propTypes = {
    data: propTypes.object.isRequired,
  };

  const labels = {
    event: "Select the event:",
    person: "Select the person:",
    pitch: "Select the pitch:",
  };
  const eventObj = {};
  const [selectedOptions, setSelectedOptions] = useState({
    event: data["event"][0],
    person: data["person"][0],
    pitch: data["pitch"][0],
  });

  console.log("selectedOptions", selectedOptions);

  return (
    <>
      <Form className="d-grid gap-2">
        {Object.keys(data).map((element) => (
          <Form.Group key={element}>
            <Row>
              <Col>
                <Form.Label>{labels[element]}</Form.Label>
              </Col>
              <Col>
                <Form.Select
                  onChange={(e) => {
                    eventObj[element] = e.target.value;
                    setSelectedOptions((selectedOptions) => ({
                      ...selectedOptions,
                      ...eventObj,
                    }));
                  }}
                  className="bg-dark text-light"
                >
                  {data[element].map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        ))}
        <WeatherComponent
          setSelectedOptions={setSelectedOptions}
          selectedOptions={selectedOptions}
        />
      </Form>
    </>
  );
}

export default FormComponent;
