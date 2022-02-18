import styles from "./BlogModal.module.scss";
import Modal from "../Modal/Modal";
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  title: string;
  subtitle: string;
  author: string;
  children: JSX.Element | JSX.Element[];
  headerImage: JSX.Element;
  toggleModal: Function;
}

export default function BlogModal(props: Props) {

  const closeModal = () => {

  }

  const { title, subtitle, author, children, headerImage, toggleModal } = props;
  return (
    <Modal toggleModal={toggleModal}>
      <div className={styles.modalBlogContent}>
        <CloseIcon fontSize="small" className={styles.closeButton} onClick={toggleModal} />
        <header className={styles.articleHeader}>
          {headerImage}
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <h2>By: {author}</h2>
        </header>
        <article className={styles.articleContent}>
          {children}
        </article>
      </div>
    </Modal>
  )
}