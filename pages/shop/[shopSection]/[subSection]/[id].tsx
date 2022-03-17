import Header from "../../../../components/Header/Header";
import {
  getAllItems,
  getAllItemPaths,
} from "../../../../TestData/SectionItems";
import styles from "../../../../styles/Item.module.scss";
import Image from "next/image";
import AddShoppingCartOutlined from "@mui/icons-material/AddShoppingCartOutlined";
import { useRef } from "react";

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
  const animateRef = useRef(null);
  const { details } = props;
  let disabled: boolean = false;

  const handleClick = () => {
    if (disabled) return;
    disabled = true;
    if (animateRef.current) {
      setTimeout(() => {
        disabled = false;
        if (animateRef.current) {
          (animateRef.current as HTMLElement).classList.remove(styles.animate);
        }
      }, 1000);
      (animateRef.current as HTMLElement).classList.add(styles.animate);
    }
  };

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
            placeholder="blur"
            blurDataURL={details.image}
          />
        </div>
        <div className={styles.itemContent}>
          <div className={styles.itemText}>
            <p>{details.description}</p>
            <p>{details.price}</p>
          </div>
          <button
            aria-label="add to cart"
            onClick={handleClick}
            ref={animateRef}
          >
            <AddShoppingCartOutlined />
          </button>
        </div>
      </main>
    </>
  );
};

export default Item;
