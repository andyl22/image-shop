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

      <div className={styles.blogCardImage}>
        <Image
          src={image}
          width={100}
          height={100}
          style={{ width: '100%', height: 'auto' }}
          placeholder="blur"
          blurDataURL={image}
          alt={`blog-${title}`}
          quality={1}
          priority
        />
      </div>

    </Link>
  );
}
