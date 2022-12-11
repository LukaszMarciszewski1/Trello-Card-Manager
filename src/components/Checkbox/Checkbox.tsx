import React, { forwardRef, useState } from 'react'
import styles from './styles.module.scss'
interface CheckboxProps {
  id: string
  type: string
  label: string
  value?: string
  name?: string
  style?: {}
  onChange?: (e: any) => void
  checked?: any
}

const Checkbox: React.FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      type,
      label,
      value,
      style,
      name,
      checked,
      onChange,
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
          name={name}
          checked={checked}
          onChange={onChange}
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