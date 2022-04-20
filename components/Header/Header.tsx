import styles from "./Header.module.scss";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";
import React, { useEffect, useState, useRef } from "react";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  let lastScroll = useRef(0);

  useEffect(() => {
    // hide on scroll down, show on scroll up
    const handleScroll = (e: Event) => {
      // negative check for Safari overscroll
      if (window.scrollY > lastScroll.current && window.scrollY > 0) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScroll.current = window.scrollY;
    };

    setTimeout(() => document.addEventListener("scroll", handleScroll), 1000);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${showHeader ? null : styles.hide}`}>
      <LeftHeader />
      <RightHeader />
    </header>
  );
}
