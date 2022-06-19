import Link from 'next/link';
import styles from './LinksList.module.scss';
import {
  formatTitle,
  formatToKebabCase,
} from '../../utilities/StringFormat';

interface Props {
  linkGroupLinks: { _id: string; name: string; section: string }[];
  sectionName: string;
}

export default function LinksList(props: Props) {
  const { linkGroupLinks, sectionName } = props;

  const mappedLinks = linkGroupLinks.map((link) => {
    const formattedPath = `/shop/${formatToKebabCase(
      sectionName,
    )}/${formatToKebabCase(link.name)}`;

    return (
      <li key={link.name}>
        <Link href={formattedPath}>
          <a>{formatTitle(link.name)}</a>
        </Link>
      </li>
    );
  });

  return (
    <figure className={styles.listFigure}>
      <figcaption>{formatTitle(sectionName)}</figcaption>
      <ul>{mappedLinks}</ul>
    </figure>
  );
}
