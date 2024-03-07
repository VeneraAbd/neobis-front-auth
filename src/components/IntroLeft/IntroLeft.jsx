import image from "../../assets/image.svg";
import styles from "./IntroLeft.module.css";

const IntroLeft = () => {
  return (
    <section className={styles.wrapper}>
        <img src={image} alt="intro image" className={styles.image}/>
        <h1 className={styles.heading}>Lorby</h1>
        <p className={styles.text}>Твой личный репетитор</p>
    </section>
  )
}

export default IntroLeft