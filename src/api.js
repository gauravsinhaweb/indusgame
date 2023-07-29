import { toast } from "react-toastify";
import { API } from "./config";
import { handleSetCookie } from "./utils";
import axios from "axios";

export const handleLogin = async (username, password, setCookie) => {
  try {
    const loginAPI = API.BASE + API.LOGIN;
    const loginData = {
      username: username,
      password: password,
    };

    const loginResponse = await axios.post(loginAPI, loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loginResponse.data.auth.accessToken}`;

    const loginResponseData = loginResponse.data;
    if (loginResponseData?.auth?.accessToken.length > 0) {
      handleSetCookie(loginResponseData, setCookie);
      toast.success("Login Success!");
    }

    return loginResponseData;
  } catch (error) {
    console.log(error);
  }
};

export const handleRefreshToken = async (e, cookies, setCookie) => {
  e && e.preventDefault();
  try {
    const url = API.BASE + API.REFRESH;
    const refreshToken = cookies?.refresh_token;
    const body = { refreshToken };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("Access Token:", data.accessToken);
    console.log("called at", new Date().toLocaleTimeString());
    handleSetCookie(data, setCookie, "auths");
  } catch (error) {
    console.error("Error while renewing access token:", error.message);
  }
};
export const handleLogout = async (cookies, removeCookie, navigate) => {
  try {
    const url = API.BASE + API.LOGOUT;
    const headers = {
      Authorization: `Bearer ${cookies?.access_token}`,
    };
    const response = await fetch(url, {
      method: "POST",
      headers,
    });
    if (response.status === 202) toast.success("Logout Success!");
    if (response.status === 401) {
      toast.error("you need to log in");
    }
    navigate("/login");
    handleSetCookie(null, null, "logouts", removeCookie);
  } catch (error) {
    toast.error("Logout Failed!");
    console.error("Error while logging out:", error.message);
  }
};
