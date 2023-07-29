import React from "react";
import { useState } from "react";
import { Button, ButtonGroup, Card, Table } from "react-bootstrap";
const UnitRow = (props) => {
  const { unit } = props;
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandState, setExpandState] = useState({});

  const cardData = [
    {
      title: "Atttack Type",
      value: unit?.attackType,
    },
    {
      title: " Moment Speed",
      value: unit?.movementSpeedType,
    },
    {
      title: "Ability",
      value: unit?.ability?.name,
    },
    {
      title: "Moment type",
      value: unit?.movementType,
    },
    {
      title: "Faction type",
      value: unit?.faction,
    },
  ];
  const handleEpandRow = (event, unitId) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(unitId);
    let obj = {};
    isRowExpanded ? (obj[unitId] = false) : (obj[unitId] = true);
    setExpandState(obj);
    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== unitId)
      : currentExpandedRows.concat(unitId);

    setExpandedRows(newExpandedRows);
  };
  const handleAction = (unitId, type) => {
    console.log("edit", unitId);
  };
  return (
    <>
      <tr
        onClick={(event) => handleEpandRow(event, unit.id)}
        key={unit.id}
        className={`${
          expandedRows.includes(unit.id) && "bg-dark text-white"
        } cursor-pointer`}
        style={{ cursor: "pointer" }}
      >
        <td>
          <img
            src={unit.imageUrl}
            alt={unit.id}
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          />
        </td>
        <td>{unit.id}</td>
        <td>{unit.quality}</td>
        <td>{unit.health.toLocaleString()}</td>
        <td>{unit.attack.toLocaleString()}</td>
        <td>{unit.maxTargetCount}</td>
        <td>{unit.spawnCost.toLocaleString()}</td>
        <td>{unit.spawnCooldownInSeconds}</td>
      </tr>
      {expandedRows.includes(unit.id) && (
        <tr>
          <td colSpan="12" className="bg-secondary">
            <div>
              <h1>
                <span className="badge badge-secondary">{unit.name}</span>
              </h1>
              <h4>
                <span className="badge badge-secondary">
                  <i>{unit.description}</i>
                </span>
              </h4>
            </div>
            <div className="d-flex justify-content-around">
              {cardData &&
                cardData.map((data) => (
                  <Card className="bg-dark text-white">
                    <Card.Body>
                      <Card.Title>{data.title}</Card.Title>
                      <Card.Text>
                        <div className="text-center">{data.value}</div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </td>
        </tr>
      )}
      {expandedRows.includes(unit.id) && (
        <tr>
          <td colSpan="12" className="bg-secondary">
            <div className="d-flex justify-content-end">
              <ButtonGroup>
                {" "}
                <Button variant="success" onClick={() => handleAction(unit.id)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  // onClick={() => handleDelete(unit.id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default UnitRow;
