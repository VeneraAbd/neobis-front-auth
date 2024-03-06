import { useRef, useSate, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// regex for validation username and password
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; //It must start with lower or uppercase letters && must be followed by 3 to 23 characters that can be uppercase or lowercase letters, digits from 0 to 9, or hyphen or underscore
const PWR_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/ //requires at least 1 lowercase, 1 uppercase letter, 1 digit from 0-9, and special characters !@#$%;

const Registration = () => {
  return (
    <div>Registration</div>
  )
}

export default Registration