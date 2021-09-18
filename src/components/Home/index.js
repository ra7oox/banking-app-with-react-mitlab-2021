import React, { useState, useContext } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import Logo from "../../img/logo.png";

import TopMenu from "../TopMenu/index";
import { UserContext } from "../../App";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const context = useContext(UserContext);

  const validForm = () => {
    return email.trim() !== "" && password.trim() !== "";
  };

  const validateInput = (input) => {
    if (input.value === "") {
      input.style.border = "2px solid red";
      input.placeholder = "Please enter a value to continue";
    } else {
      input.style.border = "1px solid #ced4da";
    }
  };

  const submit = () => {
    const foundUsers = context.users.filter((item) => item.email === email);
    if (foundUsers.length === 0 || foundUsers[0].password !== password) {
      setError("Incorrect email or password");
      return false;
    }
    context.loggedInUser = foundUsers[0];
    setSubmitted(true);
  };

  return (
    <>
      <TopMenu />
      <Card className="centered">
        <Card.Img variant="top" src={Logo} />
        <Card.Body>
          <Card.Title>
            Welcome{" "}
            {context.loggedInUser !== null ? context.loggedInUser.name : ""} to
            the Awesome Bank
          </Card.Title>
          <Card.Text>Thank you for choosing our system</Card.Text>
          {context.loggedInUser === null && (
            <Card.Text>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onBlur={(e) => validateInput(e.target)}
                    onInput={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onBlur={(e) => validateInput(e.target)}
                    onInput={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {error !== "" && <Alert variant="danger">{error}</Alert>}
                {!submitted && (
                  <Button
                    variant="dark"
                    type="button"
                    disabled={!validForm()}
                    onClick={submit}
                  >
                    Submit
                  </Button>
                )}
              </Form>
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Home;
