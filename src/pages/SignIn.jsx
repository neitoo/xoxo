
import sobaka_img from "../assets/casual-life-3d-blue-scared-ghost 1.svg";
import "../styles/SignIn.scss"

import { useForm } from "react-hook-form";
import { AuthC } from "../context/AuthC";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInYup } from "../context/validation";

const defaultValues = {
    login: "pizzadabdab",
    password: "piZZa1234_",
};

export const SignIn = () => {
    const { handleSignIn, error } = useContext(AuthC);

    const { 
        handleSubmit, 
        register,
        formState: {errors} 
    } = useForm(
        {
            defaultValues,
        }
    );

    const onSubmit = (data) => {
        handleSignIn(data.login, data.password)
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
                <img src={sobaka_img} alt="Картинка собаки"/>
                <h2>Войдите в игру</h2>
                <div className="inputs">
                    <div className="wrap-input">
                        <input 
                            className={`${errors.login || error.login ? 'error' : ''}`}
                            type="text"
                            id="login"
                            placeholder="Логин"
                            {...register("login")}
                        />
                        {(errors?.login || error?.login) && (
                            <p className="errors">{errors?.login?.message || error?.login}</p>
                        )}
                    </div>
                    
                    <div className="wrap-input">
                        <input 
                            className={`${errors.password || error.password ? 'error' : ''}`}
                            type="password" 
                            id="password"
                            placeholder="Пароль"
                            {...register("password")}
                        />
                        {(errors?.password || error?.password) && (
                            <p className="errors">{errors?.password?.message || error?.password}</p>
                        )}
                    </div>
                    
                </div>
                <button type="submit" id="submit">Войти</button>
            </form>
        </div>
    );
}