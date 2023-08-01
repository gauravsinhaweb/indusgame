import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../../pages/Login";
import UnitListing from "../../pages/UnitListing";
import useCookies from "react-cookie/cjs/useCookies";
import { PrivateRoute } from "./PrivateRoute";
import Cards from "../../pages/Cards";
import Hero from "../../pages";

const RoutePage = () => {
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
  return (
    <Routes>
      {" "}
      <Route
        exact
        path="/"
        element={
          <PrivateRoute isTokenExpired={!Boolean(cookies?.access_token)} />
        }
      >
        <Route path="/" element={<Hero />} />
        <Route path="/units" element={<UnitListing />}></Route>
        <Route path="/cards" element={<Cards />}></Route>
      </Route>
      <Route exact path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default RoutePage;
