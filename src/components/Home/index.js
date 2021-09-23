import React, { useState, useContext } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import Logo from "../../img/logo.png";

import TopMenu from "../TopMenu/index";
import Footer from "../Footer/index";
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

  const validateInput = (input, errorMessage) => {
    if (input.value === "") {
      input.classList.add("error");
      input.placeholder = errorMessage;
    } else {
      input.classList.remove("error");
    }
  };

  const submit = () => {
    const foundUsers = context.users.filter((item) => item.email === email);
    if (foundUsers.length === 0 || foundUsers[0].password !== password) {
      setError("Incorrect email or password");
      return false;
    }
    context.loggedInUser = foundUsers[0];
    setEmail("");
    setPassword("");
    setSubmitted(true);
  };

  return (
    <>
      <TopMenu />
      <Card>
        <Card.Img variant="top" src={Logo} />
        <Card.Body>
          <Card.Title className="centered">
            Welcome{" "}
            {context.loggedInUser !== null ? context.loggedInUser.name : ""} to
            the Awesome Bank
          </Card.Title>
          <Card.Text className="centered">
            Thank you for choosing our system
          </Card.Text>
          {context.loggedInUser === null && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onBlur={(e) =>
                    validateInput(e.target, "Email cannot be empty")
                  }
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
                  onBlur={(e) =>
                    validateInput(e.target, "Password cannot be empty")
                  }
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
                  Login
                </Button>
              )}
            </Form>
          )}
        </Card.Body>
      </Card>
      <Footer />
    </>
  );
};

export default Home;
