import React, { useRef } from 'react'
import styles from './styles.module.scss'
import Button from 'components/Button/Button';
import { BsXLg } from "react-icons/bs";
import { MdOutlineArrowBackIos } from "react-icons/md";
import useOnClickOutside from 'hooks/useOnClickOutside'

interface PopupPosition {
  right?: string,
  top?: string
}

interface PopupProps extends PopupPosition {
  trigger: boolean
  title: string
  isEditWindow?: boolean
  closePopup: () => void
  backToMainWindow?: () => void
  children: any
}
const Popup: React.FC<PopupProps> = ({
  children,
  trigger,
  title,
  isEditWindow,
  closePopup,
  backToMainWindow,
  ...props
}) => {
  const refPopup = useRef(null)
  useOnClickOutside(refPopup, closePopup)

  return (
    trigger ? (
      <div
        className={styles.popup}
        ref={refPopup}
        style={{ ...props }}>
        <div className={styles.header}>
          {isEditWindow ? (
            <button>back</button>
            // <IconButton onClick={backToMainWindow}><MdOutlineArrowBackIos /></IconButton>
          ) : null
          }
          <h4>{title}</h4>
          <button onClick={closePopup}>X</button>
          {/* <IconButton onClick={closePopup}><BsXLg /></IconButton> */}
        </div>
        <div className={styles.popupContent}>
          {children}
        </div>
      </div>
    ) : null
  )
}

export default Popup