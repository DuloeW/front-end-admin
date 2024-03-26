import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token")
axios.defaults.baseURL = "http://localhost:8790/api/v1/";
// axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

export default axios;
