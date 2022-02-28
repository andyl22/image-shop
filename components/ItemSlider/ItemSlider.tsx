import { Children, useState, useMemo, ReactNode, useEffect } from "react";
import styles from "./ItemSlider.module.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface Props {
  children: Array<ReactNode>;
}

export default function ItemSlider(props: Props) {
  const { children } = props;
  const [pointer, setPointer] = useState(0);
  const [itemsToRender, setItemsToRender] = useState(0);
  const childrenLength = useMemo(() => Children.count(children), [children]);

  // If pointer is greater than 0, then allow normal decrement. Otherwise, set to the end of the array.
  const decrementPointer = () => {
    pointer > 0 ? setPointer(pointer - 1) : setPointer(childrenLength - 1);
  };

  // If pointer does not exceed the max index, then allow normal increment. Otherwise, set the pointer to the start of the array.
  const incrementPointer = () => {
    pointer < childrenLength - 1 ? setPointer(pointer + 1) : setPointer(0);
  };

  // Determine how many children items we can display at once, based on the browser width
  const childrenToRender = (function () {
    // Exit and return the full list if the the available number of slots to render is greater than the list of children items
    if (itemsToRender >= childrenLength) return children;

    // set the slicing pointer to be the array max index - number of items in the list that can be rendered.
    // this will be used in calculating how many elements ahead should be sliced from the beginning
    const slicingPointer = childrenLength - itemsToRender;
    if (pointer > slicingPointer && children) {
      return [
        children.slice(pointer, childrenLength),
        children.slice(0, pointer - slicingPointer),
      ];
    }

    // otherwise, just return the array sliced normally
    return children.slice(pointer, pointer + itemsToRender);
  })();

  const handleResize = (e: UIEvent) => {
    const target = e.target as Window;
    setItemsToRender(Math.max(1, Math.floor(target.innerWidth / 300)));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    setItemsToRender(Math.max(2, Math.floor(window.innerWidth / 350)));
  }, []);

  const childrenWithArrowNav = (
    <div className={styles.sliderContainer}>
      <button aria-label="previous image" onClick={decrementPointer}>
        <ArrowBackIosNewIcon fontSize="small" className={styles.arrowIcons} />
      </button>
      {childrenToRender}
      <button aria-label="next image" onClick={incrementPointer}>
        <ArrowBackIosNewIcon
          fontSize="small"
          className={`${styles.flipIcon} ${styles.arrowIcons}`}
        />
      </button>
    </div>
  );

  const childrenWithoutArrowNav = (
    <div className={styles.sliderContainer}>{childrenToRender}</div>
  );

  return itemsToRender >= childrenLength
    ? childrenWithoutArrowNav
    : childrenWithArrowNav;
}
