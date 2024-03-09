import IntroLeft from "../../components/IntroLeft/IntroLeft"
import styles from "./Registration.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

const Registration = () => {
  return (
    <div className={styles.container}>
      <IntroLeft/>   
      <RegistrationForm />   
    </div>
  )
}

export default Registration





// import { useRef, useSate, useEffect } from 'react';
// import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



