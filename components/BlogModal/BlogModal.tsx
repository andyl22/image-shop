import styles from "./BlogModal.module.scss";
import Modal from "../Modal/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { MouseEventHandler } from "react";

interface Props {
  title: string;
  subtitle: string;
  author: string;
  children: JSX.Element | JSX.Element[];
  headerImage: string;
  toggleModal: MouseEventHandler;
}

export default function BlogModal(props: Props) {
  const { title, subtitle, author, children, headerImage, toggleModal } = props;

  return (
    <Modal toggleModal={toggleModal} absolute={true}>
      <div className={styles.modalBlogContent}>
        <span onClick={toggleModal}>
          <CloseIcon fontSize="small" className={styles.closeButton} />
        </span>
        <header className={styles.articleHeader}>
          <h1>{title}</h1>
          <div className={styles.imageContainer}>
            <Image
              layout="responsive"
              src={headerImage}
              placeholder="blur"
              blurDataURL={headerImage}
              height="70%"
              width="100%"
              alt={`blog-${title}`}
              quality="50"
              priority
            />
          </div>
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
