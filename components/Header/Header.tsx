import styles from "./Header.module.scss";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export default React.memo(function Header() {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(true);
  const [currentBasePath] = useState(router.asPath.split("/")[1]);

  let lastScroll = useRef(0);

  const handleScroll = (e: Event) => {
    // need the negative check for Safari over scroll
    if (window.scrollY > lastScroll.current && window.scrollY > 0) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    lastScroll.current = window.scrollY;
  };

  useEffect(() => {
    if (currentBasePath) {
      const baseLink = document.querySelector(`a[href='/${currentBasePath}']`);
      baseLink?.setAttribute("style", "font-weight: bolder; color: green;");
    }
  }, [currentBasePath]);

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
})
