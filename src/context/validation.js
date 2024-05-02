import * as Yup from "yup";

export const signInYup = Yup.object({
    login: Yup.string()
        .required("Обязательное поле!"),
    password: Yup.string()
        .required("Обязательное поле!")
        .min(5, "Пароль должен содержать минимум 5 символов!"),
});