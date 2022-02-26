import styles from "./Header.module.scss";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);

  let lastScroll = useRef(0);

  const handleScroll = (e: Event) => {
    if(window.scrollY <= 0 ) {
      setShowHeader(true);
    } else if (window.scrollY > lastScroll.current) {
      console.log(window.scrollY, lastScroll.current)
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    lastScroll.current = window.scrollY;
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className={`${styles.header} ${showHeader ? null : styles.hide}`}>
      <div className={styles.headerContentContainer}>
        <LeftNav />
        <Link href="/">
          <a>
            <h1>Parks</h1>
          </a>
        </Link>
        <RightNav />
      </div>
    </header>
  );
}
