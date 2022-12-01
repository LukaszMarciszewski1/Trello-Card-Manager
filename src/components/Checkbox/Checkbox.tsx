import React, { forwardRef } from 'react'
import styles from './styles.module.scss'
import { useForm } from "react-hook-form";

interface CheckboxProps {
  type: string
  name: string
  id: string
  label: string
  value: string
}

const Checkbox: React.FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      type,
      label,
      name,
      value,
      ...props
    },
    ref
  ) => {
    // const form = useForm({
    //   defaultValues: {
    //     name: value
    //   },
    //   mode: "onChange"
    // });

    return (
      <div className={styles.selector}>
        <input
          className={styles.checkbox}
          id={id}
          type={type}
          value={value}
          name="selector"
          ref={ref}
          {...props}
        />
        <label
          htmlFor={id}
          className={styles.label}>
          {label}
        </label>
      </div>
    )
  }
)

export default Checkbox