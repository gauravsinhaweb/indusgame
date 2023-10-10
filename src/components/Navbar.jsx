import React from "react";
import useCookies from "react-cookie/cjs/useCookies";
import { handleLogout } from "../api";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
const NavBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "refresh_token",
  ]);
  const navigate = useNavigate();
  return (
    <Navbar fixed="top" expand="lg  " className="sticky">
      <Container className="nav-container">
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <span>Indus Game</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="ms-auto d-flex  w-100 justify-content-end"
            defaultActiveKey="#home"
          >
            <Nav.Item>
              <Nav.Link
                className="text-white"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="text-warning"
                onClick={() => handleLogout(cookies, removeCookie, navigate)}
                style={{ cursor: "pointer" }}
              >
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
