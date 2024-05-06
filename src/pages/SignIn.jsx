
import sobaka_img from "../assets/casual-life-3d-blue-scared-ghost 1.svg";
import "../styles/SignIn.scss"

import { useForm } from "react-hook-form";
import { AuthC } from "../context/AuthC";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInYup } from "../context/validation";

const defaultValues = {
    login: "",
    password: "",
};

export const SignIn = () => {
    const { handleSignIn, error } = useContext(AuthC);

    const { 
        register,
        handleSubmit, 
        formState: {errors} 
    } = useForm(
        {
            defaultValues,
            resolver: yupResolver(signInYup)
        }
    );


    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit(handleSignIn)}>
                <img src={sobaka_img} alt="Картинка собаки"/>
                <h2>Войдите в игру</h2>
                <div className="inputs">
                    <div className="wrap-input">
                        <input 
                            className={`${errors.login ? 'error' : ''}`}
                            type="text"
                            id="login"
                            placeholder="Логин"
                            {...register("login")}
                        />
                        {(errors?.login) && (
                            <p className="errors">{errors?.login?.message}</p>
                        )}
                    </div>
                    
                    <div className="wrap-input">
                        <input 
                            className={`${errors.password ? 'error' : ''}`}
                            type="password" 
                            id="password"
                            placeholder="Пароль"
                            {...register("password")}
                        />
                        {(errors?.password) && (
                            <p className="errors">{errors?.password?.message}</p>
                        )}
                    </div>
                    
                </div>
                {(error) && (
                    <p className="error">{error?.error}</p>
                )}
                <button type="submit" id="submit">Войти</button>
            </form>
        </div>
    );
}