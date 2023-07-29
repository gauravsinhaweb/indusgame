import React from "react";
import useCookies from "react-cookie/cjs/useCookies";
import { handleLogout } from "../api";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "refresh_token",
  ]);
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <a
          onClick={() => navigate("/")}
          className="navbar-brand"
          style={{ cursor: "pointer" }}
        >
          Indusgame
        </a>
      </div>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li
            className="nav-item nav-link cursor-pointer"
            style={{ cursor: "pointer" }}
          >
            Login
          </li>
          <li
            onClick={() => handleLogout(cookies, removeCookie, navigate)}
            className="nav-item nav-link cursor-pointer"
            style={{ cursor: "pointer", color: "#ff0000" }}
          >
            Logout
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
