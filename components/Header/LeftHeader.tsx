import { useEffect, useState } from "react";
import styles from "./LeftHeader.module.scss";
import ShopDropdown from "./ShopDropdown";
import MenuIcon from "@mui/icons-material/Menu";
import LeftNavMenu from "./LeftNavMenu";
import BlogDropdown from "./BlogDropdown";
import Link from "next/link";

export default function LeftHeader() {
  const [innerWidth, setInnerWidth] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const fullLeftNav = (
    <>
      <Link href="/">
        <a>
          <h1>Parks</h1>
        </a>
      </Link>
      <ShopDropdown>
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
      <button onClick={toggleModal} className={styles.hamburger} >
        <MenuIcon/>
      </button>
      <Link href="/">
        <a className={styles.visualHighlight}>
          <h1>Parks</h1>
        </a>
      </Link>
    </>
  );

  return (
    <nav className={styles.headerLinkContainer}>
      {innerWidth && innerWidth < 600 ? partialLeftNav : fullLeftNav}
    </nav>
  );
}
