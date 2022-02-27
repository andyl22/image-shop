import { Children, useState, useMemo, ReactNode, useEffect } from "react";
import styles from "./ItemSlider.module.scss";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface Props {
  children: ReactNode;
}

export default function ItemSlider(props: Props) {
  const { children } = props;
  const [pointer, setPointer] = useState(0);
  const [itemsToRender, setItemsToRender] = useState(0);
  const childrenLength = useMemo(() => Children.count(children), [children]);

  const decrementPointer = () => {
    if (pointer > 0) {
      setPointer(pointer - 1);
    } else {
      setPointer(childrenLength - 1);
    }
  };

  const incrementPointer = () => {
    console.log(pointer, childrenLength, itemsToRender);
    if (pointer < childrenLength - 1) {
      setPointer(pointer + 1);
    } else {
      setPointer(0);
    }
  };

  const childrenToRender = (function () {
    if (pointer === childrenLength - itemsToRender) {
      return [children[childrenLength - 1], children[0]];
    }
    return children.slice(pointer, pointer + itemsToRender+1);
  })();

  const handleResize = (e: Event) => {
    setItemsToRender(Math.max(2, Math.floor(e.target.innerWidth/350))-1);
  }

  useEffect(() => {

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  })

  return (childrenLength > 2) ?
    (
      <div className={styles.sliderContainer}>
        <button aria-label="previous image" onClick={decrementPointer}>
          <ArrowBackIosNewIcon fontSize="small" className={styles.arrowIcons} />
        </button>
        {childrenToRender}
        <button aria-label="next image" onClick={incrementPointer}>
          <ArrowBackIosNewIcon fontSize="small" className={`${styles.flipIcon} ${styles.arrowIcons}`} />
        </button>
      </div>
    ) : (
      <div className={styles.sliderContainer}>
        {childrenToRender}
      </div>
    )
}