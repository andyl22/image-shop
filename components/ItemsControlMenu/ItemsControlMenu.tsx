import CollapsibleItem from "../CollapsibleItem/CollapsibleItem";
import styles from "./ItemsControlMenu.module.scss";
import ItemCardLink from "../ItemCard/ItemCardLink";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { formatTitle } from "../../utilities/StringFormat";

interface Item {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  visits: number;
  createDttm: number;
  updateDttm: number;
}

interface Props {
  itemData: Item[];
  title: string;
}

export default function SortMenu(props: Props) {
  const { itemData, title } = props;
  const [singleSelected, setSingleSelected] = useState("popularity");
  const [mappedItems, setMappedItems] = useState<any>();
  const [showFilters, setShowFilters] = useState(true);

  const toggleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement> | MouseEvent) => {
    const target = e.target as HTMLElement;
    const checkedId = target.id;
    if (checkedId === singleSelected) return;
    setSingleSelected(checkedId);
  };

  const mappedSortOptions = (() => {
    const sortOptions = ["popularity", "recent", "highestPrice", "lowestPrice"];

    return sortOptions.map((option: any) => {
      return (
        <div className={styles.checkboxContainer} key={option}>
          <input
            type="checkbox"
            name={option}
            id={option}
            checked={singleSelected === option}
            onChange={handleCheck}
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
    switch (singleSelected) {
      case "popularity":
        itemData.sort((a, b) => a.visits - b.visits);
        break;
      case "recent":
        itemData.sort((a, b) => b.createDttm - a.createDttm);
        break;
      case "highestPrice":
        itemData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "lowestPrice":
        itemData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      default:
        break;
    }

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

    setMappedItems(mappedSectionData);
  }, [itemData, singleSelected]);

  return (
    <div className={styles.itemsControlContainer}>
      <div
        className={`${styles.filtersContainer} ${
          showFilters ? styles.hideFilters : null
        }`}
      >
        <CollapsibleItem
          parentNode={<div className={styles.menuOption}>Sort By</div>}
          showCollapsedOnLoad={true}
        >
          <form className={styles.singleSelect}>{mappedSortOptions}</form>
        </CollapsibleItem>
      </div>
      <div className={styles.contentContainer}>
        <button
          className={`${styles.collapseFilters} ${
            showFilters ? styles.rotateButton : null
          }`}
          aria-label="Close Filter Menu"
          onClick={toggleShowFilters}
        >
          <ArrowLeftIcon />
        </button>
        <h1>{title}</h1>
        <div className={styles.itemsContent}>{mappedItems}</div>
      </div>
    </div>
  );
}
