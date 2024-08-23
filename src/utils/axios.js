import axios from "axios";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";


class Axios{
    agent;
    url = "http://127.0.0.1:8000/api/v1";

    constructor(authMode = false) {
        if (authMode === false) {
            const instance = axios.create({
                baseURL: this.url,
                timeout: 8000,
                headers: {'Content-Type': 'application/json'}
              });
            this.agent = instance;
        }else{
            const authTokens = JSON.parse(localStorage.getItem("authToken"));
            const axiosInstance = axios.create({
                baseURL: this.url,
                timeout: 8000,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization":`Bearer ${authTokens.access}`,
                }
            });

            axiosInstance.interceptors.request.use( async req => {
                const user = jwtDecode(authTokens.access);
                const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
                if (!isExpired) return req;

                const response = await axios.post(`${this.url}/token/refresh/`,{refresh: authTokens.refresh });
                const token = {access: response.data.access, refresh:authTokens.refresh}
                localStorage.setItem("authToken", JSON.stringify(token));
                req.headers.Authorization = `Bearer ${response.data.access}`;
                return req;
            });

            this.agent = axiosInstance;
        }
    }

}

export default Axios;