import React, { forwardRef } from "react";
import styles from "./styles.module.scss";

export type SelectProps = {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "number" | "password";
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  error?: {} | undefined | ((value: any) => void);
  value?: number | string | any;
  step?: string;
  minValue?: number;
  maxValue?: number;
  defaultValue?: string | number;
  style?: {};
  options: any;
};

const Input: React.FC<SelectProps> = forwardRef<HTMLInputElement, SelectProps>(
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
      options,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className={styles.container}>
        <label htmlFor="title">
          <p>{label}</p>
        </label>
        <select className={styles.select}>
          {options.map((prod: { name: any }, index: any) => (
            <option key={index} value={prod.name}>
              {prod.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Input;
