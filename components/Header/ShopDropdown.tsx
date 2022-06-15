import { ReactNode } from 'react';
import styles from './ShopDropdown.module.scss';
import Dropdown from '../Dropdown/Dropdown';
import LinksList from '../LinksList/Linkslist';
import data from '../../TestData/Sections.json';
import DropdownContainer from './DropdownContainer';

interface Props {
  children: ReactNode;
}

export default function ShopDropdown(props: Props) {
  const { children } = props;

  const mappedLinks = Object.keys(data).map((linkGroupName) => {
    const formattedLink = linkGroupName
      .split(/(?=[A-Z])/g)
      .join(' ')
      .toUpperCase();
    return (
      <div className={styles.linksListWrapper} key={linkGroupName}>
        <LinksList
          linkGroupName={formattedLink}
          linkGroupLinks={data[linkGroupName as keyof typeof data]}
        />
      </div>
    );
  });

  const dropdownContent = (
    <DropdownContainer>
      <nav className={styles.shopNav}>{mappedLinks}</nav>
    </DropdownContainer>
  );

  return (
    <Dropdown dropdownContent={dropdownContent}>{children}</Dropdown>
  );
}
