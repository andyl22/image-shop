import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Link from 'next/link';
import { MouseEvent, useEffect, useState, ReactElement } from 'react';
import styles from './LeftNavMenu.module.scss';
import Modal from '../Modal/Modal';
import CollapsibleItem from '../CollapsibleItem/CollapsibleItem';
import LinksList from '../LinksList/Linkslist';
import { getHTTP } from '../../utilities/fetchAPIs';

interface Props {
  toggleModal: any;
}

interface Subsection {
  _id: string;
  name: string;
  section: string;
}

interface Section {
  _id: string;
  name: string;
}

export default function LeftNavMenu(props: Props) {
  const { toggleModal } = props;
  const [mappedLinks, setMappedLinks] = useState<ReactElement[]>([]);

  useEffect(() => {
    const mappedSections: ReactElement[] = [];
    const setSubsectionPaths = async () => {
      const sections = await getHTTP('/items/getAllSections')
        .then((res) => res.data)
        .catch((err) => console.log(err));
      const allSubsections = await getHTTP('/items/getAllSubsections')
        .then((res) => res.data)
        .catch((err) => console.log(err));
      sections.forEach((section: Section) => {
        const subsections = allSubsections.filter(
          (subsection: Subsection) =>
            subsection.section === section._id,
        );
        const mappedSection = (
          <LinksList
            sectionName={section.name}
            key={section._id}
            linkGroupLinks={subsections}
          />
        );
        mappedSections.push(mappedSection);
      });
      setMappedLinks(mappedSections);
    };
    setSubsectionPaths();
  }, []);

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
          <div className={styles.collapseContent}>
            {mappedLinks || null}
          </div>
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
