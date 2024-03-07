import styles from "./LoginForm.module.css";
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const formik = useFormik({
    initialValues:{
      email: "",
      password: "",
    }
  })

  return (
    <form className={styles.form_wrapper}>
      <h2 className={styles.heading}>Вэлком бэк!</h2>
      <div className={styles.input_wrapper}>
        <label htmlFor="email" className={styles.label}>
            <input 
              type="text"
              id="email"
              name="email"
              placeholder="Введи туда-сюда логин"
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
      </div>
      <button type="submit" className={styles.login_button}>Войти</button>
      <Link to="registration" className={styles.registration_link}><p>У меня еще нет аккаунта</p></Link>
    </form>
  )
}

export default LoginForm;
