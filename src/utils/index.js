import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { handleDeleteUnit, handleSaveUnit } from "../api";
import { toast } from "react-toastify";

export const handleValidation = (
  username,
  password,
  setusernameError,
  setpasswordError
) => {
  let formIsValid = true;
  if (!username.match(/^[a-z]{1}(?!.*\.{2})[a-z.]{0,18}[a-z]{1}$/)) {
    formIsValid = false;
    setusernameError(
      "Ensure the username has 5 to 20 lowercase ASCII letters, with at maximum one period (.) anywhere but as the first or last character. At maximum, the username can have 20 characters."
    );
    return false;
  } else {
    setusernameError("");
    formIsValid = true;
  }
  if (!password.match(/^.{10,64}$/)) {
    formIsValid = false;
    setpasswordError(
      "Ensure the password is between 10 and 64 characters long"
    );
    return false;
  } else {
    setpasswordError("");
    formIsValid = true;
  }
  return formIsValid;
};

export const handleSetCookie = (response, setCookie, apiName, removeCookie) => {
  try {
    if (apiName === "logouts") {
      console.log("logout called");
      removeCookie("access_token");
      removeCookie("refresh_token");
      localStorage.removeItem("tokenExpire");
    } else if (apiName === "auths") {
      const expiresInSeconds = response?.expiresInSeconds;
      setCookie("access_token", response?.accessToken, {
        path: "/",
        maxAge: expiresInSeconds,
      });
      setCookie("refresh_token", response?.refreshToken, {
        path: "/",
        maxAge: expiresInSeconds,
      });
      localStorage.setItem("tokenExpire", expiresInSeconds);
    } else {
      const expiresInSeconds = response?.auth?.expiresInSeconds;
      setCookie("access_token", response.auth.accessToken, {
        path: "/",
        maxAge: expiresInSeconds,
      });
      setCookie("refresh_token", response.auth.refreshToken, {
        path: "/",
        maxAge: expiresInSeconds,
      });
      localStorage.setItem("tokenExpire", expiresInSeconds);
    }
  } catch (error) {
    console.log("Failed to set cookie", error);
  }
};

export const getSortingIcon = (columnName, sortColumn, sortDirection) => {
  if (sortColumn === columnName) {
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
  }
  return <FaSort />;
};

export const handleEpandRow = (
  event,
  unitId,
  expandedRows,
  setExpandedRows
) => {
  const currentExpandedRows = expandedRows;
  const isRowExpanded = currentExpandedRows.includes(unitId);
  let obj = {};
  isRowExpanded ? (obj[unitId] = false) : (obj[unitId] = true);
  const newExpandedRows = isRowExpanded
    ? currentExpandedRows.filter((id) => id !== unitId)
    : currentExpandedRows.concat(unitId);

  setExpandedRows(newExpandedRows);
};

const validateIntegerInput = (inputValue, minValue, maxValue, divisibleBy) => {
  const numberValue = parseInt(inputValue, 10);
  return (
    Number.isInteger(numberValue) &&
    numberValue >= minValue &&
    numberValue <= maxValue &&
    numberValue % divisibleBy === 0
  );
};

// Helper function to validate spawnCooldown input
const validateSpawnCooldownInput = (inputValue) => {
  const numberValue = parseFloat(inputValue);
  return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 100;
};

export const handleAction = (
  e,
  cookies,
  unitId,
  type,
  setIsEditing,
  quality,
  health,
  attack,
  maxTargetCount,
  spawnCost,
  spawnCooldown,
  setUnit
) => {
  e.stopPropagation();
  if (type === "edit") {
    setIsEditing(true);
  } else if (type === "save") {
    if (!validateIntegerInput(health, 5, 10000, 5)) {
      toast(
        "Health must be an integer between 5 and 10,000 and divisible by 5."
      );
      return;
    }

    if (!validateIntegerInput(attack, 5, 500, 5)) {
      toast("Attack must be an integer between 5 and 500 and divisible by 5.");
      return;
    }

    if (!validateIntegerInput(maxTargetCount, 1, 100, 1)) {
      toast("Max Target Count must be an integer between 1 and 100.");
      return;
    }

    if (!validateIntegerInput(spawnCost, 0, 1000, 5)) {
      toast(
        "Spawn Cost must be an integer between 0 and 1000 and divisible by 5."
      );
      return;
    }

    if (!validateSpawnCooldownInput(spawnCooldown)) {
      toast("Spawn Cooldown must be between 0 and 100.");
      return;
    }
    const data = {
      id: unitId,
      quality,
      health,
      attack,
      maxTargetCount,
      spawnCost,
      spawnCooldown,
    };
    const res = handleSaveUnit(cookies, unitId, data);
    res.then((res) => {
      setUnit(res);
      toast.success("Updated!");
      setIsEditing(false);
    });
  } else if (type === "delete") {
    const data = {
      id: unitId,
      quality,
      health,
      attack,
      maxTargetCount,
      spawnCost,
      spawnCooldown,
    };
    const res = handleDeleteUnit(cookies, unitId, data);
    res.then((res) => {
      if (res.status === 204) {
        toast.success("Deleted!");
      }
    });
  }
};
