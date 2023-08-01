import React from "react";
import { Badge, Card } from "react-bootstrap";

const InsightCard = ({ insights }) => {
  return (
    <Card
      style={{ width: "25rem", height: "auto" }}
      className="d-flex p-2 bg-primary text-white justify-content-between align-items-start "
    >
      <Card.Body>
        <Card.Title>
          <Badge className="bg-dark">Insights:</Badge>{" "}
        </Card.Title>
        <Card.Text>
          <p>
            Most sold pack (USD):{" "}
            <strong> {`$ ${insights.mostSoldPackUSD}`}</strong>
          </p>
          <p>
            Most sold pack quantity:{" "}
            <strong> {insights.mostSoldPackQuantity}</strong>
          </p>
          <p>
            Least sold pack (USD):{" "}
            <strong>{`$ ${insights.leastSoldPackUSD}`}</strong>
          </p>
          <p>
            Least sold pack quantity:{" "}
            <strong> {insights.leastSoldPackQuantity}</strong>
          </p>
          <p>
            Total sales in USD:
            <strong>
              {` $ ${insights.totalSalesInUSD?.toLocaleString()}`}
            </strong>
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default InsightCard;
