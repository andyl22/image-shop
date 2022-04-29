import {
  getAllItems,
  getAllItemPaths,
} from "../../../../TestData/SectionItems";
import styles from "../../../../styles/ShopItem.module.scss";
import PathNav from "../../../../components/PathNav/PathNav";
import Image from "next/image";
import AddToCart from "../../../../components/AddToCart/AddToCart";

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
    id: string;
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
      <main className={styles.main}>
        <PathNav />
        <div className={styles.itemWrapper}>
          <h1>{details.name}</h1>
          <Image
            src={details.image}
            alt={details.name}
            width="1000px"
            height="800px"
            quality={100}
          />
          <p className={styles.itemDescription}>{details.description}</p>
          <p>{details.price === "0.00" ? "FREE" : details.price}</p>
          <AddToCart
            id={details.id}
            name={details.name}
            price={parseFloat(details.price)}
          />
        </div>
      </main>
    </>
  );
};

export default Item;
