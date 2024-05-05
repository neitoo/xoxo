import { createContext, useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
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


    const handleProtect = () => {
        const userId = JWTService.getUserID();
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
                throw error;
            });
    }

    const handleGetUsers = () => {
        return PrivateClient.get("/users")
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
    };

    const handleSignIn = (data) => {
        AuthClient.post("/auth", data)
            .then((res) => {
                const { accessToken, accessTokenExp, userId } = res.data;
                JWTService.setToken(accessToken, accessTokenExp, userId);
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
                const { accessToken, accessTokenExp, id} = res.data;
                JWTService.setToken(accessToken, accessTokenExp, id);
                console.log("refresh");
                setIsAppReady(true);
                setIsUserLogged(true);
                setUserData({ id: id });
            })
            .catch(() => {
                setIsAppReady(true);
                setIsUserLogged(false);
            });
    }, []);

    useEffect(() => {
        const handlePersistedLogOut = (event) => {
          if (event.key === config.LOGOUT_STORAGE_KEY) {
            JWTService.deleteToken();
            setIsUserLogged(false);
          }
        };
    
        window.addEventListener("storage", handlePersistedLogOut);
    
        return () => {
          window.removeEventListener("storage", handlePersistedLogOut);
        };
      }, []);
    

    return (
        <AuthC.Provider
            value={{
                isUserLogged,
                handleSignIn,
                handleLogOut,
                handleProtect,
                handleGetUsers,
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