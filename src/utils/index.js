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
    if (apiName == "logouts") {
      removeCookie("access_token");
      removeCookie("refresh_token");
      localStorage.removeItem("tokenExpire");
    } else if (apiName == "auths") {
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
