import styles from "./Home.module.css";
import image from "../../assets/image.svg";
import { getCurrentUser, logout } from "../../store/reducers/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ModalComponent from "../../components/Modal/Modal";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null); 
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // const currentUser = useSelector(state => state.auth.currentUser);
  // const isLoading = useSelector(state => state.auth.isLoading);

  const handleLogout = () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      dispatch(logout({refreshToken})); 
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate('/');
      
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.heading}>Добро пожаловать!</h1>
      <p className={styles.text}>Lorby - твой личный репетитор</p>
      <img src={image} alt="intro image" className={styles.image}/>
      <button onClick={onOpenModal} className={styles.logout_button}>Выйти</button> 
      <ModalComponent open={open} onClose={onCloseModal}>
        <div className={styles.modal_container}>
            <h3 className={styles.modalh3}>Выйти?</h3>
            <p className={styles.modalp}>Точно выйти?</p>
            <button 
              className={activeButton === "logout" ? styles.login_button : styles.logout_button} 
              onClick={handleLogout} 
              onMouseEnter={() => setActiveButton("logout")}
            >
              Да, точно
            </button>
            <button 
              className={activeButton === "stay" ?  styles.login_button : styles.logout_button} 
              onClick={onCloseModal} 
              onMouseEnter={() => setActiveButton("stay")}
            >
              Нет, остаться
            </button>
        </div>
      </ModalComponent>    
    </section>
  )
}

export default Home;
