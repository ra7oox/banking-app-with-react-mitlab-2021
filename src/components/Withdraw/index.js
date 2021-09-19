import React, { useContext, useState } from "react";
import { Alert, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";

import TopMenu from "../TopMenu/index";
import Footer from "../Footer/index";
import { UserContext } from "../../App";

const Withdraw = () => {
  const [amount, setAmount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const context = useContext(UserContext);

  const validForm = () => {
    return amount > 0;
  };

  const validateInput = (input) => {
    if (+input.value <= 0) {
      input.classList.add("error");
      input.placeholder = "Please enter an amount greater than 0";
    } else {
      input.classList.remove("error");
    }
  };

  const submit = () => {
    if (context.loggedInUser.balance - +amount < 0) {
      setError("You cannot withdraw an amount greater than your balance");
      return false;
    }
    context.loggedInUser.balance -= +amount;
    setError("");
    setAmount(0);
    setSubmitted(true);
  };

  return (
    <>
      <TopMenu />
      {context.loggedInUser === null && (
        <Card className="centered">
          <Card.Img variant="top" src={Logo} />
          <Card.Body>
            <Card.Title className="centered bottom-margin">
              Withdraw from your account
            </Card.Title>
            <Alert variant="danger">
              You need to be logged in to withdraw from your account
            </Alert>
            <Link to="/" className="btn btn-dark">
              Login
            </Link>
          </Card.Body>
        </Card>
      )}
      {context.loggedInUser !== null && (
        <>
          <Card>
            <Card.Img variant="top" src={Logo} />
            <Card.Body>
              <Card.Title className="centered bottom-margin">
                Withdraw from your account
              </Card.Title>

              <Alert variant="warning">
                <h3>Balance: ${context.loggedInUser.balance}</h3>
              </Alert>

              <Alert variant="warning">
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      id="amount"
                      type="text"
                      placeholder="Withdraw amount"
                      value={amount}
                      onBlur={(e) => validateInput(e.target)}
                      onInput={(e) => {
                        if (isNaN(e.target.value)) {
                          alert("You must input a valid number greater than 0");
                          return false;
                        }
                        setAmount(e.target.value);
                      }}
                    />
                    {amount < 0 && (
                      <i>You must input a valid number greater than 0</i>
                    )}
                  </Form.Group>

                  {error !== "" && <Alert variant="danger">{error}</Alert>}
                  {submitted && (
                    <Alert variant="success">
                      You successfully withdraw from your account
                    </Alert>
                  )}
                  <Button
                    variant="dark"
                    type="button"
                    disabled={!validForm()}
                    onClick={submit}
                  >
                    Withdraw
                  </Button>
                </Form>
              </Alert>
            </Card.Body>
          </Card>
          <Footer />
        </>
      )}
    </>
  );
};

export default Withdraw;
