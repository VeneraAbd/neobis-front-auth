import * as yup from 'yup';

// regex for validation username and password
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; //It must start with lower or uppercase letters && must be followed by 3 to 23 characters that can be uppercase or lowercase letters, digits from 0 to 9, or hyphen or underscore
// const PWR_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/ //requires at least 1 lowercase, 1 uppercase letter, 1 digit from 0-9, and special characters !@#$%;


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
    
        confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
        .required("Обязательное поле"),
})