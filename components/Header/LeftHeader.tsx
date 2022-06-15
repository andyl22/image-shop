import { useEffect, useState, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './LeftHeader.module.scss';
import ShopDropdown from './ShopDropdown';
import LeftNavMenu from './LeftNavMenu';
import BlogDropdown from './BlogDropdown';
import { getHTTP } from '../../utilities/fetchAPIs';

export default function LeftHeader() {
  const linksRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [innerWidth, setInnerWidth] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentBasePath, setCurrentBasePath] = useState('');
  const [sections, setSections] = useState([]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // handle window resizing
  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  // handle window size setting on initial load
  useEffect(() => {
    setInnerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // get list of sections passed to header dropdown
  useEffect(() => {
    getHTTP('/items/getAllSections')
      .then((res) => setSections(res.data))
      .catch((err) => console.log(err));
  }, []);

  // modify path when navigating to trigger rehighlighting
  useEffect(() => {
    const basePath = router.asPath.split('/')[1];
    setCurrentBasePath(basePath);
  }, [router]);

  //
  useEffect(() => {
    const curLink = linksRef.current?.querySelector(
      `a[href='/${currentBasePath}']`,
    );
    if (curLink) curLink.classList.add(styles.activeBasePath);

    return () => {
      if (curLink) curLink.classList.remove(styles.activeBasePath);
    };
  }, [currentBasePath]);

  const fullLeftNav = (
    <>
      <Link href="/">
        <a aria-label="navigate to home page logo">
          <h1>Parks</h1>
        </a>
      </Link>
      <ShopDropdown sections={sections}>
        <Link href="/shop">
          <a className={styles.dropdownLink}>Shop</a>
        </Link>
      </ShopDropdown>
      <BlogDropdown>
        <Link href="/blog">
          <a className={styles.dropdownLink}>Blog</a>
        </Link>
      </BlogDropdown>
      <Link href="/about">
        <a>About</a>
      </Link>
    </>
  );

  const partialLeftNav = (
    <>
      {showModal ? <LeftNavMenu toggleModal={toggleModal} /> : null}
      <button
        onClick={toggleModal}
        className={styles.hamburger}
        type="button"
      >
        <MenuIcon />
      </button>
      <Link href="/">
        <a className={styles.visualHighlight}>
          <h1>Parks</h1>
        </a>
      </Link>
    </>
  );

  return (
    <nav className={styles.headerLinkContainer} ref={linksRef}>
      {innerWidth && innerWidth < 600 ? partialLeftNav : fullLeftNav}
    </nav>
  );
}
