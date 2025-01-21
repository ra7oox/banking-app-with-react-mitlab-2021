import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button, Card, Form } from "react-bootstrap";
import Logo from "../../img/logo.png";

import TopMenu from "../TopMenu/index";
import Footer from "../Footer/index";
import { login } from "../../actions/userActions";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { loggedInUser, error } = useSelector((state) => state.user);

  const validForm = () => {
    return email.trim() !== "" && password.trim() !== "";
  };

  const handleLogin = () => {
    dispatch(login(email, password));
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <TopMenu />
      <Card>
        <Card.Img variant="top" src={Logo} />
        <Card.Body>
          <Card.Title className="centered">
            Welcome {loggedInUser ? loggedInUser.name : ""} to the Awesome Bank
          </Card.Title>
          <Card.Text className="centered">
            Thank you for choosing our system
          </Card.Text>
          {!loggedInUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}
              <Button
                variant="dark"
                type="button"
                disabled={!validForm()}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
      <Footer />
    </>
  );
};

export default Home;
