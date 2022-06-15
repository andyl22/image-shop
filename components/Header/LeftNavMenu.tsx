import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Link from 'next/link';
import { MouseEvent } from 'react';
import styles from './LeftNavMenu.module.scss';
import Modal from '../Modal/Modal';
import CollapsibleItem from '../CollapsibleItem/CollapsibleItem';
import data from '../../TestData/Sections.json';
import LinksList from '../LinksList/Linkslist';

interface Props {
  toggleModal: any;
}

export default function LeftNavMenu(props: Props) {
  const { toggleModal } = props;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.target as HTMLElement;
    const { tagName } = el;
    if (tagName === 'H1' || tagName === 'A') toggleModal();
  };

  const mappedLinks = Object.keys(data).map((linkGroupName) => {
    const formattedLink = linkGroupName
      .split(/(?=[A-Z])/g)
      .join(' ')
      .toUpperCase();
    return (
      <LinksList
        linkGroupName={formattedLink}
        key={linkGroupName}
        linkGroupLinks={data[linkGroupName as keyof typeof data]}
      />
    );
  });

  return (
    <Modal toggleModal={toggleModal}>
      <div className={styles.leftNavMenu}>
        <button
          aria-label="Close Menu"
          className={styles.backIcon}
          onClick={toggleModal}
          type="button"
        >
          <KeyboardDoubleArrowLeftIcon fontSize="medium" />
        </button>
        <Link href="/">
          <a>
            <h1>Parks</h1>
          </a>
        </Link>
        <CollapsibleItem
          parentNode={<p>Shop</p>}
          showCollapsedOnLoad={false}
        >
          <div className={styles.collapseContent}>{mappedLinks}</div>
        </CollapsibleItem>
        <Link href="/blog">
          <a>Blogs</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>
    </Modal>
  );
}
