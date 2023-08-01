import React from "react";
import { Card } from "react-bootstrap";

const PackListing = ({ pack }) => {
  return (
    <Card
      style={{ width: "25rem" }}
      className="d-flex p-2 bg-dark text-white justify-content-between align-items-center "
    >
      <Card.Img variant="top" src={pack.imageUrl} className="h-25 w-25" />
      <Card.Body>
        <Card.Title>{pack.title}</Card.Title>
        <Card.Text>
          {pack.cards?.map((card) => {
            return (
              <div key={card.id} className="d-flex justify-content-between">
                <span>
                  <strong>{card.id}</strong>
                </span>
                <span>{card.quantity}</span>
              </div>
            );
          })}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PackListing;
