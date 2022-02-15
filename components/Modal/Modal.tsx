import styles from "./Modal.module.scss";
import LoginForm from "../Login/LoginForm";

interface Prop {
  title: string;
  children: React.ReactNode;
}

export default function Modal(props: Prop) {
  const { title, children } = props;
  return (
    <div className={styles.modalOverlay}>
      {children}
    </div>
  );
}
