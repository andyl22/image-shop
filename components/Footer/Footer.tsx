import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2022 Parks</p>
      <Link href="/contact">
        Contact Us
      </Link>
      <Link href="/privacy">
        Privacy Info
      </Link>
      <Link href="/track">
        Track
      </Link>
      <Link href="/credits">
        Accreditation
      </Link>
    </footer>
  );
}
