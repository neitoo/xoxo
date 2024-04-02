import * as Yup from "yup";

export const signInYup = Yup.object({
    login: Yup.string()
        .required("Обязательное поле!"),
    password: Yup.string()
        .required("Обязательное поле!")
        .min(3, "Пароль должен содержать минимум 3 символа!"),
});