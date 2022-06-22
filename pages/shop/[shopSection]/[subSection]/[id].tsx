import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../../../../styles/ShopItem.module.scss';
import PathNav from '../../../../components/PathNav/PathNav';
import AddToCart from '../../../../components/AddToCart/AddToCart';
import { postHTTP } from '../../../../utilities/fetchAPIs';

const ItemPage = () => {
  const router = useRouter();
  const itemID = router.asPath.split('/')[4];
  const [content, setContent] = useState(<h2>Loading...</h2>);
  const [title, setTitle] = useState('Loading...');

  useEffect(() => {
    const getItemDetails = async () => {
      await postHTTP('/items/getItemByID', {
        id: itemID,
      })
        .then((res) => res.data)
        .then((res) => {
          setTitle(res.name);
          setContent(
            <div className={styles.itemWrapper}>
              <h1>{res.name}</h1>
              <Image
                src={res.image}
                alt={res.name}
                width="1000px"
                height="800px"
                quality={100}
              />
              <p className={styles.itemDescription}>
                {res.description}
              </p>
              <p>{res.price === 0 ? 'FREE' : `$${res.price}`}</p>
              <AddToCart
                id={res._id}
                name={res.name}
                price={res.price}
              />
            </div>,
          );
        })
        .catch((err) => {
          console.log(err);
          setContent(<h2>Could not fetch item details.</h2>);
        });
    };
    getItemDetails();
  }, [itemID]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <PathNav />
        {content}
      </main>
    </>
  );
};

export default ItemPage;
