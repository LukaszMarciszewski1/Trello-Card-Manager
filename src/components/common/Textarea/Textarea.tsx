import React, { forwardRef } from 'react'
import styles from './styles.module.scss'
import TextareaAutosize from 'react-textarea-autosize';

interface TextareaProps {
  id: string
  label: string
  maxRow: number
}

const Textarea: React.FC<TextareaProps> = forwardRef<HTMLInputElement, TextareaProps>(
  (
    {
      id,
      label,
      maxRow,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={styles.container}>
        <label htmlFor={id}>{label}</label>
        <TextareaAutosize
          id={id}
          maxRows={maxRow}
          className={styles.textarea}
          {...props}
        />
      </div>
    )
  }
)

export default Textarea