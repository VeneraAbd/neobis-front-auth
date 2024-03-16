import styles from "./LoginForm.module.css";
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { loginValidationSchema } from "../../schemas/index";
import { toast } from 'react-toastify';
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
  const handleFormSubmit = async (values) => {
    const { username, password } = values;
  
    try {
      const response = await dispatch(login({ username, password }));
      console.log(response);
      
      if (response.payload) {
        navigate('home');
        toast.success('Successfully logged in');
      } else {
        toast.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized: Invalid username or password');
      } else {
        toast.error('Login failed');
      }
    }
  };
  

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