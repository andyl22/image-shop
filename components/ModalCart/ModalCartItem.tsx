import styles from "./ModalCartItem.module.scss";

interface Props {
  cartItemDetails: {
    name: String;
    quantity: number;
    price: number;
  }
}

export default function ModalCartItem(props: Props) {
  const { name, quantity, price } = props.cartItemDetails;
  return (
    <div className={styles.cartItem}>
      <p>{name}</p>
      <p>+ {quantity} -</p>
      <p>Price: ${price}</p>
    </div>
  );
}
