import { createContext, useState, useEffect } from "react";

export const AuthC = createContext({});

const AuthProvider = ({children}) => {
    
    const [userData, setUserData] = useState({});
    const [isAppReady, setIsAppReady] = useState(true);
    const [isUserLogged, setIsUserLogged] = useState(false);

    const handleLogin = (username,password) => {
        const testUserData = {
            username: "pizzadabdab",
            password: "piZZa1234_",
            fullname: "Авторизированный игрок",
            procentWin: 0,
        }

        setIsUserLogged(true);
    }

    useEffect(() => {
        if (isUserLogged) {
            setIsAppReady(true);
        }
    }, [isUserLogged]);

    return (
        <AuthC.Provider
            value={{
                isUserLogged,
                handleLogin
            }}
        >
            {isAppReady ? (children) : (
                <div>
                    Загрузка...
                </div>
            )}
        </AuthC.Provider>
    );
}

export default AuthProvider;