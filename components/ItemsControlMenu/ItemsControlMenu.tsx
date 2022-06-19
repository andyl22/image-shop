import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import CollapsibleItem from '../CollapsibleItem/CollapsibleItem';
import styles from './ItemsControlMenu.module.scss';
import ItemCardLink from '../ItemCard/ItemCardLink';
import { formatTitle } from '../../utilities/StringFormat';
import { Item } from '../../TestData/Sections';

interface Props {
  itemData: Item[];
  title: string;
}

export default function SortMenu(props: Props) {
  const { itemData, title } = props;
  const [singleSelected, setSingleSelected] = useState('popularity');
  const [mappedItems, setMappedItems] = useState<any>();
  const [showFilters, setShowFilters] = useState(true);

  const toggleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCheck = (
    e: ChangeEvent<HTMLInputElement> | MouseEvent,
  ) => {
    const target = e.target as HTMLElement;
    const checkedId = target.id;
    if (checkedId === singleSelected) return;
    setSingleSelected(checkedId);
  };

  const mappedSortOptions = (() => {
    const sortOptions = [
      'popularity',
      'recent',
      'highestPrice',
      'lowestPrice',
    ];

    return sortOptions.map((option: any) => (
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
          className={
            singleSelected === option ? styles.highlighted : ''
          }
        >
          {formatTitle(option)}
        </label>
      </div>
    ));
  })();

  useEffect(() => {
    switch (singleSelected) {
      case 'popularity':
        itemData.sort((a, b) => a.visits - b.visits);
        break;
      case 'recent':
        itemData.sort((a, b) => {
          const toTimestamp = (strDate: Date) =>
            new Date(strDate).getTime();
          return (
            toTimestamp(b.createDttm) - toTimestamp(a.createDttm)
          );
        });
        break;
      case 'highestPrice':
        itemData.sort((a, b) => b.price - a.price);
        break;
      case 'lowestPrice':
        itemData.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    const mappedSectionData = itemData.map((item: Item) => {
      const { name, image, _id, description, price } = item;
      return (
        <ItemCardLink
          imageURL={image}
          name={name}
          id={_id}
          description={description}
          price={price}
          key={_id}
          enableCheckout
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
          parentNode={
            <div className={styles.menuOption}>Sort By</div>
          }
          showCollapsedOnLoad
        >
          <form className={styles.singleSelect}>
            {mappedSortOptions}
          </form>
        </CollapsibleItem>
      </div>
      <div className={styles.contentContainer}>
        <button
          className={`${styles.collapseFilters} ${
            showFilters ? styles.rotateButton : null
          }`}
          aria-label="Close Filter Menu"
          onClick={toggleShowFilters}
          type="button"
        >
          <ArrowLeftIcon />
        </button>
        <h1>{title}</h1>
        <div className={styles.itemsContent}>{mappedItems}</div>
      </div>
    </div>
  );
}
