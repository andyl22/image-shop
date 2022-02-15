import { ReactNode } from "react";
import styles from "./Form.module.scss";

interface Prop {
  children: ReactNode;
  parentStyles: string;
}

export default function Form(props: Prop) {
  const { children, parentStyles } = props;
  return (
    <form className={`${parentStyles} ${styles.formStyle}`}>{children}</form>
  );
}
