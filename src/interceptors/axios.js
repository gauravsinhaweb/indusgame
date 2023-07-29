// import axios from "axios";
// import { API } from "../config";
// import { useCookies } from "react-cookie";
// import { handleSetCookie } from "../utils";

// axios.defaults.baseURL = API.BASE;

// let refresh = false;

// axios.interceptors.response.use(
//   (resp) => resp,
//   async (error) => {
//     const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
//     if (error.response.status === 401 && !refresh) {
//       refresh = true;

//       const response = await axios.post(
//         "auths",
//         {},
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${response.data.auth.accessToken}`;
//         handleSetCookie(response.data, setCookie);

//         return axios(error.config);
//       }
//     }
//     refresh = false;
//     return error;
//   }
// );
