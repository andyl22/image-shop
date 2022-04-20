import styles from "./CartItem.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAppDispatch } from "../../redux/hooks";
import { add, decrease, remove, set } from "../../redux/slices/cartSlice";
import { getAllItems } from "../../TestData/SectionItems";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";

interface Props {
  id: string;
  cartItemDetails: {
    name: string;
    quantity: number;
    price: number;
  };
}

export default function CartItem(props: Props) {
  const { name, price } = props.cartItemDetails;
  const [quantity, setQuantity] = useState(props.cartItemDetails.quantity);
  const [showInput, setShowInput] = useState(quantity > 10);

  const dispatch = useAppDispatch();

  const picklistValues = ["0 (Delete Item)", 1, 2, 3, 4, 5, 6, 7, 8, 9, "10+"];

  const mappedPicklistValues = picklistValues.map((value) => {
    return (
      <option value={value} key={value}>
        {value}
      </option>
    );
  });

  // increment or decrement functions fired by button presses
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

  // delete an item from cart. used by the below handlers
  const deleteItem = () => {
    dispatch(remove({ id: props.id }));
  };

  // handling picklist change events
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const quantity = e.target.value;
    if (quantity === "0 (Delete Item)") {
      deleteItem();
      return;
    } else if (quantity === "10+") {
      setShowInput(true);
      return;
    }
    setQuantity(parseInt(quantity));
    dispatch(
      set({ id: props.id, name: name, quantity: quantity, price: price })
    );
  };

  // input control for quantity update form
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value) || 0);
  };

  // update cart values
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!quantity) {
      deleteItem();
    } else {
      setQuantity(quantity);
      dispatch(
        set({ id: props.id, name: name, quantity: quantity, price: price })
      );
      // either switch to picklist or blur the input to indicate an update to quantity is done
      if (quantity < 10) {
        setShowInput(false);
      } else {
        ((e.target as HTMLElement).firstChild as HTMLElement).blur();
      }
    }
  };

  const fullItemData = getAllItems().filter(
    (item: { id: string }) => item.id == props.id
  )[0];

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemHeader}>
        <h2>{name}</h2>
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
        {showInput ? (
          <form onSubmit={handleSubmit}>
            <input type="text" value={quantity} onChange={handleInputChange} />
          </form>
        ) : (
          <select
            value={quantity}
            className={styles.pickList}
            onChange={handleSelectChange}
          >
            {mappedPicklistValues}
          </select>
        )}
        <button aria-label="Remove From Cart" onClick={decrement}>
          <RemoveIcon fontSize="small" />
        </button>
      </div>
      <p>Subtotal: ${quantity * price}</p>
      <button
        aria-label="Remove All Items From Cart"
        onClick={deleteItem}
        className={styles.closeButton}
      >
        Remove
      </button>
    </div>
  );
}
