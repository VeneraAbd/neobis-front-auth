import IntroLeft from "../../components/IntroLeft/IntroLeft";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Login.module.css";

const Login = () => {

  return (
    <div className={styles.container}>
      <IntroLeft />
      <LoginForm />

    </div>
  )
}

export default Login