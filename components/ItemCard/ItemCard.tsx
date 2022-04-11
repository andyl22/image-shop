import styles from "./ItemCard.module.scss";
import Image from "next/image";
import OverflowToolTip from "../Tooltip/OverflowTooltip";
import AddToCart from "../AddToCart/AddToCart";

interface Props {
  id: string;
  name: string;
  description?: string;
  imageURL: string;
  price?: string;
  enableCheckout?: boolean;
}

export default function ItemCard(props: Props) {
  const { id, name, description, imageURL, price, enableCheckout } = props;

  return (
    <div className={styles.itemCardContainer}>
      <OverflowToolTip tooltipContent={name}>
        <h2>{name}</h2>
      </OverflowToolTip>
      <div className={styles.imageWrapper}>
        <Image
          src={imageURL}
          alt={name}
          height="100%"
          width="100%"
          layout="responsive"
          placeholder="blur"
          blurDataURL={imageURL}
          quality="25"
        />
      </div>
      <div className={styles.itemContent}>
        {price === "0.00" ? <p>FREE</p> : price ? <p>${price}</p> : null}
        <p>{description}</p>
        {price && enableCheckout ? (
          <AddToCart id={id} name={name} price={parseFloat(price)} />
        ) : null}
      </div>
    </div>
  );
}
