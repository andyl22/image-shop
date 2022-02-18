import styles from "./BlogCard.module.scss";
import testImage from "../../public/images/home-background.jpg";
import Image from "next/image";
import Link from "next/link";

interface Prop {
  title: string;
  author: string;
  content: string;
}

export default function BlogCard(props: Prop) {
  const { title, content } = props;
  return (
    <Link href="/about">
      <a className={styles.blogCardContainer}>
        <div className={styles.blogImage}>
          <Image src={testImage} alt={`blog-${title}`} />
        </div>
        <h1>{title}</h1>
        <p>{content}</p>
      </a>
    </Link>
  );
}
