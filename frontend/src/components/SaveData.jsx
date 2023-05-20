import propTypes from "prop-types";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState } from "react";

const postData = async (selectedOptions, setResponseMessage, setIsLoading) => {
  const sendData = new FormData();

  for (const [key, value] of Object.entries(selectedOptions)) {
    sendData.append(key, value);
  }

  axios({
    method: "post",
    url: "/api/save_data",
    data: sendData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      setResponseMessage(response);
      setIsLoading(false);
    })
    .catch(function (error) {
      setResponseMessage(error);
    });
};

const SaveData = ({ selectedOptions }) => {
  SaveData.propTypes = {
    selectedOptions: propTypes.object.isRequired,
  };
  const [responseMessage, setResponseMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Form.Group>
        <Button
          onClick={() =>
            postData(selectedOptions, setResponseMessage, setIsLoading)
          }
          variant="outline-light"
        >
          Submit
        </Button>
      </Form.Group>
      {!isLoading && (
        <>
          {responseMessage && (
            <>
              <Form.Label>{responseMessage?.data?.message}</Form.Label>
            </>
          )}
        </>
      )}
    </>
  );
};

export default SaveData;
