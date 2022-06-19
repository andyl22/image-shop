import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogCard.module.scss';

interface Prop {
  id: number;
  title: string;
  content: string;
  image: string;
}

export default function BlogCard(props: Prop) {
  const { id, title, content, image } = props;

  return (
    <Link href="/blog/[blogID]" as={`/blog/${id}`}>
      <a>
        <div className={styles.blogCardContainer}>
          <div className={styles.blogCardImage}>
            <Image
              src={image}
              layout="responsive"
              placeholder="blur"
              blurDataURL={image}
              height="100%"
              width="100%"
              alt={`blog-${title}`}
              quality="1"
              priority
            />
          </div>
          <h1>{title}</h1>
          <div className={styles.content}>
            <p>{content}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
