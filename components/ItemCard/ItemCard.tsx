import styles from "./ItemCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import OverflowToolTip from "../Tooltip/OverflowTooltip";

interface Props {
  name: string;
  description?: string;
  imageURL: string;
  link: string;
  children?: React.ReactNode | Array<React.ReactNode>;
}

export default function ItemCard(props: Props) {
  const { name, description, imageURL, link, children } = props;
  const router = useRouter();
  const pathName = router.asPath === "/" ? "" : router.asPath;

  return (
    <div className={styles.itemCardContainer}>
      <Link href={`${pathName}/${link}`}>
        <a>
          <div className={styles.anchorContent}>
            <OverflowToolTip tooltipContent={name}>
              <h2>{name}</h2>
            </OverflowToolTip>
            <div className={styles.imageWrapper}>
              <Image
                src={imageURL}
                alt={name}
                height="100%"
                width="100%"
                layout="responsive"
                placeholder="blur"
                blurDataURL={imageURL}
                quality="25"
              />
            </div>
            <p>{description}</p>
          </div>
          {children}
        </a>
      </Link>
    </div>
  );
}
