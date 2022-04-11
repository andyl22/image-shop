import styles from "./ModalCartItem.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../redux/hooks";
import { add, decrease, remove } from "../../redux/slices/cartSlice";

interface Props {
  id: string;
  cartItemDetails: {
    name: String;
    quantity: number;
    price: number;
  };
}

export default function ModalCartItem(props: Props) {
  const { name, quantity, price } = props.cartItemDetails;

  const dispatch = useAppDispatch();

  const increment = () => {
    dispatch(add({ id: props.id, name: name, quantity: 1, price: price }));
  };

  const decrement = () => {
    quantity <= 1
      ? deleteItem()
      : dispatch(
          decrease({ id: props.id, name: name, quantity: 1, price: price })
        );
  };

  const deleteItem = () => {
    dispatch(remove({ id: props.id }));
  };

  const setQuantity = () => {};

  return (
    <div className={styles.cartItem}>
      <p>{name}</p>
      <CloseIcon />
      <div className={styles.manageQuantities}>
        <button aria-label="Add to Cart" onClick={increment}>
          <AddIcon fontSize="small" />
        </button>
        <input
          type="text"
          value={quantity}
          name="quantity"
          onChange={setQuantity}
        />
        <button aria-label="Remove From Cart" onClick={decrement}>
          <RemoveIcon fontSize="small" />
        </button>
      </div>
      <p>Subtotal: ${quantity * price}</p>
    </div>
  );
}
