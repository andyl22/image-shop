import styles from "./BlogCard.module.scss";

interface Prop {
  title: string;
  author: string;
  content: string;
  publishDate: Date;
}

export default function BlogCard(props: Prop) {
  const { title, author, content, publishDate } = props;
  return (
    <div className={styles.blogCardContainer}>
      <span className={styles.blogCardHeader}>
        <h1>{title}</h1>
        <h2>{author}</h2>
        <p>{`${publishDate}`}</p>
      </span>
      <div className={styles.blogCardContent}>
        <p>{content}</p>
      </div>
    </div>
  );
}
