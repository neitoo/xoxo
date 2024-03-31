
import sobaka_img from "../assets/casual-life-3d-blue-scared-ghost 1.svg";
import "../styles/SignIn.scss"

import { useForm } from "react-hook-form";
import { AuthC } from "../context/AuthC";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export const SignIn = () => {
    const { handleLogin } = useContext(AuthC);

    const { handleSubmit, register } = useForm();

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit(handleLogin)}>
                <img src={sobaka_img} alt="Картинка собаки"/>
                <h2>Войдите в игру</h2>
                <div className="inputs">
                    <input type="text" placeholder="Логин"/>
                    <input type="password" placeholder="Пароль"/>
                </div>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
}