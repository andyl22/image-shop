import { ReactNode } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import DropdownContainer from './DropdownContainer';
import SheetLink from '../Sheet/SheetLink';
import { getBlogData } from '../../TestData/BlogData';
import styles from './BlogDropdown.module.scss';

interface Props {
  children: ReactNode | Array<ReactNode>;
}

export default function BlogDropdown(props: Props) {
  const { children } = props;
  const blogData = getBlogData();

  const mappedBlogSheets = blogData.slice(0, 4).map((item) => (
    <SheetLink
      background={`url(${item.image})`}
      border
      href={`/blog/${item.id}`}
      key={item.id}
      width="23%"
      height="300px"
    >
      <h2>{item.title}</h2>
    </SheetLink>
  ));

  const dropdownContent = (
    <DropdownContainer>
      <div className={styles.blogDropdown}>{mappedBlogSheets}</div>
    </DropdownContainer>
  );

  return (
    <Dropdown dropdownContent={dropdownContent}>{children}</Dropdown>
  );
}
