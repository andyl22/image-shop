import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { MouseEventHandler, ReactElement } from 'react';
import Modal from '../Modal/Modal';
import styles from './BlogModal.module.scss';

interface Props {
  title: string;
  subtitle: string;
  author: string;
  children: ReactElement | ReactElement[];
  headerImage: string;
  toggleModal: MouseEventHandler;
}

export default function BlogModal(props: Props) {
  const {
    title,
    subtitle,
    author,
    children,
    headerImage,
    toggleModal,
  } = props;

  return (
    <Modal toggleModal={toggleModal} absolute allowOverlay>
      <div className={styles.modalBlogContent}>
        <button
          onClick={toggleModal}
          type="button"
          className={styles.closeButton}
        >
          <CloseIcon fontSize="small" className={styles.closeIcon} />
        </button>
        <div className={styles.articleHeader}>
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
        </div>
        <article className={styles.articleContent}>
          {children}
        </article>
      </div>
    </Modal>
  );
}
