import React, { forwardRef } from 'react';
import styles from './styles.module.scss';

export type InputProps = {
  id: string;
  name?: string;
  label?: string;
  type?: 'text' | 'email' | 'number' | 'password' | 'date' | 'file';
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: {} | undefined | ((e: React.ChangeEvent<HTMLInputElement>) => void);
  value?: number | string;
  step?: string;
  minValue?: number;
  maxValue?: number;
  defaultValue?: string | number;
  style?: {};
  readOnly?: boolean;
};

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
      readOnly,
      error,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className={styles.container}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          ref={ref}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          aria-label={label}
          className={error && styles.error}
          placeholder={placeholder}
          step={step}
          min={minValue}
          max={maxValue}
          style={style}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={(e) => e.target.select()}
          multiple
          {...props}
        />
      </div>
    );
  }
);

export default React.memo(Input);
