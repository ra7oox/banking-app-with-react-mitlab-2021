import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import ReactTooltip from "react-tooltip";

import { UserContext } from "../../App";

const TopMenu = () => {
  const context = useContext(UserContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          Awesome Bank <br />
          <i>
            {context.loggedInUser !== null
              ? `Logged in as ${context.loggedInUser.name}`
              : "You are not logged in"}
          </i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              data-tip="Welcome page of Awesome Bank"
              exact={true}
              activeClassName="nav-link-active"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              data-tip="Create a new Account access"
              exact={true}
              activeClassName="nav-link-active"
              to="/create-account"
            >
              Create Account
            </NavLink>
            <NavLink
              data-tip="Deposit money into your account"
              exact={true}
              activeClassName="nav-link-active"
              to="/deposit"
            >
              Deposit
            </NavLink>
            <NavLink
              data-tip="Withdraw money from your account"
              exact={true}
              activeClassName="nav-link-active"
              to="/withdraw"
            >
              Withdraw
            </NavLink>
            <NavLink
              data-tip="View all accounts created during this session"
              exact={true}
              activeClassName="nav-link-active"
              to="/all-data"
            >
              All Data
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <ReactTooltip />
      </Container>
    </Navbar>
  );
};

export default TopMenu;
