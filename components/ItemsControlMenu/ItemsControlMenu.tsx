import CollapsibleItem from "../CollapsibleItem/CollapsibleItem";
import styles from "./ItemsControlMenu.module.scss";
import ItemCardLink from "../ItemCard/ItemCardLink";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { formatTitle } from "../../utilities/StringFormat";

interface Item {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface Props {
  itemData: Item[];
}

export default function SortMenu(props: Props) {
  const { itemData } = props;
  const [singleSelected, setSingleSelected] = useState<null | string>(
    "popularity"
  );

  const mappedSectionData = itemData.map((item: Item) => {
    const { name, image, id, description, price } = item;
    return (
      <ItemCardLink
        imageURL={image}
        name={name}
        id={id}
        description={description}
        price={price}
        key={id}
        enableCheckout={true}
      />
    );
  });

  const singleCheck = (e: ChangeEvent<HTMLInputElement> | MouseEvent) => {
    const target = e.target as HTMLElement;
    const checkedId = target.id;
    setSingleSelected(checkedId);
  };

  const mappedSortOptions = (() => {
    const sortOptions = [
      "popularity",
      "recent",
      "trending",
      "highestPrice",
      "lowestPrice",
    ];

    return sortOptions.map((option: any) => {
      return (
        <div className={styles.checkboxContainer} key={option}>
          <input
            type="checkbox"
            name={option}
            id={option}
            checked={singleSelected === option}
            onChange={singleCheck}
          />
          <label
            htmlFor={option}
            className={singleSelected === option ? styles.highlighted : ""}
          >
            {formatTitle(option)}
          </label>
        </div>
      );
    });
  })();

  useEffect(() => {
    setSingleSelected("popularity");
  }, []);

  return (
    <div className={styles.itemsControlContainer}>
      <div className={styles.filtersContainer}>
        <CollapsibleItem
          parentNode={<div className={styles.menuOption}>Sort By</div>}
          showCollapsedOnLoad={true}
        >
          <form className={styles.singleSelect}>{mappedSortOptions}</form>
        </CollapsibleItem>
      </div>
      <div className={styles.itemsContent}>{mappedSectionData}</div>
    </div>
  );
}
