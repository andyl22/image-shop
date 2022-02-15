import styles from "./Modal.module.scss";
import LoginForm from "../LoginForm/LoginForm";

interface Prop {
  title: string;
}

export default function Modal(props: Prop) {
  const { title } = props;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <span className={styles.modalHeader}>{title || "Modal Header"}</span>
        <LoginForm />
      </div>
    </div>
  );
}
