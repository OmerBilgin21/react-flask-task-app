import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import propTypes from "prop-types";

const editEvent = (todos, index, editEntity) => {
  let editData = {};
  Object.keys(todos).forEach((e) => {
    editData[e] = todos[e][index];
  });
  editData = { ...editData, ...editEntity };

  axios({
    method: "put",
    url: "/api/edit_data",
    data: editData,
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      console.log("edit response", response);
    })
    .catch(function (error) {
      console.log("edit error", error);
    });
};
const deleteEvent = (todos, index) => {
  //   const theDeletedOne = Object.keys(todos).map((e) => ({todos[e][index]}));
  const theDeletedOne = {};
  Object.keys(todos).forEach((e) => {
    theDeletedOne[e] = todos[e][index];
  });
  //   editData = { ...editData, ...editEntity };
  console.log("theDeletedOne", theDeletedOne);

  axios({
    method: "post",
    url: "/api/delete_data",
    data: theDeletedOne,
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      console.log("delete response", response);
    })
    .catch(function (error) {
      console.log("delete error", error);
    });
};

const Todos = ({ data }) => {
  Todos.propTypes = {
    data: propTypes.object.isRequired,
  };

  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState();
  const [editEntity, setEditEntity] = useState();
  const eventObj = {};

  useEffect(() => {
    axios
      .get("/api/get_event_data")
      .then((r) => {
        setTodos(r.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(true);
        console.log(e);
      });
  }, []);

  if (isLoading) return <p>Loading!</p>;

  const labels = [...Object.keys(todos)];
  labels.splice(labels.indexOf("id"), 1);
  const loopp = [...labels];
  labels.push("edit", "delete");
  console.log("todos", todos);
  console.log("labels", labels);
  console.log("editEntity", editEntity);
  console.log("loopp", loopp);

  return (
    <div>
      <br />
      {todos.event.length !== 0 && (
        <>
          <Table striped bordered hover className="bg-light text-dark">
            <thead>
              <tr>
                <th>#</th>
                {labels.map((e) => (
                  <th key={e}>{e}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {todos.event.map((event, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{event}</td>
                  <td>{todos.person[index]}</td>
                  <td>{todos.pitch[index]}</td>
                  <td>{todos.time[index]}</td>
                  <td>
                    <>
                      <Navbar expand={false} className="dark text-light">
                        <Navbar.Toggle />
                        <Navbar.Offcanvas
                          className="bg-dark text-light"
                          placement="end"
                        >
                          <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand">
                              Edit Form
                            </Offcanvas.Title>
                          </Offcanvas.Header>
                          <Offcanvas.Body>
                            <Form className="d-grid gap-4 ms-4 me-4">
                              {Object.keys(data).map((element) => (
                                <Form.Group key={`${element}-asdasd`}>
                                  <Row>
                                    <Col>
                                      <Form.Select
                                        onChange={(e) => {
                                          eventObj[element] = e.target.value;
                                          setEditEntity((selectedOptions) => ({
                                            ...selectedOptions,
                                            ...eventObj,
                                          }));
                                        }}
                                        className="bg-dark text-light"
                                      >
                                        {data[element].map((e, i) => (
                                          <option key={`${i}`}>{e}</option>
                                        ))}
                                      </Form.Select>
                                    </Col>
                                  </Row>
                                </Form.Group>
                              ))}

                              <Row>
                                <Button
                                  variant="outline-light"
                                  onClick={() => {
                                    editEvent(todos, index, editEntity);
                                  }}
                                  disabled={editEntity === undefined}
                                >
                                  Edit item
                                </Button>
                              </Row>
                            </Form>
                          </Offcanvas.Body>
                        </Navbar.Offcanvas>
                      </Navbar>
                    </>
                  </td>
                  <td>
                    <Button
                      variant="outline-black"
                      onClick={() => {
                        deleteEvent(todos, index);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default Todos;
