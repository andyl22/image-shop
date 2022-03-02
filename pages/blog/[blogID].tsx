import { useRouter } from "next/router";
import BlogData from "../../TestData/BlogData.json";
import BlogModal from "../../components/BlogModal/BlogModal";
import { getBlogIDs } from "../../TestData/BlogData";
import Header from "../../components/Header/Header";
import styles from "../../styles/BlogModal.module.scss";
import Head from "next/head";

interface Props {
  blogID: string;
}

export default function Item(props: Props) {
  const { blogID } = props;
  const blogInfo = BlogData.filter((item) => item.id === parseInt(blogID))[0];
  const { title, subtitle, author, image, previewText } = blogInfo;
  const router = useRouter();

  const toggleModal = () => router.back();

  return (
    <div className={styles.blogModalPage}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.modalContainer}>
        <BlogModal
          title={title}
          subtitle={subtitle}
          author={author}
          headerImage={image}
          toggleModal={toggleModal}
        >
          <p>{previewText}</p>
        </BlogModal>
      </main>
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
