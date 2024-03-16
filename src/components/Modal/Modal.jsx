import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import styles from "./Modal.module.css"

const ModalComponent = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose} center classNames={styles.modal}>
      {children}
    </Modal>
  )
}

export default ModalComponent