import * as yup from 'yup';
import styles from "./LoginForm.module.css";
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const formik = useFormik({
    initialValues:{
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email address').required('Required'),
      password: yup.string().required('Required'),
    }),
    onSubmit: values => {
    
      console.log(values);
    },
  });

  return (
    <form className={styles.form_wrapper} onSubmit={formik.handleSubmit}>
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
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.error}>{formik.errors.email}</div>
            ) : null}
        </label>
        <label htmlFor="password" className={styles.label}>
            <input 
              type="password"
              id="password"
              name="password"
              placeholder="Пароль (тоже введи)"
              className={styles.password_input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.error}>{formik.errors.password}</div>
            ) : null}
        </label>
      </div>
      <button type="submit" className={styles.login_button}>Войти</button>
      <Link to="registration" className={styles.registration_link}><p>У меня еще нет аккаунта</p></Link>
    </form>
  );
};

export default LoginForm;