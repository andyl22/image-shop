import Image from 'next/image';
import styles from '../../../../styles/ShopItem.module.scss';
import PathNav from '../../../../components/PathNav/PathNav';
import AddToCart from '../../../../components/AddToCart/AddToCart';
import { getAllItemPaths } from '../../../../TestData/Sections';
import Item from '../../../../models/Item';
import dbConnect from '../../../../utilities/mongo';

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
  await dbConnect();
  const data = await Item.findOne({ _id: params.id }).lean();
  data.id = JSON.stringify(data._id);
  data.subsection = JSON.stringify(data.subsection);
  delete data._id;
  delete data.__v;
  return {
    props: {
      details: data,
    },
  };
};

interface Props {
  details: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  };
}

const ItemPage = (props: Props) => {
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
          id={JSON.parse(details.id)}
          name={details.name}
          price={details.price}
        />
      </div>
    </main>
  );
};

export default ItemPage;
