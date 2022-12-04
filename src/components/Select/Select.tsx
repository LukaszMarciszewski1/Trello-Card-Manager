import React, { forwardRef, useState } from "react";
import styles from "./styles.module.scss";

export type SelectProps = {
  id: string;
  title?: string;
  label: string;
  name?: any;
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
      title,
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
      name,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className={styles.container} ref={ref}>
        <label htmlFor="title">
          <p>{label}</p>
        </label>
        <select className={styles.select} id={id} name={name} {...props} >
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
