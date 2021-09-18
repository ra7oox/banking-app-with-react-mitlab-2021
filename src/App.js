import "./App.css";
import { Route } from "react-router-dom";
import React, { createContext } from "react";
import { Container } from "react-bootstrap";

import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import AllData from "./components/AllData";

///// Global context
export const UserContext = createContext(null);

const App = () => {
  return (
    <React.StrictMode>
      <UserContext.Provider value={{ users: [], loggedInUser: null }}>
        <Container fluid>
          <Route path="/" exact component={Home} />
          <Route path="/create-account" exact component={CreateAccount} />
          <Route path="/deposit" exact component={Deposit} />
          <Route path="/withdraw" exact component={Withdraw} />
          <Route path="/all-data" exact component={AllData} />
        </Container>
      </UserContext.Provider>
    </React.StrictMode>
  );
};

export default App;
