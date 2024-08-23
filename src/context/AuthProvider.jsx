import React , { useState } from 'react'
import AuthContext from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import Axios from '../utils/axios';


export default function AuthProvider({children}) {
    const [user, setUser] = useState(
        localStorage.getItem('authToken') ? jwtDecode(JSON.parse(localStorage.getItem('authToken') ).access): null
    )

    const [authTokens, setAuthTokens] = useState(
        JSON.parse(localStorage.getItem('authToken')) || null
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const login = async (username, password) => {
        const axios = new Axios();
        setLoading(true);
        try {
            var res = await axios.agent.post(
                "/user/login/",
                {
                    "username": username,
                    "password": password
                }
            )
            localStorage.setItem('authToken', JSON.stringify(res.data));
            setUser(jwtDecode(res.data.access));
            setError("Welcom back " + jwtDecode(res.data.access).name + " !!");
            return true;
        } catch (error) {
            console.log(error)
            if(error.response.status === 401) {
                setError(error.response.data.detail)
            }else{
                setError("error ocurred. Please check your internet connection.")
            }
        }finally{
            setLoading(false);
        }
        
        return false;
    }
    

    const registerUser = async (name, username, password) =>{
        const axios = new Axios();
        setLoading(true);
        try {
            var res = await axios.agent.post(
                "/user/register/",
                {
                    "name": name,
                    "username": username,
                    "password": password
                }
            )
            setError("Registration Successful");
            return res;
        } catch (error) {

            if(error.response.status === 400) {
                setError(error.response.data.username)
            }else{
                setError("error ocurred. Please check your internet connection.")
            }
        }
        return false;
    }

    const logout = () => {
        setUser(null);
        localStorage.clear();
        window.location.href = "/";
    }

    const context = {
        user, setUser,
        authTokens, setAuthTokens,
        login,registerUser ,
        loading, setLoading,
        error, setError,
        logout,
    }

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  )
}
