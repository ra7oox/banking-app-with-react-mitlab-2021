import React, { useContext } from "react";
import { Table, Card } from "react-bootstrap";
import Logo from "../../img/logo.png";

import TopMenu from "../TopMenu/index";
import Footer from "../Footer/index";
import { UserContext } from "../../App";

const AllData = () => {
  const context = useContext(UserContext);
  // Add all users transactions in a single array ordered by date
  const transactions = [];
  for (let user of context.users) {
    for (let transaction of user.transactions) {
      transactions.push({
        account: user.name,
        operation: transaction.operation,
        amount: transaction.amount,
        createdDate: transaction.createdDate,
      });
    }
  }
  transactions.sort(
    (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
  );

  return (
    <>
      <TopMenu />
      <Card className="centered">
        <Card.Img variant="top" src={Logo} />
        <Card.Body className="table-container borderless">
          <h3>Accounts</h3>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Balance</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {context.users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.balance}</td>
                    <td>{item.createdDate.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <h3>Transactions</h3>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Account</th>
                <th>Operation</th>
                <th>Amount</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.account}</td>
                    <td>{item.operation}</td>
                    <td>{item.amount}</td>
                    <td>{item.createdDate.toLocaleString()}</td>
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
