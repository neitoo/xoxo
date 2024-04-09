import { createContext, useState, useEffect } from "react";
import { signInYup } from "./validation";
import { ColorRing } from "react-loader-spinner";

export const AuthC = createContext({});

const AuthProvider = ({children}) => {
    
    const [userData, setUserData] = useState({});
    const [isAppReady, setIsAppReady] = useState(false);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [error, setError] = useState({});

    const testUserData = {
        login: "pizzadabdab",
        password: "piZZa1234_",
        fullname: "Авторизированный игрок",
        procentWin: 0,
    }

    const handleSignIn = (login,password) => {
        const isValidLogin = login === testUserData.login;
        const isValidPassword = password === testUserData.password;
        
        const yupErrors = validateYupFields({ login, password });
        
        setError({
            login: isValidLogin ? "" : "Неверный логин",
            password: isValidPassword ? "" : "Неверный пароль",
            ...yupErrors
        });
    
        setIsUserLogged(isValidLogin && isValidPassword && Object.keys(yupErrors).length === 0);

    }

    const handleLogOut = () => {
        setIsUserLogged(false);
    }

    const validateYupFields = (data) => {
        try {
            signInYup.validateSync(data, { abortEarly: false });
            return {}; // Если валидация прошла успешно, возвращаем пустой объект ошибок
        } catch (error) {
            return error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message; // Формируем объект ошибок
                return acc;
            }, {});
        }
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
                error,
                handleLogOut
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