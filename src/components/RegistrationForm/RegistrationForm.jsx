import { useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../store/reducers/auth';
import arrow from '../../assets/arrow.svg';
import show from '../../assets/show.svg';
import hide from '../../assets/hide.svg';
import { signupValidationSchema } from '../../schemas/index';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onFormSubmit = ({ email, username, password, password_confirm }) => {
    dispatch(register({ email, username, password, password_confirm })).then(() => {
      toast.success('Вы успешно зарегистрированы');
      navigate('/confirmation');
    });
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      password_confirm: '',
    },
    validationSchema: signupValidationSchema,
    onSubmit: onFormSubmit,
  });

  const passwordValidationMessage = (condition, message) => {
    return (
      <li className={`${touched.password ? (condition ? styles.success : styles.error) : ''}`}>
        {message} {`${touched.password ? (condition ? '✅' : '❌') : ''}`} 
      </li>
    );
  };

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
              className={`${styles.login_input} ${errors.email && touched.email ? styles.input_error : ''}`}
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
              className={`${styles.login_input} ${errors.username && touched.username ? styles.input_error : ''}`}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {errors.username && touched.username && <p className={styles.error}>{errors.username}</p>}
          <label htmlFor="password" className={styles.password_input}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Пароль (тоже введи)"
              className={styles.input}
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
             
            />
            <button className={styles.showHide_btn} onClick={toggleShowPassword} type="button">
              <img src={showPassword ? hide : show} alt="show or hide password" />
            </button>
          </label>
          <ul className={styles.form__list}>
            {passwordValidationMessage(
              values.password.length >= 8 && values.password.length <= 15,
              'От 8 до 15 символов'
            )}
            {passwordValidationMessage(
              /[a-z]/.test(values.password) && /[A-Z]/.test(values.password),
              'Строчные и прописные буквы'
            )}
            {passwordValidationMessage(/\d/.test(values.password), 'Минимум 1 цифра')}
            {passwordValidationMessage(
              /[^a-zA-Z0-9]/.test(values.password),
              'Минимум 1 спецсимвол (!, ", #, $...)'
            )}
          </ul>
          <label htmlFor="password_confirm" className={styles.password_input}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="password_confirm"
              name="password_confirm"
              value={values.password_confirm}
              placeholder="Повтори пароль"
              className={`${styles.input} ${
                errors.password_confirm && touched.password_confirm ? styles.input_error : ''
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
             
            />
            <button className={styles.showHide_btn} onClick={toggleShowConfirmPassword} type="button">
              <img src={showConfirmPassword ? hide : show} alt="show or hide password" />
            </button>
          </label>
          {errors.password_confirm && touched.password_confirm && (
            <p className={styles.error}>{errors.password_confirm}</p>
          )}
        </div>
        <button disabled={isSubmitting} type="submit" className={styles.login_button}>
          Далее
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
