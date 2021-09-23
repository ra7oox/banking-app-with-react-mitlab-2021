import React, { useContext, useState } from "react";
import { Alert, Card, Form, Button } from "react-bootstrap";
import Logo from "../../img/logo.png";

import TopMenu from "../TopMenu/index";
import Footer from "../Footer/index";
import { UserContext } from "../../App";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const context = useContext(UserContext);

  const validForm = () => {
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      password.length >= 8
    );
  };

  const validateInput = (input, errorText) => {
    if (input.value === "") {
      input.classList.add("error");
      input.placeholder = errorText;
    } else {
      input.classList.remove("error");
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
      transactions: [],
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
        <Card.Img variant="top" src={Logo} />
        <Card.Body>
          <Card.Title className="centered">Create a new account</Card.Title>
          <Form>
            {!submitted && (
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onBlur={(e) =>
                    validateInput(e.target, "Name cannot be empty")
                  }
                  onInput={(e) => setName(e.target.value)}
                />
              </Form.Group>
            )}

            {!submitted && (
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
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
            )}

            {!submitted && (
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onBlur={(e) =>
                    validateInput(
                      e.target,
                      "Password needs to have at least 8 characters"
                    )
                  }
                  onInput={(e) => setPassword(e.target.value)}
                />
                {password.length < 8 && (
                  <i>* Password must have more than 8 characters</i>
                )}
              </Form.Group>
            )}

            {error !== "" && <Alert variant="danger">{error}</Alert>}
            {!submitted && (
              <Button
                variant="dark"
                type="button"
                disabled={!validForm()}
                onClick={submit}
              >
                Create Account
              </Button>
            )}
            {submitted && (
              <>
                <Alert variant="success">
                  Your account was successfully created!
                </Alert>
                <Button variant="dark" type="button" onClick={newAccount}>
                  Add Another Account
                </Button>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
      <Footer />
    </>
  );
};

export default CreateAccount;
