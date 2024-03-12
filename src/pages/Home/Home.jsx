import styles from "./Home.module.css";
import image from "../../assets/image.svg";
import { Link } from "react-router-dom";
import { logout } from "../../api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from your API file
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
      <Link to="/">
          <button onClick={handleLogout} className={styles.logout_button}>Выйти</button>
      </Link>
    </section>
  )
}

export default Home