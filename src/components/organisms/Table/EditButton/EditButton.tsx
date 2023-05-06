import React from 'react';
import styles from './styles.module.scss'
import { BiDotsHorizontalRounded } from 'react-icons/bi';

interface EditButtonProps{
  onClick: (value: React.SetStateAction<any>) => void
}

const EditButton:React.FC<EditButtonProps> = ({onClick}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={styles.editButton}
    ><BiDotsHorizontalRounded fontSize={20} /></button>
  );
};

export default EditButton;
