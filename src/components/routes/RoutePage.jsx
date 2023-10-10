import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../../pages/Login";
import UnitListing from "../../pages/UnitListing";
import useCookies from "react-cookie/cjs/useCookies";
import { PrivateRoute } from "./PrivateRoute";
import Cards from "../../pages/Cards";

const RoutePage = () => {
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route exact path="/login" element={<Login />}></Route>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute isTokenExpired={!Boolean(cookies?.access_token)} />
        }
      >
        <Route path="/units" element={<UnitListing />}></Route>
        <Route path="/cards" element={<Cards />}></Route>
      </Route>
    </Routes>
  );
};

export default RoutePage;
