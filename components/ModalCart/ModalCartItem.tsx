import styles from "./ModalCartItem.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../redux/hooks";
import { add, decrease, remove, set } from "../../redux/slices/cartSlice";
import { getAllItems } from "../../TestData/SectionItems";
import { useState } from "react";
import Image from "next/image";

interface Props {
  id: string;
  cartItemDetails: {
    name: string;
    quantity: number;
    price: number;
  };
}

export default function ModalCartItem(props: Props) {
  const { name, price } = props.cartItemDetails;
  const [quantity, setQuantity] = useState(props.cartItemDetails.quantity);

  const dispatch = useAppDispatch();

  const increment = () => {
    dispatch(add({ id: props.id, name: name, quantity: 1, price: price }));
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    quantity <= 1
      ? deleteItem()
      : dispatch(
          decrease({ id: props.id, name: name, quantity: 1, price: price })
        );
    setQuantity(quantity - 1);
  };

  const deleteItem = () => {
    dispatch(remove({ id: props.id }));
  };

  const handleInput = (e: any) => {
    const quantity = parseInt(e.target.value.replace(/^0+/, "")) || 0;
    setQuantity(quantity);
    dispatch(
      set({ id: props.id, name: name, quantity: quantity, price: price })
    );
  };

  const fullItemData = getAllItems().filter(
    (item: { id: string }) => item.id == props.id
  )[0];

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemHeader}>
        <h2>{name}</h2>
        <button aria-label="Remove All" onClick={deleteItem} className={styles.closeButton}>
          <CloseIcon fontSize="small" />
        </button>
      </div>
      <Image
        src={fullItemData.image}
        alt={name}
        height="128px"
        width="128px"
        quality={30}
      />
      <div className={styles.manageQuantities}>
        <button aria-label="Add to Cart" onClick={increment}>
          <AddIcon fontSize="small" />
        </button>
        <input
          type="text"
          value={quantity}
          name="quantity"
          onChange={handleInput}
        />
        <button aria-label="Remove From Cart" onClick={decrement}>
          <RemoveIcon fontSize="small" />
        </button>
      </div>
      <p>Subtotal: ${quantity * price}</p>
    </div>
  );
}
