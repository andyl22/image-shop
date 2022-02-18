import styles from "./BlogCard.module.scss";
import Image from "next/image";
import BlogModal from "../BlogModal/BlogModal";
import { ReactElement, useState } from "react";

interface Prop {
  title: string;
  subtitle: string;
  author: string;
  content: string;
  image: StaticImageData;
  children: ReactElement;
}

export default function BlogCard(props: Prop) {
  const { title, subtitle, author, content, image, children } = props;
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const headerImage = (
    <div className={styles.blogImage}>
      <Image layout="responsive" src={image} alt={`blog-${title}`} />
    </div>
  );

  const blogContent = (
    <BlogModal
      title={title}
      subtitle={subtitle}
      author={author}
      headerImage={headerImage}
      toggleModal={toggleModal}
    >
      {children}
    </BlogModal>
  );

  return (
    <>
      {openModal ? blogContent : null}
      <div className={styles.blogCardContainer} onPointerDown={toggleModal}>
        <div className={styles.blogCardImage}>
          <Image src={image} alt={`blog-${title}`} />
        </div>
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </>
  );
}
