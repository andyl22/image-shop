import { FormEventHandler, ReactNode } from "react";
import styles from "./FormContainer.module.scss";

interface Prop {
  children: ReactNode;
  title: string;
  handleSubmit: FormEventHandler;
}

export default function FormContainer(props: Prop) {
  const { children, title, handleSubmit } = props;
  return (
    <form className={styles.formStyle} onSubmit={handleSubmit}>
      <span className={styles.formHeader}>{title || "Form Title"}</span>
      <div className={styles.formContent}>{children}</div>
    </form>
  );
}
