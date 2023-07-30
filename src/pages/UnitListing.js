import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import useCookies from "react-cookie/cjs/useCookies";
import { handleGetUnits } from "../api";
import UnitRow from "../components/listing/UnitRow";
import { getSortingIcon } from "../utils";
import { useNavigate } from "react-router-dom";

const UnitListing = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
  const [units, setunits] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const getUnits = async () => {
    const res = await handleGetUnits(cookies, navigate);
    setunits(res);
  };
  useEffect(() => {
    getUnits();
  }, []);

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortDirection("asc");
    }
  };

  const sortedUnits = units?.slice().sort((a, b) => {
    if (sortColumn === "unitId") {
      return sortDirection === "asc"
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id);
    } else if (sortColumn === "quality") {
      return sortDirection === "asc"
        ? a.quality.localeCompare(b.quality)
        : b.quality.localeCompare(a.quality);
    } else if (sortColumn === "spawnCooldown") {
      return sortDirection === "asc"
        ? a["spawnCooldownInSeconds"] - b["spawnCooldownInSeconds"]
        : b["spawnCooldownInSeconds"] - a["spawnCooldownInSeconds"];
    } else {
      return sortDirection === "asc"
        ? a[sortColumn] - b[sortColumn]
        : b[sortColumn] - a[sortColumn];
    }
  });
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th onClick={() => handleSort("imageUrl")}>Image</th>
          <th onClick={() => handleSort("unitId")}>
            Unit ID {getSortingIcon("unitId", sortColumn, sortDirection)}
          </th>
          <th onClick={() => handleSort("quality")}>
            Quality {getSortingIcon("quality", sortColumn, sortDirection)}
          </th>
          <th onClick={() => handleSort("health")}>
            Health {getSortingIcon("health", sortColumn, sortDirection)}
          </th>
          <th onClick={() => handleSort("attack")}>
            Attack {getSortingIcon("attack", sortColumn, sortDirection)}
          </th>
          <th onClick={() => handleSort("maxTargetCount")}>
            Max Target Count{" "}
            {getSortingIcon("maxTargetCount", sortColumn, sortDirection)}
          </th>
          <th onClick={() => handleSort("spawnCost")}>
            Spawn Cost {getSortingIcon("spawnCost", sortColumn, sortDirection)}
          </th>
          <th onClick={() => handleSort("spawnCooldown")}>
            Spawn Cooldown{" "}
            {getSortingIcon("spawnCooldown", sortColumn, sortDirection)}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUnits &&
          sortedUnits.map((unit) => (
            <UnitRow _unit={unit} cookies={cookies} getUnits={getUnits} />
          ))}
      </tbody>
    </Table>
  );
};

export default UnitListing;
