import { AuthClient } from "../context/AuthC";

const JWTService = () => {
    let inMemoryJWT = null;
    let refreshTimeout = null;
    let inMemoryUserID = null;

    const refreshToken = (expiration) => {
        const timeout = expiration - 10000;
        refreshTimeout = setTimeout(() => {
            AuthClient.post("/refresh")
                .then((res) => {
                    const { accessToken, accessTokenExp, id } = res.data;
                    setToken(accessToken, accessTokenExp,id);
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

    const getUserID = () => inMemoryUserID;

    const setToken = (token, tokenExpiration, userId) => {
        inMemoryJWT = token;
        inMemoryUserID = userId;
        refreshToken(tokenExpiration);
    };

    const deleteToken = () => {
        inMemoryJWT = null;
        inMemoryUserID = null;
        endRefreshToken();
    };

    return { getToken, getUserID, setToken, deleteToken};
};

export default JWTService();