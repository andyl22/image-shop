import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2022 Parks</p>
      <Link href="/contact">
        <a>Contact Us</a>
      </Link>
      <Link href="/privacy">
        <a>Privacy Info</a>
      </Link>
      <Link href="/track">
        <a>Track Your Shipment</a>
      </Link>
      <Link href="/credits">
        <a>Credits</a>
      </Link>
    </footer>
  );
}
