import { AuthClient } from "../context/AuthC";

const JWTService = () => {
    let inMemoryJWT = null;
    let refreshTimeout = null;

    const refreshToken = (expiration) => {
        const timeout = expiration - 10000;
        refreshTimeout = setTimeout(() => {
            AuthClient.post("/refresh")
                .then((res) => {
                    const { accessToken, accessTokenExp } = res.data;
                    setToken(accessToken, accessTokenExp);
                })
                .catch(console.error);
        }, timeout);
    };

    const endRefreshToken = () => {
        if(refreshTimeout){
            clearInterval(refreshTimeout);
        }
    }

    const getToken = () => inMemoryJWT;

    const setToken = (token,tokenExpiration) => {
        inMemoryJWT = token;
        refreshToken(tokenExpiration);
    };

    const deleteToken = () => {
        inMemoryJWT = null;
        endRefreshToken();
    }

    return { getToken, setToken, deleteToken};
};

export default JWTService();