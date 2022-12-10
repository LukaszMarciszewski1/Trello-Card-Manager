import React, { forwardRef } from 'react'
import styles from './styles.module.scss'
import TextareaAutosize from 'react-textarea-autosize';

interface TextareaProps {
  id: any
  label: string
}

const Textarea: React.FC<TextareaProps> = forwardRef<HTMLInputElement, TextareaProps>(
  (
    {
      id,
      label,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={styles.container}> <br />
        <label htmlFor={id}>{label}</label>
        <TextareaAutosize
          id={id}
          maxRows={30}
          className={styles.textarea}
          // autoFocus={true}
          {...props}
        />
      </div>
    )
  }
)

export default Textarea