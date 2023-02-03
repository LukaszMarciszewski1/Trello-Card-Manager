import React, { forwardRef } from "react";
import styles from "./styles.module.scss";

export type SelectProps = {
  id: string;
  label?: string;
  onChange?: (value: any) => void;
  error?: {} | undefined | ((value: any) => void);
  value?: number | string;
  defaultValue?: string | number;
  style?: {};
  options: any[]
};

const Input: React.FC<SelectProps> = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      id,
      label,
      value,
      defaultValue,
      style,
      options,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className={styles.container} ref={ref} style={style}>
        <label htmlFor={id}>{label}</label>
        <select id={id} {...props} onChange={onChange}>
          {options.map((prod: { value: string | number; label: string }, index: number) => (
            <option key={index} value={prod.value}>
              {prod.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Input;
