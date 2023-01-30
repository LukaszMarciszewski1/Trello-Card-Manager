import React, { useRef } from 'react'
import styles from './styles.module.scss'
import useOnClickOutside from 'hooks/useOnClickOutside'
import Button from '../Button/Button';
import * as constants from 'constants/index';

type ModalProps = {
  trigger: boolean
  closeModal: () => void
  children: JSX.Element | JSX.Element[];
}

const Modal: React.FC<ModalProps> = ({ children, trigger, closeModal }) => {
  const refModal = useRef(null)
  useOnClickOutside(refModal, closeModal)

  return (
    trigger ? (
      <div className={styles.overlay}>
        <div className={styles.modal} ref={refModal}>
          {children}
          <div className={styles.buttonContainer}>
            <Button 
              type={"button"} 
              onClick={closeModal}
              title={constants.CONFIRM}
              style={{padding: 20, width: "80%", fontSize: '2rem', zIndex: 100 }}
              />
          </div>
        </div>
      </div>
    ) : null
  )
}

export default Modal