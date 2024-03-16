import * as yup from 'yup';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; 
// const PWR_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/


export const signupValidationSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Обязательное поле"),
    username: yup
        .string()
        .matches(USER_REGEX, {message: "такой логин уже существует"})
        .required("Обязательное поле"),
    password: yup
        .string()
        .required("Обязательное поле")
        .min(8, 'От 8 до 15 символов')
        .max(15, 'От 8 до 15 символов')
        .matches(/[a-z]+/, 'Строчные и прописные буквы')
        .matches(/[A-Z]+/, 'Строчные и прописные буквы')
        .matches(/\d+/, 'Минимум 1 цифра')
        .matches(/[@$!%*#?&]+/, 'Минимум 1 спецсимвол (!, ", #, $...)'),
    
    password_confirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
        .required("Обязательное поле"),
})

export const loginValidationSchema = yup.object().shape({
    username: yup.string().required('Введите почту'),
    password: yup.string().required('Введите пароль'),
    
})
