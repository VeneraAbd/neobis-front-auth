import IntroLeft from "../../components/IntroLeft/IntroLeft";
import { Link } from "react-router-dom";
import styles from "./Confirmation.module.css";
import arrow from "../../assets/arrow.svg";

const Confirmation = () => {
  return (
    <section className={styles.wrapper}>
        
        <IntroLeft/>

        {/* message */}
        <div className={styles.container}>
          <Link to="/" className={styles.link}>
            <button className={styles.button_goBack}>
              <img src={arrow} alt="arrow go back" />
              Назад
            </button>
          </Link>
          <div className={styles.text_container}>
            <h3 className={styles.heading3}>Выслали письмо со ссылкой для завершения регистрации на example@gmail.com</h3>
            <p className={styles.text}>Если письмо не пришло, не спеши ждать совиную почту - лучше <span className={styles.span}>проверь ящик “Спам”</span></p>
            <h3>(´｡• ω •｡`)</h3>
            <button className={styles.letter_resendBtn}>Письмо не пришло</button>
          </div>
        </div>
    </section>
  )
}

export default Confirmation