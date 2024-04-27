import { createContext, useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import $api from "../http";
import memoryJWT from "../services/memoryJWT";

export const AuthC = createContext({});

const AuthProvider = ({children}) => {
    
    const [userData, setUserData] = useState({});
    const [isAppReady, setIsAppReady] = useState(false);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [error, setError] = useState({});

    const handleSignIn = async (login,password) => {

        $api.post("/auth", {login,password})
            .then((response) => {
                localStorage.setItem("accessToken", response.data.accessToken);
                setIsUserLogged(true);
                setUserData(response.data.user);
            })
            .catch(error => {
                if (error.response) {
                    const errorMessage = error.response.data.message;
                    setError({ message: errorMessage});
                } else {
                    console.error("Error:", error);
                    setError({ message: "Ошибка сервера"});
                }
            });
    }

    const handleLogOut = () => {
        $api.post("/logout")
            .then((response) => {
                localStorage.removeItem("accessToken");
                setIsUserLogged(false);
                setUserData();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    useEffect(() => {
        setIsAppReady(false);
            setTimeout(()=>{
                setIsAppReady(true)
        },1000);
        
        if (isUserLogged) {
            setIsAppReady(true);
        }
    }, [isUserLogged]);
    

    return (
        <AuthC.Provider
            value={{
                isUserLogged,
                handleSignIn,
                handleLogOut,
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