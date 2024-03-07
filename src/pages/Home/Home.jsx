import styles from "./Home.module.css";
import image from "../../assets/image.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.heading}>Добро пожаловать!</h1>
      <p className={styles.text}>Lorby - твой личный репетитор</p>
      <img src={image} alt="intro image" className={styles.image}/>
      <Link to="/">
          <button className={styles.logout_button}>Выйти</button>
      </Link>
    </section>
  )
}

export default Home