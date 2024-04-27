const MemoryJWTService = () => {
    let inMemoryJWT = null;

    const getToken = () => inMemoryJWT;

    const setToken = (token, tokenExp) => {
        inMemoryJWT = token;
    };

    return {getToken,setToken};
}

export default MemoryJWTService();