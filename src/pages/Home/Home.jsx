import styles from "./Home.module.css";
import image from "../../assets/image.svg";
import { getCurrentUser, logout } from "../../store/reducers/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      dispatch(logout({refreshToken})); 
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.heading}>Добро пожаловать!</h1>
      <p className={styles.text}>Lorby - твой личный репетитор</p>
      <img src={image} alt="intro image" className={styles.image}/>
      <button onClick={handleLogout} className={styles.logout_button}>Выйти</button>     
    </section>
  )
}

export default Home