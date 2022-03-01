import Header from "../../components/Header/Header";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BlogData from "../../TestData/BlogCard.json";
import BlogModal from "../../components/BlogModal/BlogModal";
import styles from "../../styles/BlogItem.module.scss";
import Image from "next/image";

interface Props {
  blogID: string;
}

const Item = (props: Props) => {
  const { blogID } = props;
  const blogInfo = BlogData.filter(item => item.id === parseInt(blogID))[0];
  const { title, subtitle, author, image, previewText } = blogInfo;
  const router = useRouter();

  const headerImage = (
    <div className={styles.blogImage}>
      <Image layout="responsive" placeholder="empty" height="70%" width="100%" src={image} alt={`blog-${title}`} />
    </div>
  );

  const toggleModal = () => {
    router.back();
  }

  useEffect(() => {
    router.prefetch('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <BlogModal
        title={title}
        subtitle={subtitle}
        author={author}
        headerImage={headerImage}
        toggleModal={toggleModal}
      >
        <p>{previewText}</p>
      </BlogModal>
    </div>
  )
}

export default Item;

export function getStaticProps({ params: { blogID } }) {
  return { props: { blogID: blogID } }
}

export function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          blogID: '1'
        }
      }],
    fallback: false
  }
}

