import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  title?: string;
  onClick?: (e: any) => void;
  style?: {};
  icon?: JSX.Element
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  title,
  style,
  icon,
  type = 'button',
  disabled,
  onClick,
}) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className={styles.button}
      type={type}
      style={style}
      disabled={disabled}
    >
      {icon} {title}
    </button>
  );
};

export default Button;
