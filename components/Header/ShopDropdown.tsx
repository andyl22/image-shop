import React, { ReactNode, useEffect, useState } from 'react';
import styles from './ShopDropdown.module.scss';
import Dropdown from '../Dropdown/Dropdown';
import LinksList from '../LinksList/Linkslist';
import DropdownContainer from './DropdownContainer';
import { postHTTP } from '../../utilities/fetchAPIs';

interface Section {
  _id: string;
  name: string;
  __V: Number;
}

interface Props {
  children: ReactNode;
  sections: Section[];
}

export default function ShopDropdown(props: Props) {
  const { children, sections } = props;
  const [mappedSections, setMappedSections] = useState<ReactNode[]>();

  useEffect(() => {
    const mapSections = async () => {
      setMappedSections(
        await Promise.all(
          sections.map(async (section) => {
            const { name, _id } = section;
            const linkGroupLinks = await postHTTP(
              '/items/getSubsectionsBySectionID',
              { section: _id },
            )
              .then((res) => res.data)
              .catch((err) => console.log(err));

            return (
              <div className={styles.linksListWrapper} key={name}>
                <LinksList
                  linkGroupLinks={linkGroupLinks}
                  sectionName={name}
                />
              </div>
            );
          }),
        ),
      );
    };

    mapSections();
  }, [sections]);

  const dropdownContent = (
    <DropdownContainer>
      <nav className={styles.shopNav}>{mappedSections}</nav>
    </DropdownContainer>
  );

  return (
    <Dropdown dropdownContent={dropdownContent}>{children}</Dropdown>
  );
}
