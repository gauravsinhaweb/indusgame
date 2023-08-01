import React from "react";
import { Card, Table } from "react-bootstrap";

const SaleListing = ({ sale }) => {
  return (
    <Card
      style={{ width: "25rem", height: "auto" }}
      className="d-flex p-2 bg-dark text-white justify-content-between align-items-start "
    >
      <Card.Body className="w-100">
        <Card.Title>{sale.date}</Card.Title>
        <Card.Text>
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Card</th>
                <th>Quantity</th>
              </tr>
            </thead>{" "}
            {sale.packs?.map((pack) => {
              return (
                <tbody key={pack.id}>
                  <tr>
                    <td>{pack.id}</td>
                    <td>{pack.quantity}</td>
                  </tr>
                </tbody>
              );
            })}{" "}
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SaleListing;
