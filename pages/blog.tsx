import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import styles from "../styles/Blog.module.scss";
import BlogCard from "../components/BlogCards/BlogCard";
import TestImage from "../public/images/home-background.jpg";

const Blog: NextPage = () => {
  return (
    <>
      <Head>
        <title>Image Board</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <BlogCard
          title="New Blog Post"
          subtitle="Random Test Article"
          author="Andy"
          content="Blog Content"
          image={TestImage}
        >
          <p>Hello there. My name is Andy Lau.</p>
        </BlogCard>
        <BlogCard
          title="New Blog Post"
          subtitle="Random Test Article"
          author="Andy"
          content="Blog Content"
          image={TestImage}
        >
          <p>Hello there. My name is Andy Lau.</p>
        </BlogCard>
        <BlogCard
          title="New Blog Post"
          subtitle="Random Test Article"
          author="Andy"
          content="Blog Content"
          image={TestImage}
        >
          <p>Hello there. My name is Andy Lau.</p>
        </BlogCard>
        <BlogCard
          title="New Blog Post"
          subtitle="Random Test Article"
          author="Andy"
          content="Blog Content"
          image={TestImage}
        >
          <p>Hello there. My name is Andy Lau.</p>
        </BlogCard>
      </main>
    </>
  );
};

export default Blog;
