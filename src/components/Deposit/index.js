import React, { useContext, useState } from "react";
import { Alert, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import TopMenu from "../TopMenu/index";
import { UserContext } from "../../App";

const Deposit = () => {
  const [amount, setAmount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const context = useContext(UserContext);

  const validForm = () => {
    return amount > 0;
  };

  const validateInput = (input) => {
    if (+input.value <= 0) {
      input.style.border = "2px solid red";
      input.placeholder = "Please enter an amount greater than 0";
    } else {
      input.style.border = "1px solid #ced4da";
    }
  };

  const submit = () => {
    context.loggedInUser.balance += +amount;
    setError("");
    setAmount(0);
    setSubmitted(true);
  };

  return (
    <>
      <TopMenu />
      {context.loggedInUser === null && (
        <Card className="centered">
          <Alert variant="danger">
            You need to be logged in to add a deposit
          </Alert>
          <Link to="/" className="btn btn-primary">
            Login
          </Link>
        </Card>
      )}
      {context.loggedInUser !== null && (
        <>
          <Card>
            <Alert variant="warning">
              <h3>Balance: ${context.loggedInUser.balance}</h3>
            </Alert>

            <Alert variant="warning">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    id="amount"
                    type="number"
                    placeholder="Deposit amount"
                    value={amount}
                    onBlur={(e) => validateInput(e.target)}
                    onInput={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>

                {error !== "" && <Alert variant="danger">{error}</Alert>}
                {submitted && (
                  <Alert variant="success">
                    You successfully added a deposit in your account
                  </Alert>
                )}
                <Button
                  variant="dark"
                  type="button"
                  disabled={!validForm()}
                  onClick={submit}
                >
                  Submit
                </Button>
              </Form>
            </Alert>
          </Card>
        </>
      )}
    </>
  );
};

export default Deposit;
