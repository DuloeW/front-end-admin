import axios from "axios";

const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
};

const token = getCookie('token');
if (token) {
    axios.defaults.baseURL = "http://localhost:8790/api/v1/";
    // axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
} else {
    console.error('Token tidak ditemukan dalam cookie.');
}

export default axios;
