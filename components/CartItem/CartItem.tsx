/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import Image from 'next/image';
import styles from './CartItem.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import {
  add,
  decrease,
  remove,
  set,
} from '../../redux/slices/cartSlice';
import { getAllItems } from '../../TestData/SectionItems';

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
  const { id } = props;
  const [quantity, setQuantity] = useState(
    props.cartItemDetails.quantity,
  );
  const [showInput, setShowInput] = useState(quantity > 9);

  const dispatch = useAppDispatch();

  const picklistValues = [
    '0 (Delete Item)',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    '10+',
  ];

  const mappedPicklistValues = picklistValues.map((value) => (
    <option value={value} key={value}>
      {value}
    </option>
  ));

  const updateQuantity = (quantity: SetStateAction<number>) => {
    quantity > 9 ? setShowInput(true) : setShowInput(false);
    setQuantity(quantity);
  };

  // increment or decrement functions fired by button presses
  const increment = () => {
    dispatch(add({ id, name, quantity: 1, price }));
    updateQuantity(quantity + 1);
  };

  // delete an item from cart. used by the below handlers
  const deleteItem = () => {
    dispatch(remove({ id: props.id }));
  };

  const decrement = () => {
    // eslint-disable-next-line no-unused-expressions
    quantity <= 1
      ? deleteItem()
      : dispatch(
          decrease({
            id,
            name,
            quantity: 1,
            price,
          }),
        );
    updateQuantity(quantity - 1);
  };

  // handling picklist change events
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedQuantity = e.target.value;
    if (selectedQuantity === '0 (Delete Item)') {
      deleteItem();
      return;
    }
    if (selectedQuantity === '10+') {
      setShowInput(true);
      return;
    }
    setQuantity(parseInt(selectedQuantity, 10));
    dispatch(
      set({
        id,
        name,
        quantity,
        price,
      }),
    );
  };

  // input control for quantity update form
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10) || 0);
  };

  // update cart values
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!quantity) {
      deleteItem();
    } else {
      if (quantity > 9)
        ((e.target as HTMLElement).firstChild as HTMLElement).blur();
      updateQuantity(quantity);
      dispatch(
        set({
          id,
          name,
          quantity,
          price,
        }),
      );
    }
  };

  const fullItemData = getAllItems().filter(
    // eslint-disable-next-line eqeqeq
    (item: { id: string }) => item.id == id,
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
        {showInput ? (
          <form
            onSubmit={handleSubmit}
            className={styles.quantityForm}
          >
            <input
              type="text"
              value={quantity}
              onChange={handleInputChange}
            />
            {props.cartItemDetails.quantity !== quantity ? (
              <input type="submit" value="✓" />
            ) : null}
          </form>
        ) : (
          <>
            <button
              aria-label="Add to Cart"
              onClick={increment}
              type="button"
            >
              <AddIcon fontSize="small" />
            </button>
            <select
              value={quantity}
              className={styles.pickList}
              onChange={handleSelectChange}
            >
              {mappedPicklistValues}
            </select>
            <button
              aria-label="Remove From Cart"
              onClick={decrement}
              type="button"
            >
              <RemoveIcon fontSize="small" />
            </button>
          </>
        )}
      </div>
      <p>Subtotal: ${quantity * price}</p>
      <button
        aria-label="Remove All Items From Cart"
        onClick={deleteItem}
        className={styles.closeButton}
        type="button"
      >
        Remove
      </button>
    </div>
  );
}
