import React, { forwardRef, useState } from "react";
import styles from "./styles.module.scss";

export type SelectProps = {
  id: string;
  label: string;
  onChange?: (value: any) => void;
  error?: {} | undefined | ((value: any) => void);
  value?: number | string;
  defaultValue?: string | number;
  style?: {};
  options: any;
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
      <div className={styles.container} ref={ref}>
        <label htmlFor="title">
          <p>{label}</p>
        </label>
        <select className={styles.select} id={id} {...props} >
          {options.map((prod: { value: string | number; label: string }, index: React.Key | null | undefined) => (
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
