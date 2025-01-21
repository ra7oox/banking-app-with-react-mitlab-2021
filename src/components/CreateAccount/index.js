import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, resetAccountForm, setError } from "../../actions/userActions";
import { Alert, Card, Form, Button } from "react-bootstrap";
import Logo from "../../img/logo.png";
import TopMenu from "../TopMenu/index";
import Footer from "../Footer/index";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, submitted } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const validForm = () => {
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      password.length >= 8
    );
  };

  const submit = () => {
    const newUser = {
      name,
      email,
      password,
      createdDate: new Date(),
      balance: 0,
      transactions: [],
    };
    dispatch(createAccount(newUser));
  };

  const newAccount = () => {
    setName("");
    setEmail("");
    setPassword("");
    dispatch(resetAccountForm());
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
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {password.length < 8 && (
                    <i>* Password must have more than 8 characters</i>
                  )}
                </Form.Group>
              </>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
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
                <Button variant="dark" onClick={newAccount}>
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
