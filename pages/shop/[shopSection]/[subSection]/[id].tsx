import Image from 'next/image';
import styles from '../../../../styles/ShopItem.module.scss';
import PathNav from '../../../../components/PathNav/PathNav';
import AddToCart from '../../../../components/AddToCart/AddToCart';
import { getAllItemPaths } from '../../../../TestData/Sections';
import { postNode } from '../../../../utilities/fetchAPIs';

export const getStaticPaths = async () => {
  const paths = await getAllItemPaths();
  return {
    paths,
    fallback: false,
  };
};

interface Params {
  params: {
    shopSection: string;
    subsection: string;
    id: string;
  };
}

export const getStaticProps = async ({ params }: Params) => {
  const item = await postNode('/items/getItemByID', {
    _id: params.id,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    props: {
      details: item,
    },
  };
};

interface Props {
  details: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  };
}

const Item = (props: Props) => {
  const { details } = props;

  return (
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
        <p className={styles.itemDescription}>
          {details.description}
        </p>
        <p>{details.price === 0 ? 'FREE' : `$${details.price}`}</p>
        <AddToCart
          id={details._id}
          name={details.name}
          price={details.price}
        />
      </div>
    </main>
  );
};

export default Item;
