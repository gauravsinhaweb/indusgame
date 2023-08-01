import React from "react";
import { Card } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex hero justify-content-center align-items-center h-100">
      <div
        className="d-flex m-2 flex-wrap justify-content-around align-items-center h-100 py-4"
        style={{ gap: "2rem" }}
      >
        <Card
          style={{ maxWidth: "25rem", cursor: "pointer" }}
          onClick={() => navigate("/units")}
          className="bg-dark p-1 text-white w-sm-25 hero-card"
        >
          <Card.Body>
            <Card.Title>Units</Card.Title>
            <Card.Text>
              <p>
                Units can be part of a strategy game, collectible card game, or
                any other type of game that involves different characters with
                unique abilities, stats, and characteristics.
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          style={{ maxWidth: "25rem", cursor: "pointer" }}
          onClick={() => navigate("/units")}
          className="bg-dark p-1 text-white w-sm-25 hero-card"
        >
          <Card.Body>
            <Card.Title>Packs and sales</Card.Title>
            <Card.Text>
              <p>
                Game can analyze and visualize various aspects of pack sales,
                such as the most and least sold packs (both in terms of USD and
                quantity) during a given time period.
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Hero;
