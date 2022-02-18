import styles from "./BlogCard.module.scss";
import Image from "next/image";
import BlogModal from "../BlogModal/BlogModal";
import { useState } from "react";

interface Prop {
  title: string;
  subtitle: string;
  author: string;
  content: string;
  image: StaticImageData;
}

export default function BlogCard(props: Prop) {
  const { title, subtitle, author, content, image } = props;
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  const headerImage = (
    <div className={styles.blogImage}>
      <Image src={image} alt={`blog-${title}`} />
    </div>
  )

  const blogContent = (
    <BlogModal
      title={title}
      subtitle={subtitle}
      author={author}
      headerImage={headerImage}
      toggleModal={toggleModal}
    >
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
    </BlogModal>
  )

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
