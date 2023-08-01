import React, { useState } from "react";
import useCookies from "react-cookie/cjs/useCookies";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../api";
import { handleValidation } from "../utils";
import { toast } from "react-toastify";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [usernameError, setusernameError] = useState("");
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
  const guestCredentials = {
    username: "gaurav.sinha",
    password: process.env.REACT_APP_GUEST_PASSWORD,
  };
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    handleValidation(username, password, setusernameError, setpasswordError);
    if (handleValidation) {
      const res = await handleLogin(username, password, setCookie);
      if (res?.data?.auth?.accessToken?.length > 0) {
        navigate("/units");
      }
      if (res?.response?.status === 400) {
        toast.warning("Invalid Credentials");
      }
    }
  };

  const handlerGuestLogin = (e, guestCredentials) => {
    e.preventDefault();
    setUsername(guestCredentials.username);
    setPassword(guestCredentials.password);
  };
  return (
    <div className="login d-flex h-100 justify-content-center align-items-center">
      <div className="container br-4">
        <h4 className="text-center text-white">Login</h4>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 border p-4 m-2 login-content">
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
                <label className="text-white">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="UsernameInput"
                  name="UsernameInput"
                  value={username}
                  aria-describedby="usernameHelp"
                  placeholder="Enter username"
                  onChange={(event) => setUsername(event.target.value)}
                />
                <small id="usernameHelp" className="text-danger form-text">
                  {usernameError}
                </small>
              </div>
              <div className="form-group">
                <label className="text-white">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <div className="d-flex h-100 justify-content-center align-items-center">
                <button
                  onClick={(e) => handlerGuestLogin(e, guestCredentials)}
                  className="btn btn-secondary mr-2"
                >
                  Guest Login
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
