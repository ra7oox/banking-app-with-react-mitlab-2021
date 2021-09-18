import React, { useContext, useState } from "react";
import { Alert, Card, Form, Button } from "react-bootstrap";

import TopMenu from "../TopMenu/index";
import { UserContext } from "../../App";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const context = useContext(UserContext);

  const validForm = () => {
    return name.trim() !== "" && email.trim() !== "" && password.trim() !== "";
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
    if (foundUsers.length > 0) {
      setError(
        "This email is already used by another account. Please use a different email"
      );
      return false;
    }
    context.users.push({
      name: name,
      email: email,
      password: password,
      createdDate: new Date(),
      balance: 0,
    });
    setError("");
    setSubmitted(true);
  };

  const newAccount = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
    setSubmitted(false);
  };

  return (
    <>
      <TopMenu />
      <Card>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onBlur={(e) => validateInput(e.target)}
              onInput={(e) => setName(e.target.value)}
            />
          </Form.Group>

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
          {submitted && (
            <>
              <Alert variant="success">
                Your account was successfully created!
              </Alert>
              <Button variant="dark" type="button" onClick={newAccount}>
                Create New Account
              </Button>
            </>
          )}
        </Form>
      </Card>
    </>
  );
};

export default CreateAccount;
