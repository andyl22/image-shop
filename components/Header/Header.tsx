import styles from "./Header.module.scss";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";
import React, { useEffect, useState, useRef } from "react";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);

  // hide on scroll down, show on scroll up
  let lastScroll = useRef(0);
  const handleScroll = (e: Event) => {
    // negative check for Safari overscroll
    if (window.scrollY > lastScroll.current && window.scrollY > 0) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    lastScroll.current = window.scrollY;
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <header className={`${styles.header} ${showHeader ? null : styles.hide}`}>
      <LeftHeader />
      <RightHeader />
    </header>
  );
}
