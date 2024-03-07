import styles from "./RegistrationForm.module.css";
import { useFormik } from "formik";
import arrow from "../../assets/arrow.svg";
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
 
  const formik = useFormik({
    initialValues:{
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    }
  })


  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <button className={styles.button_goBack}>
          <img src={arrow} alt="arrow go back" />
          Назад
        </button>
      </Link>
      <form className={styles.form_wrapper}>
        <h2 className={styles.heading}>Создать аккаунт Lorby</h2>
        <div className={styles.input_wrapper}>
          <label htmlFor="email" className={styles.label}>
              <input 
                type="text"
                id="email"
                name="email"
                placeholder="Введи адрес почты"
                className={styles.login_input}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
          </label>
          <label htmlFor="login" className={styles.label}>
              <input 
                type="text"
                id="login"
                name="login"
                placeholder="Придумай логин"
                className={styles.login_input}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
          </label>
          <label htmlFor="password" className={styles.label}>
              <input 
                type="password"
                id="password"
                name="password"
                placeholder="Пароль (тоже введи)"
                className={styles.password_input}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
          </label>
          <label htmlFor="confirmPassword" className={styles.label}>
              <input 
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Повтори пароль"
                className={styles.password_input}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
          </label>
        </div>
        <button type="submit" className={styles.login_button}>Далее</button>
    </form>
    </div>
  )
}

export default RegistrationForm