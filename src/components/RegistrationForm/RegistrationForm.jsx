import styles from "./RegistrationForm.module.css";
import { useFormik } from "formik";
import arrow from "../../assets/arrow.svg";
import show from "../../assets/show.svg";
import hide from "../../assets/hide.svg";
import { Link } from 'react-router-dom';
import { signupValidationSchema } from "../../schemas/index";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signup } from "../../api";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () =>{
    setShowPassword(!showPassword)
  }
  const toggleShowConfirmPassword = () =>{
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleSubmit = async(values) =>{
    
    try{
      const userInputData = {
        email: values.email,
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }
      const response = await signup(userInputData);
      toast.success("Регистрация прошла успешно", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      })
    }catch(error){
        console.error('Registration error:', error);
        toast.error('Registration failed', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }
  
  const { values, errors, touched, isSubmitting, handleBlur, handleChange} = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <button className={styles.button_goBack} type="button">
          <img src={arrow} alt="arrow go back" />
          Назад
        </button>
      </Link>
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.form_wrapper}>
        <h2 className={styles.heading}>Создать аккаунт Lorby</h2>
        <div className={styles.input_wrapper}>
          <label htmlFor="email" className={styles.label}>
            <input
              value={values.email}
              type="text"
              id="email"
              name="email"
              placeholder="Введи адрес почты"
              className={`${styles.login_input} ${errors.email && touched.email ? styles.input_error : ""}`}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            
          </label>
          {errors.email && touched.email && <p className={styles.error}>{errors.email}</p>}
          <label htmlFor="username" className={styles.label}>
            <input
              type="text"
              id="username"
              name="username"
              value={values.username}
              placeholder="Придумай логин"
              className={`${styles.login_input} ${errors.username && touched.username ? styles.input_error : ""}`}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {/* {errors.username && touched.username && <p className={styles.error}>{errors.username}</p>} */}
          <label htmlFor="password" className={styles.password_input}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Пароль (тоже введи)"
              className={styles.input}
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            />
            <button className={styles.showHide_btn} onClick={toggleShowPassword} type="button"><img src={showPassword ? hide : show} alt="show or hide password" /></button>
          </label>
            {errors.password && touched.password && (
              <p className={styles.error}>
                {errors.password}
              </p>
            )}
            <label htmlFor="confirmPassword" className={styles.password_input}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              placeholder="Повтори пароль"
              className={`${styles.input} ${errors.confirmPassword && touched.confirmPassword ? styles.input_error : ""}`}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button className={styles.showHide_btn} onClick={toggleShowConfirmPassword} type="button"><img src={showConfirmPassword ? hide : show} alt="show or hide password" /></button>
          </label>
          {errors.confirmPassword && touched.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
        </div>
        <button disabled={isSubmitting} type="submit" className={styles.login_button}>Далее</button>
      </form>
    </div>
  );
}

export default RegistrationForm;