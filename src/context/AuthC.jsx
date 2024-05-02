import { createContext, useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import $api from "../http";
import axios from "axios";
import config from "../config.js";
import JWTService from "../services/JWTService.js";

export const AuthClient = axios.create({
    baseURL: `${config.API_URL}/api`,
    withCredentials: true,
});

export const PrivateClient = axios.create({
    baseURL: `${config.API_URL}/api/a`
});

PrivateClient.interceptors.request.use(
    (config) => {
        const accessToken = JWTService.getToken();

        if(accessToken){
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export const AuthC = createContext({});

const AuthProvider = ({children}) => {
    
    const [userData, setUserData] = useState({});
    const [isAppReady, setIsAppReady] = useState(false);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [error, setError] = useState({});


    const handleProtect = (userId) => {
        PrivateClient.post("/user", {id: userId})
            .then((res)=>{
                const { user_fullname, data_win, data_loose, user_status } = res.data;
                setUserData((prevData) => ({
                    ...prevData,
                    fullname: user_fullname,
                    dataWin: data_win,
                    dataLoose: data_loose,
                    status: user_status,
                }));
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    const handleSignIn = (data) => {
        AuthClient.post("/auth", data)
            .then((res) => {
                const { accessToken, accessTokenExp, userId} = res.data;
                
                JWTService.setToken(accessToken,accessTokenExp);
                setIsUserLogged(true);
                setUserData({ id: userId });
            })  
            .catch((error) => {
                if (error.response && error.response.data) {
                    setError(error.response.data);
                } else {
                    setError({ error: "Сервер не отвечает." });
                }
            });
        
            
    }

    const handleLogOut = () => {
        AuthClient.post("/logout")
            .then(() => {
                setIsUserLogged(false);
                JWTService.deleteToken();
            })
            .catch((error)=>{
                console.error(error.response.data);
            });
    }
    

    useEffect(() => {
        AuthClient.post("/refresh")
            .then((res) => {
                const { accessToken, accessTokenExp} = res.data;
                JWTService.setToken(accessToken, accessTokenExp);

                setIsAppReady(true);
                setIsUserLogged(true);
                
            })
            .catch(() => {
                setIsAppReady(true);
                setIsUserLogged(false);
            });
    }, [userData]);
    

    return (
        <AuthC.Provider
            value={{
                isUserLogged,
                handleSignIn,
                handleLogOut,
                handleProtect,
                userData,
                error
            }}
        >
            {isAppReady ? (children) : (
                <div className="login-wrapper">
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#EB0057', '#60C2AA', '#EB0057', '#60C2AA', '#EB0057']}
                    />
                </div>
            )}
        </AuthC.Provider>
    );
}

export default AuthProvider;