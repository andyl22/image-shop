import { useRef } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { add } from '../../redux/slices/cartSlice';
import styles from './AddToCart.module.scss';

interface Props {
  id: string;
  name: string;
  price: number;
}

export default function AddToCart(props: Props) {
  const { id, name, price } = props;
  const dispatch = useAppDispatch();
  const animateRef = useRef(null);
  let disabled: boolean = false;

  const addToCart = () => {
    dispatch(add({ id, name, price, quantity: 1 }));
  };

  // throttle add to cart action
  const handleAddToCart = () => {
    if (disabled) return;
    disabled = true;
    if (animateRef.current) {
      setTimeout(() => {
        disabled = false;
        if (animateRef.current) {
          (animateRef.current as HTMLElement).classList.remove(
            styles.animate,
          );
        }
      }, 1000);
      (animateRef.current as HTMLElement).classList.add(
        styles.animate,
      );
    }
    addToCart();
  };

  return (
    <button type="button" onClick={handleAddToCart} ref={animateRef}>
      Checkout
    </button>
  );
}
