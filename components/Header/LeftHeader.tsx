import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./LeftHeader.module.scss";
import ShopDropdown from "./ShopDropdown";
import MenuIcon from '@mui/icons-material/Menu';
import LeftNavMenu from "./LeftNavMenu";

export default function LeftHeader() {
  const [innerWidth, setInnerWidth] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  }

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  })

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const fullLeftNav = (
    <>
      <Link href="/">
        <a className={styles.visualHighlight}>
          <h1>Parks</h1>
        </a>
      </Link>
      <ShopDropdown>
        <button className={`${styles.shopLink} ${styles.visualHighlight}`}>Shop</button>
      </ShopDropdown>
      <Link href="/blog">
        <a className={styles.visualHighlight}>Blog</a>
      </Link>
      <Link href="/about">
        <a className={styles.visualHighlight}>About</a>
      </Link>
    </>
  )

  const partialLeftNav = (
    <>
      {showModal ? <LeftNavMenu toggleModal={toggleModal} /> : null}
      <MenuIcon onClick={() => toggleModal()} className={styles.hamburger}/>
      <Link href="/">
        <a className={styles.visualHighlight}>
          <h1>Parks</h1>
        </a>
      </Link>
    </>
  )

  return (
    <nav className={styles.headerLinkContainer}>
      {(innerWidth > 600) ? fullLeftNav : partialLeftNav}
    </nav>
  );
}
