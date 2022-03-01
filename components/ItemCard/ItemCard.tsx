import styles from "./ItemCard.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  imageURL: string;
  link: string;
}

export default function ItemCard(props: Props) {
  const { name, imageURL, link } = props;
  return (
    <div className={styles.itemCardContainer}>
      <Link href={link}>
        <a>
          <h2>{name}</h2>
          <Image src={imageURL} alt={name} height="100%" width="100%" layout="responsive" placeholder="blur" blurDataURL={imageURL}/>
        </a>
      </Link>
    </div>
  )
}