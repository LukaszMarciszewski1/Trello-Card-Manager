import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  title: string;
  onClick: () => void;
  style?: {};
  icon: any
}

const Button: React.FC<ButtonProps> = ({ title, onClick, style, icon}) => {
  return (
    <button onClick={onClick} className={styles.button} style={style}>
      {icon} {title}
    </button>
  );
};

export default Button;
