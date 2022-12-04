import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  title: string;
  onClick: () => void;
  style?: {};
  icon?: any
  type: "button" | "submit" | "reset" | undefined
}

const Button: React.FC<ButtonProps> = ({ title, onClick, style, icon, type }) => {
  return (
    <button onClick={onClick} className={styles.button} style={style} type={type}>
      {icon} {title}
    </button>
  );
};

export default Button;
