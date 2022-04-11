import Header from "../../../../components/Header/Header";
import {
  getAllItems,
  getAllItemPaths,
} from "../../../../TestData/SectionItems";
import styles from "../../../../styles/ShopItem.module.scss";
import ItemCard from "../../../../components/ItemCard/ItemCard";
import PathNav from "../../../../components/PathNav/PathNav";

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
      <Header />
      <main className={styles.main}>
        <PathNav />
        <ItemCard
          imageURL={details.image}
          name={details.name}
          description={details.description}
          price={details.price}
          id={details.id}
          enableCheckout={true}
        />
      </main>
    </>
  );
};

export default Item;
