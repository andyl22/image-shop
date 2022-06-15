import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './SheetLink.module.scss';
import Sheet from './Sheet';

interface Props {
  background: string;
  children: ReactNode | Array<ReactNode>;
  href: string;
  border?: boolean;
  height?: string;
  width?: string;
}

export default function SheetLink(props: Props) {
  const { background, border, children, href, height, width } = props;

  return (
    <Sheet
      background={background}
      border={border}
      allowHover
      height={height}
      width={width}
    >
      <Link href={href}>
        <a className={styles.fillSheet}>{children}</a>
      </Link>
    </Sheet>
  );
}
