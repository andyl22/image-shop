import Image from "next/image";

interface Props {
  imgURL?: string;
  itemSource: string;
  itemDescription: string;
  sourceLink: string;
}

export default function AccreddidationItem(props: Props) {
  const { imgURL, itemSource, itemDescription, sourceLink } = props;

  return (
    <li>
      <a href={sourceLink}>
        {imgURL ? (
          <Image
            src={imgURL}
            alt={itemDescription}
            height={32}
            width={32}
            className="listImage"
            quality="1"
            priority
          />
        ) : null}
        &ensp; {itemDescription} ==== {itemSource}
      </a>
    </li>
  );
}
