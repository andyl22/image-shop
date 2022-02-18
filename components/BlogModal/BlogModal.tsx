import styles from "./BlogModal.module.scss";
import Modal from "../Modal/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { MouseEventHandler } from "react";

interface Props {
  title: string;
  subtitle: string;
  author: string;
  children: JSX.Element | JSX.Element[];
  headerImage: JSX.Element;
  toggleModal: MouseEventHandler;
}

export default function BlogModal(props: Props) {
  const { title, subtitle, author, children, headerImage, toggleModal } = props;
  return (
    <Modal toggleModal={toggleModal}>
      <div className={styles.modalBlogContent}>
        <span onClick={toggleModal}>
          <CloseIcon fontSize="small" className={styles.closeButton} />
        </span>
        <header className={styles.articleHeader}>
          <h1>{title}</h1>
          {headerImage}
          <span>
            <h2>{subtitle}</h2>
            <h2>By: {author}</h2>
          </span>
        </header>
        <article className={styles.articleContent}>{children}</article>
      </div>
    </Modal>
  );
}
