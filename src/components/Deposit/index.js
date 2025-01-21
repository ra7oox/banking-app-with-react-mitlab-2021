import React, { useState } from "react";
import { Alert, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../img/logo.png";

import TopMenu from "../TopMenu/index";
import Footer from "../Footer/index";
import { deposit } from "../../actions/userActions";


const Deposit = () => {
  const [amount, setAmount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();

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
    if (!validForm()) {
      setError("You must enter a valid deposit amount greater than 0.");
      return;
    }

    dispatch(deposit(+amount)); // Utilisation de Redux pour gérer l'état
    setError("");
    setAmount(0);
    setSubmitted(true);
  };

  return (
    <>
      <TopMenu />
      {!loggedInUser && (
        <Card className="centered">
          <Card.Img variant="top" src={Logo} />
          <Card.Body>
            <Card.Title className="centered bottom-margin">
              Deposit to your account
            </Card.Title>
            <Alert variant="danger">
              You need to be logged in to add a deposit
            </Alert>
            <Link to="/" className="btn btn-dark">
              Login
            </Link>
          </Card.Body>
        </Card>
      )}
      {loggedInUser && (
        <>
          <Card>
            <Card.Img variant="top" src={Logo} />
            <Card.Body>
              <Card.Title className="centered bottom-margin">
                Deposit to your account
              </Card.Title>

              <Alert variant="warning">
                <h3>Balance: ${loggedInUser.balance}</h3>
              </Alert>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Deposit Amount:</Form.Label>
                  <Form.Control
                    id="amount"
                    type="text"
                    placeholder="Deposit amount"
                    value={amount}
                    onBlur={(e) => validateInput(e.target)}
                    onInput={(e) => {
                      if (isNaN(e.target.value)) {
                        setError("You must input a valid number greater than 0");
                        return;
                      }
                      setAmount(e.target.value);
                      setError("");
                    }}
                  />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}
                {submitted && (
                  <Alert variant="success">
                    You successfully added a deposit to your account.
                  </Alert>
                )}
                <Button
                  variant="dark"
                  type="button"
                  disabled={!validForm()}
                  onClick={submit}
                >
                  Deposit
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Footer />
        </>
      )}
    </>
  );
};

export default Deposit;
