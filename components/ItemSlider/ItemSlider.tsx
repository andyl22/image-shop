import { Children, useState, useMemo, ReactNode } from "react";
import styles from "./ItemSlider.module.scss";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface Props {
  children: ReactNode;
}

export default function ItemSlider(props: Props) {
  const { children } = props;
  const [pointer, setPointer] = useState(0);
  const childrenLength = useMemo(() => Children.count(children), [children])

  const decrementPointer = () => {
    if (pointer > 0) {
      setPointer(pointer - 1);
    } else {
      setPointer(childrenLength - 1);
    }
  }

  const incrementPointer = () => {
    if (pointer < childrenLength - 1) {
      setPointer(pointer + 1);
    } else {
      setPointer(0);
    }
  }

  const childrenToRender = (function () {
    if (pointer === childrenLength - 1) {
      return [children[childrenLength - 1], children[0]];
    }
    return children.slice(pointer, pointer + 2);
  })()

  return (childrenLength > 2) ?
    (
      <div className={styles.sliderContainer}>
        <ArrowBackIosNewIcon fontSize="small" className={styles.arrowIcons} onMouseDown={decrementPointer} />
        {childrenToRender}
        <ArrowBackIosNewIcon fontSize="small" className={`${styles.flipIcon} ${styles.arrowIcons}`} onMouseDown={incrementPointer} />
      </div>
    ) : (
      <div className={styles.sliderContainer}>
        {childrenToRender}
      </div>
    )
}