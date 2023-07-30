import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
  GiArrowsShield,
  GiBrassKnuckles,
  GiFencer,
  GiPickOfDestiny,
  GiThunderball,
} from "react-icons/gi";
import { handleAction, handleEpandRow } from "../../utils";

const UnitRow = (props) => {
  const { _unit, cookies, getUnits } = props;
  const [expandedRows, setExpandedRows] = useState([]);
  const [unit, setunit] = useState(_unit);
  const [quality, setQuality] = useState(unit?.quality);
  const [health, setHealth] = useState(unit?.health);
  const [attack, setAttack] = useState(unit?.attack);
  const [maxTargetCount, setMaxTargetCount] = useState(unit?.maxTargetCount);
  const [spawnCost, setSpawnCost] = useState(unit?.spawnCost);
  const [isEditing, setIsEditing] = useState(false);
  const [spawnCooldown, setSpawnCooldown] = useState(
    unit?.spawnCooldownInSeconds
  );
  useEffect(() => {
    setunit(_unit);
  }, [_unit]);

  const cardData = [
    {
      title: "Attack Type",
      value: unit?.attackType,
      icon: <GiArrowsShield size={36} />,
      color: "#fde047",
    },
    {
      title: " Moment Speed",
      value: unit?.movementSpeedType,
      icon: <GiThunderball size={36} />,
      color: "#67e8f9",
    },
    {
      title: "Ability",
      value: unit?.ability?.name,
      icon: <GiFencer size={36} />,
      color: "#cbd5e1",
    },
    {
      title: "Moment type",
      value: unit?.movementType,
      icon: <GiBrassKnuckles size={36} />,
      color: "#a5b4fc",
    },
    {
      title: "Faction type",
      value: unit?.faction,
      icon: <GiPickOfDestiny size={36} />,
      color: "#d8b4fe",
    },
  ];
  const formInputData = [
    {
      id: "health",
      title: "Health",
      type: "number",
      min: "5",
      max: "10000",
      step: "5",
      value: health,
      onChange: (e) => setHealth(Number(e.target.value)),
    },
    {
      id: "attack",
      title: "Attack",
      type: "number",
      min: "5",
      max: "500",
      step: "5",
      value: attack,
      onChange: (e) => setAttack(Number(e.target.value)),
    },
    {
      id: "maxTargetCount",
      title: "Max Target Count",
      type: "number",
      min: "1",
      max: "100",
      value: maxTargetCount,
      onChange: (e) => setMaxTargetCount(Number(e.target.value)),
    },
    {
      id: "spawnCost",
      title: "Spawn Cost",
      type: "number",
      min: "0",
      max: "100",
      step: "5",
      value: spawnCost,
      onChange: (e) => setSpawnCost(Number(e.target.value)),
    },
    {
      id: "spawnCooldownInSeconds",
      title: "Spawn Cooldown",
      type: "number",
      value: spawnCooldown,
      onChange: (e) => setSpawnCooldown(Number(e.target.value)),
    },
  ];
  return (
    <>
      <tr
        onClick={(event) =>
          handleEpandRow(event, unit.id, expandedRows, setExpandedRows)
        }
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

        <td>
          {" "}
          {isEditing ? (
            <Form.Group
              onClick={(e) => e.stopPropagation()}
              controlId="quality"
            >
              <Form.Control
                as="select"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              >
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
              </Form.Control>
            </Form.Group>
          ) : (
            unit.quality
          )}
        </td>

        {formInputData &&
          formInputData.map((data) => (
            <td>
              {isEditing ? (
                <Form.Group
                  onClick={(e) => e.stopPropagation()}
                  controlId={data.title}
                >
                  <Form.Control
                    type={data.type}
                    min={data.min}
                    max={data.max}
                    step={data.step}
                    placeholder={data.title}
                    value={data.value}
                    onChange={data.onChange}
                  />
                </Form.Group>
              ) : (
                unit[data.id]
              )}
            </td>
          ))}
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
                    <Card.Body className="d-flex justify-content-center align-items-center flex-column gap-3">
                      <Card.Text>{data.title}</Card.Text>
                      <span className="py-2" style={{ color: data.color }}>
                        {data.icon}
                      </span>
                      <Card.Title>
                        <div
                          className="text-center"
                          style={{ color: data.color }}
                        >
                          {data.value}
                        </div>
                      </Card.Title>
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
                <Button
                  variant="success"
                  onClick={(e) => {
                    handleAction(
                      e,
                      cookies,
                      unit.id,
                      isEditing ? "save" : "edit",
                      setIsEditing,
                      quality,
                      health,
                      attack,
                      maxTargetCount,
                      spawnCost,
                      spawnCooldown,
                      setunit
                    );
                    getUnits();
                  }}
                >
                  {isEditing ? "Save" : "Edit"}
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) =>
                    handleAction(
                      e,
                      cookies,
                      unit.id,
                      "delete",
                      null,
                      quality,
                      health,
                      attack,
                      maxTargetCount,
                      spawnCost,
                      spawnCooldown,
                      setunit
                    )
                  }
                >
                  Delete
                </Button>{" "}
                {isEditing && (
                  <Button variant="dark" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                )}
              </ButtonGroup>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default UnitRow;
