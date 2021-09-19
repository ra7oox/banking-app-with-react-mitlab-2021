import React, { useContext } from "react";
import { Table, Card } from "react-bootstrap";
import Logo from "../../img/logo.png";

import TopMenu from "../TopMenu/index";
import Footer from "../Footer/index";
import { UserContext } from "../../App";

const AllData = () => {
  const context = useContext(UserContext);

  return (
    <>
      <TopMenu />
      <Card className="centered">
        <Card.Img variant="top" src={Logo} />
        <Card.Body className="table-container">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {context.users.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.balance}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Footer />
    </>
  );
};

export default AllData;
