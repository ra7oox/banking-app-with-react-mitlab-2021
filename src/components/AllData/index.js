import React from "react";
import { useSelector } from "react-redux";
import { Table, Card } from "react-bootstrap";
import Logo from "../../img/logo.png";

import TopMenu from "../TopMenu/index";
import Footer from "../Footer/index";

const AllData = () => {
  // Accéder à l'état global via Redux
  const { users } = useSelector((state) => state.user);

  // Vérifier que les utilisateurs ont des transactions
  const transactions = users.flatMap((user) =>
    user.transactions.map((transaction) => ({
      account: user.name,
      operation: transaction.operation,
      amount: transaction.amount,
      createdDate: new Date(transaction.createdDate),
    }))
  );

  // Trier les transactions par date (du plus récent au plus ancien)
  transactions.sort((a, b) => b.createdDate - a.createdDate);

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
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.balance}</td>
                  <td>{new Date(user.createdDate).toLocaleString()}</td>
                </tr>
              ))}
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
              {transactions.map((item, index) => (
                <tr key={index}>
                  <td>{item.account}</td>
                  <td>{item.operation}</td>
                  <td>{item.amount}</td>
                  <td>{item.createdDate.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Footer />
    </>
  );
};

export default AllData;
