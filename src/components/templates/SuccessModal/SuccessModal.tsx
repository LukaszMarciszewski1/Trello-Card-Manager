import React from 'react'
import styles from './styles.module.scss'
import Modal from 'components/common/Modal/Modal'
import Success from 'components/common/Success/Success'

interface SuccessModalProps {
  trigger: boolean
  closeModal: () => void
  boardName: string
}

const SuccessModal:React.FC<SuccessModalProps> = ({trigger, closeModal, boardName}) => {
  return (
    <Modal trigger={trigger} closeModal={closeModal}>
      <h2 className={styles.title}>
        Twoje zlecenie <br /> zostało dodane do <br /><strong>tablicy {boardName} w <br />Trello !!!</strong>
      </h2>
      <Success />
    </Modal>
  )
}

export default SuccessModal