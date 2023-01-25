import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Card as ProductModel } from 'models/card';
import Popup from 'components/common/Popup/Popup';
import { BiDotsVerticalRounded } from 'react-icons/bi'

interface ProductProps{
  title: string
  endDate: any
  board: any
}

const Product: React.FC<ProductProps> = ({
  title,
  endDate,
  board,
}) => {
  // const quantityColor = quantity === 0 ? 'red' : 'initial'

  return (
    <div className={styles.product}>
      <div className={`${styles.block}`}><span>{title}</span></div>
      <div className={`${styles.block}`}><span>{endDate}</span></div>
      <div className={`${styles.block}`}><span>{board}</span></div>
      <div className={`${styles.block}`}>
        <button
          onClick={() => console.log('open')}>
          <BiDotsVerticalRounded style={{ fontSize: '1.2rem', color: 'grey' }} />
        </button>
      </div>
    </div >
  )
}

export default Product