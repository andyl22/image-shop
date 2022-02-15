import { ReactNode } from "react";
import styles from "./Form.module.scss";

interface Prop {
  children: ReactNode;
  title: string;
}

export default function Form(props: Prop) {
  const { children, title } = props;
  return (
    <form className={styles.formStyle}>
      <span className={styles.formHeader}>{title || "Form Title"}</span>
      <div className={styles.formContent}>{children}</div>
    </form>
  );
}
