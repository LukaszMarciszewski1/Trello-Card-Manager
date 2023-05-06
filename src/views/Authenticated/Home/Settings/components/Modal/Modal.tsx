import React, { useRef } from 'react';
import styles from './styles.module.scss';
import * as constants from 'constants/index';
import useOnClickOutside from 'hooks/useOnClickOutside';
import IconButton from '../IconButon/IconButton';
import Button from 'components/common/Button/Button';

type ModalProps = {
  trigger: boolean;
  closeModal: () => void;
  children: JSX.Element | JSX.Element[];
  currentRowName: string | null | JSX.Element;
};

const Modal: React.FC<ModalProps> = ({
  children,
  trigger,
  currentRowName,
  closeModal,
}) => {
  const refModal = useRef(null);
  useOnClickOutside(refModal, closeModal);

  return trigger ? (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={refModal}>
        <div className={styles.header}>
          <div className={styles.currentRowName}>
            <span>{currentRowName}</span>
          </div>
          <IconButton onClick={closeModal} icon={<div>X</div>} />
        </div>
          <div className={styles.content}>{children}</div>
          <div className={styles.bottomBar}>
            <Button
              style={{ width: 100, height: 36, margin: 0 }}
              type={'button'}
              title={'zamknij'}
            />
            {/* <Button
              style={{ width: 100, height: 36, margin: 0 }}
              type={'submit'}
              title={'zapisz'}
            /> */}
          </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
