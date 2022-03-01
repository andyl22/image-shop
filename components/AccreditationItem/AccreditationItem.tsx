import Image from "next/image";

interface Props {
  imgURL?: string;
  itemSource: string;
  itemDescription: string;
}

export default function AccreddidationItem(props: Props) {
  const { imgURL, itemSource, itemDescription } = props;

  return (
    <li>
      <a href="https://www.flaticon.com/free-icons/mountain">
        {imgURL ? (
          <Image
            src={imgURL}
            alt={itemDescription}
            height={32}
            width={32}
            className="listImage"
          />
        ) : null}
        &ensp; {itemDescription} {itemSource}
      </a>
    </li>
  );
}
