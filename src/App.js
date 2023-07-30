import { Flip, ToastContainer, toast } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar";
import RoutePage from "./components/routes/RoutePage";
import { constants } from "./constants";
import useCookies from "react-cookie/cjs/useCookies";
import { handleRefreshToken } from "./api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const expirationTime = localStorage.getItem("tokenExpire");
    const numericExpirationTime = Date.now() + Number(expirationTime) * 1000;
    const timeout = numericExpirationTime - Date.now() - constants.RENEW_BEFORE; //renew before expires;

    const refreshTimer = setTimeout(async () => {
      if (!cookies?.refresh_token) return;
      try {
        await handleRefreshToken(null, cookies, setCookie);
      } catch (error) {
        console.error("Error while refreshing access token:", error);
        toast.error("Error while refreshing access token");
        navigate("/login");
      }
    }, timeout);
    return () => {
      clearTimeout(refreshTimer);
    };
  }, [cookies]);
  return (
    <div className="main">
      <Navbar />
      <RoutePage />
      <ToastContainer
        theme="dark"
        autoClose={2000}
        transition={Flip}
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
