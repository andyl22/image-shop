import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../../../styles/ShopItem.module.scss';
import PathNav from '../../../../components/PathNav/PathNav';
import AddToCart from '../../../../components/AddToCart/AddToCart';
import { postHTTP } from '../../../../utilities/fetchAPIs';
import { ItemType } from '../../../../TestData/Sections';

const ItemPage = () => {
  const router = useRouter();
  const itemID = router.asPath.split('/')[4];
  const [itemDetails, setItemDetails] = useState<
    ItemType | undefined
  >();

  useEffect(() => {
    const getItemDetails = async () => {
      const item = await postHTTP('/items/getItemByID', {
        id: itemID,
      })
        .then((res) => res.data)
        .catch((err) => console.log(err));
      setItemDetails(item);
    };
    getItemDetails();
  }, [itemID]);

  return (
    <main className={styles.main}>
      <PathNav />
      {itemDetails ? (
        <div className={styles.itemWrapper}>
          <h1>{itemDetails.name}</h1>
          <Image
            src={itemDetails.image}
            alt={itemDetails.name}
            width="1000px"
            height="800px"
            quality={100}
          />
          <p className={styles.itemDescription}>
            {itemDetails.description}
          </p>
          <p>
            {itemDetails.price === 0
              ? 'FREE'
              : `$${itemDetails.price}`}
          </p>
          <AddToCart
            id={itemDetails._id}
            name={itemDetails.name}
            price={itemDetails.price}
          />
        </div>
      ) : (
        <h1>Could not find item</h1>
      )}
    </main>
  );
};

export default ItemPage;
