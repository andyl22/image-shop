import { useRouter } from "next/router";
import { useEffect } from "react";
import BlogData from "../../TestData/BlogData.json";
import BlogModal from "../../components/BlogModal/BlogModal";
import { getBlogIDs } from "../../TestData/BlogData";
import Header from "../../components/Header/Header";
import styles from "../../styles/BlogModal.module.scss";

interface Props {
  blogID: string;
}

export default function Item(props: Props) {
  const { blogID } = props;
  const blogInfo = BlogData.filter((item) => item.id === parseInt(blogID))[0];
  const { title, subtitle, author, image, previewText } = blogInfo;
  const router = useRouter();

  const toggleModal = () => router.back();

  useEffect(() => {
    router.prefetch("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.blogModalPage}>
      <Header />
      <div className={styles.modalContainer}>
        <BlogModal
          title={title}
          subtitle={subtitle}
          author={author}
          headerImage={image}
          toggleModal={toggleModal}
        >
          <p>{previewText}</p>
        </BlogModal>
      </div>
    </div>
  );
}

interface getStaticProps {
  params: { blogID: string };
}

export function getStaticProps({ params: { blogID } }: getStaticProps) {
  return { props: { blogID: blogID } };
}

export function getStaticPaths() {
  const paths = getBlogIDs();
  return {
    paths,
    fallback: false,
  };
}
