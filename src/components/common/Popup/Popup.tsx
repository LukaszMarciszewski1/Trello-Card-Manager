import React, { useRef } from 'react';
import styles from './styles.module.scss';
import useOnClickOutside from 'hooks/useOnClickOutside';
import Button from '../Button/Button';
import { AiOutlineClose } from 'react-icons/ai';

interface PopupPosition {
  right?: string;
  top?: string;
}

interface PopupProps extends PopupPosition {
  trigger: boolean;
  title: string;
  closePopup: () => void;
  style?: {};
  children: JSX.Element | JSX.Element[];
}
const Popup: React.FC<PopupProps> = ({ children, trigger, title, closePopup, style }) => {
  const refPopup = useRef(null);
  useOnClickOutside(refPopup, closePopup);

  return trigger ? (
    <div className={styles.popup} ref={refPopup} style={style}>
      <div className={styles.header}>
        <h4>{title}</h4>
        <Button type={'button'} onClick={closePopup} style={{ width: 30, margin: 0 }} icon={<AiOutlineClose />} />
      </div>
      <div className={styles.popupContent}>{children}</div>
    </div>
  ) : null;
};

export default Popup;
