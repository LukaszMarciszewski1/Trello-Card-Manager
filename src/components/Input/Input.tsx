import React, { forwardRef } from 'react'
import styles from './styles.module.scss'

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'number' | 'password' | 'date';
  placeholder?: string
  disabled?: boolean
  onChange?: (value: any) => void
  error?: {} | undefined | ((value: any) => void)
  value?: number | string | any
  step?: string
  minValue?: number
  maxValue?: number
  defaultValue?: string | number
  style?: {}
}

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type,
      placeholder,
      disabled,
      value,
      defaultValue,
      step,
      minValue,
      maxValue,
      style,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className={styles.container}>
        <label htmlFor="title"><p>{label}</p></label>
        <input
          id={id}
          ref={ref}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          aria-label={label}
          placeholder={placeholder}
          step={step}
          min={minValue}
          max={maxValue}
          onChange={onChange}
          disabled={disabled}
          className={styles.input}
          style={style}
          {...props}
        />
      </div>
    )
  }
)

export default Input