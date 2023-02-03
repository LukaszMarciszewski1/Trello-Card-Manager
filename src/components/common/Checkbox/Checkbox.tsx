import React, { forwardRef } from 'react'
import styles from './styles.module.scss'
interface CheckboxProps {
  id: string
  type: string
  label?: string
  title?:string
  value?: string
  name?: string
  style?: {}
  onChange?: (e: any) => void
  error?: {} | undefined | ((value: any) => void)
  checked?: boolean
  children?: JSX.Element | JSX.Element[]
}

const Checkbox: React.FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      type,
      label,
      title,
      value,
      style,
      name,
      checked,
      onChange,
      error,
      children,
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
          title={label}
          className={`${styles.label} ${error && styles.error}`}
          >
          {children}
          {label}
        </label>
      </>
    )
  }
)

export default Checkbox