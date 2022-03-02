import styles from "./ShopItemCard.module.scss";
import ItemCard from "./ItemCard";

interface Props {
  name: string;
  description: string;
  imageURL: string;
  link: string;
  price: string;
}

export default function ShopItemCard(props: Props) {
  const { name, description, imageURL, link, price } = props;
  return (
    <ItemCard name={name} imageURL={imageURL} link={link}>
      <div className={styles.itemMetadata}>
        <p>{description}</p>
        <p>{price}</p>
      </div>
    </ItemCard>
  );
}
