import Link from "next/link";
import styles from "./LinksList.module.scss";

interface Props {
  linkGroupName: string;
  linkGroupLinks: { linkName: string; linkURL: string }[];
}

export default function LinksList(props: Props) {
  const { linkGroupName, linkGroupLinks } = props;

  const mappedLinks = linkGroupLinks.map((link) => (
    <li key={link.linkName}>
      <Link href={link.linkURL}>
        <a>{link.linkName}</a>
      </Link>
    </li>
  ));

  return (
    <figure className={styles.listFigure}>
      <figcaption>{linkGroupName}</figcaption>
      <ul>{mappedLinks}</ul>
    </figure>
  );
}
