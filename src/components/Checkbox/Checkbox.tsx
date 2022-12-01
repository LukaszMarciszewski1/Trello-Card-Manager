import React, { forwardRef } from 'react'
import styles from './styles.module.scss'
interface CheckboxProps {
  id: string
  type: string
  label: string
  value: string
  style?: {}
}

const Checkbox: React.FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      type,
      label,
      value,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <input
          className={styles.checkbox}
          id={id}
          ref={ref}
          type={type}
          value={value}
          {...props}
        />
        <label
          htmlFor={id}
          style={style}
          className={styles.label}>
          {label}
        </label>
      </>
    )
  }
)

export default Checkbox