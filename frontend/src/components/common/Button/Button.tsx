import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  title?: string;
  onClick?: (e: any) => void;
  style?: {};
  icon?: JSX.Element
  type?: "button" | "submit" | "reset" | undefined
  disabled?: any
  ref?: any
  
}

const Button: React.FC<ButtonProps> = ({ title, onClick, style, icon, type='button', disabled, ref }) => {
  return (
    <button
      onClick={onClick}
      className={styles.button}
      style={style}
      type={type}
      title={title}
      disabled={disabled}
    >
      {icon} {title}
    </button>
  );
};

export default Button;
