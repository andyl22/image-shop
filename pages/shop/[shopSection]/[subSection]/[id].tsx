import Header from "../../../../components/Header/Header";
import {
  getAllItems,
  getAllItemPaths,
} from "../../../../TestData/SectionItems";
import styles from "../../../../styles/Item.module.scss";
import Image from "next/image";

export const getStaticPaths = async () => {
  const paths = getAllItemPaths();
  return {
    paths,
    fallback: false,
  };
};

interface Params {
  params: {
    shopSection: string;
    subSection: string;
    id: number;
  };
}

export const getStaticProps = async ({ params }: Params) => {
  const item = getAllItems().filter(
    (item: { id: any }) => item.id == params.id
  )[0];
  return {
    props: {
      details: item,
    },
  };
};

interface Props {
  details: {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
  };
}

const Item = (props: Props) => {
  const { details } = props;
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>{details.name}</h1>
        <div className={styles.imageContainer}>
          <Image
            src={details.image}
            alt={details.name}
            layout="responsive"
            width="100%"
            height="100%"
          />
        </div>
        <p>{details.description}</p>
        <p>{details.price}</p>
      </main>
    </>
  );
};

export default Item;
