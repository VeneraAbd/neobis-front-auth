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

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () =>{
    setShowPassword(!showPassword)
  }

  const handleFormSubmit = async(values) => {
      try{
        const response = await login(values);
        console.log(response);
        toast.success("Вход выполнен успешно");
        navigate('/home')

      }catch(error){
        console.log(error);
        toast.error("Неверный логин или пароль");
      }
  }

  const formik = useFormik({
    initialValues:{
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <form className={styles.form_wrapper} onSubmit={formik.handleSubmit}>
      <h2 className={styles.heading}>Вэлком бэк!</h2>
      <div className={styles.input_wrapper}>
        <label htmlFor="username" className={styles.password_input}>
            <input 
              type="text"
              id="username"
              name="username"
              placeholder="Введи туда-сюда логин"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
        </label>
        {formik.touched.username && formik.errors.username ? (
              <div className={styles.error}>{formik.errors.username}</div>
            ) : null}
        <label htmlFor="password" className={styles.password_input}>
            <input 
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Пароль (тоже введи)"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <button className={styles.showHide_btn} onClick={toggleShowPassword} type="button"><img src={showPassword ? hide : show} alt="show or hide password" /></button>
        </label>
        {formik.touched.password && formik.errors.password ? (
              <div className={styles.error}>{formik.errors.password}</div>
            ) : null}
      </div>
      <button type="submit" className={styles.login_button}>Войти</button>
      <Link to="registration" className={styles.registration_link}><p>У меня еще нет аккаунта</p></Link>
    </form>
  );
};

export default LoginForm;