import styles from "./BlogCard.module.scss";
import Image from "next/image";
import BlogModal from "../BlogModal/BlogModal";
import { ReactElement, useState } from "react";
import Link from "next/link";

interface Prop {
  id: number,
  title: string;
  subtitle: string;
  author: string;
  content: string;
  image: string;
}

export default function BlogCard(props: Prop) {
  const { id, title, content, image } = props;
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Link href={"/blog/[blogID]"} as={`/blog/${id}`}>
      <a>
        <div className={styles.blogCardContainer} onPointerDown={toggleModal}>
          <div className={styles.blogCardImage}>
            <Image src={image} layout="responsive" placeholder="blur" blurDataURL={image} height="100%" width="100%" alt={`blog-${title}`} />
          </div>
          <h1>{title}</h1>
          <div className={styles.content}>
            <p>
              {content}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
}
