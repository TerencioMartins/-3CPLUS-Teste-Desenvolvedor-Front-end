import axios from "axios";

const API = axios.create({
  baseURL: "https://gorest.co.in/public/v1",
});

// export const setAuthHeader = () => {
//     if(token) {
//         axios.defaults.headers = {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`
//         }
//     }else {
//         delete axios.defaults.headers.Authorization;
//     }
// }
export default API;
