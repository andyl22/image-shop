import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './ItemCardLink.module.scss';
import ItemCard from './ItemCard';
import AddToCart from '../AddToCart/AddToCart';

interface Props {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  price: number;
  enableCheckout?: boolean;
  link?: string;
}

export default function ShopItemCard(props: Props) {
  const {
    id,
    name,
    description,
    imageURL,
    price,
    enableCheckout,
    link,
  } = props;
  const router = useRouter();
  // If this component is being used in the base path, we don't want to construct the link href with a leading /
  const pathName = router.asPath === '/' ? '' : router.asPath;

  return (
    <div className={styles.itemCardWrapper}>
      <Link href={link || `${pathName}/${id}`}>
        <a className={styles.linkWrapper}>
          <ItemCard
            id={id}
            name={name}
            description={description}
            price={price}
            imageURL={imageURL}
          />
        </a>
      </Link>
      {enableCheckout ? (
        <AddToCart id={id} name={name} price={price} />
      ) : null}
    </div>
  );
}
