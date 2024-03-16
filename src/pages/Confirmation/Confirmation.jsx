import IntroLeft from "../../components/IntroLeft/IntroLeft";
import { Link } from "react-router-dom";
import styles from "./Confirmation.module.css";
import arrow from "../../assets/arrow.svg";
import ModalComponent from "../../components/Modal/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";

const Confirmation = () => {
  const [open, setOpen] = useState(false);
  const email = useSelector(state => state.auth.email);
  
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <section className={styles.wrapper}>
        
        <IntroLeft/>

        <div className={styles.container}>
          <Link to="/" className={styles.link}>
            <button className={styles.button_goBack}>
              <img src={arrow} alt="arrow go back" />
              Назад
            </button>
          </Link>
          <div className={styles.text_container}>
            <h3 className={styles.heading3}>Выслали письмо со ссылкой для завершения регистрации на {email}</h3>
            <p className={styles.text}>Если письмо не пришло, не спеши ждать совиную почту - лучше <span className={styles.span}>проверь ящик “Спам”</span></p>
            <h3>(´｡• ω •｡`)</h3>
            <button onClick={onOpenModal} className={styles.letter_resendBtn}>Письмо не пришло</button>
            <ModalComponent open={open} onClose={onCloseModal}>
              <div className={styles.modal_container}>
                <h3 className={styles.modalh3}>Мы выслали еще одно письмо на указанную тобой почту {email}</h3>
                <p className={styles.modalp}>Не забудь проверить ящик “Спам”!11!!!!</p>
                <button className={styles.login_button} onClick={onCloseModal}>Понятно!!1!</button>
              </div>
            </ModalComponent>
          </div>
        </div>
    </section>
  )
}

export default Confirmation