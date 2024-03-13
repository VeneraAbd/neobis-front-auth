import styles from "./LoginForm.module.css";
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { loginValidationSchema } from "../../schemas/index";
import { toast } from 'react-toastify';
// import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/reducers/auth";
import { useState } from "react";
import show from "../../assets/show.svg";
import hide from "../../assets/hide.svg";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () =>{
    setShowPassword(!showPassword)
  }

  const handleFormSubmit = (values) => {
      const { username, password } = values;
      console.log(values, "values")
      dispatch(login({username, password})).then((action)=>{
      // localStorage.setItem('accessToken', action.payload.tokens.access);
      // localStorage.setItem('refreshToken', action.payload.tokens.refresh);
      console.log(action.payload, "my action payload")
      navigate("home");
      toast.success("Successfully logged in")
    });
  }

  const { values, errors, touched, handleBlur, handleChange, isValid, handleSubmit} = useFormik({
    initialValues:{
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <form className={styles.form_wrapper} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Вэлком бэк!</h2>
      <div className={styles.input_wrapper}>
        <label htmlFor="username" className={styles.password_input}>
            <input 
              type="text"
              id="username"
              name="username"
              placeholder="Введи туда-сюда логин"
              className={styles.input}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
        </label>
        {touched.username && errors.username ? (
              <div className={styles.error}>{errors.username}</div>
            ) : null}
        <label htmlFor="password" className={styles.password_input}>
            <input 
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Пароль (тоже введи)"
              className={styles.input}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <button className={styles.showHide_btn} onClick={toggleShowPassword} type="button"><img src={showPassword ? hide : show} alt="show or hide password" /></button>
        </label>
        {touched.password && errors.password ? (
              <div className={styles.error}>{errors.password}</div>
            ) : null}
      </div>
      <button type="submit" className={styles.login_button}>Войти</button>
      <Link to="registration" className={styles.registration_link}><p>У меня еще нет аккаунта</p></Link>
    </form>
  );
};

export default LoginForm;