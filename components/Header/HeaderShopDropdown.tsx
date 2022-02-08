import styles from "./HeaderShopDropdown.module.scss";
import Dropdown from "../Dropdown/Dropdown";

interface Props {
  children: React.ReactNode;
}

export default function HeaderShopDropdown(props: Props) {
  const { children } = props;
  const dropdownContent = <p>Cookies</p>;

  return (
    <Dropdown expandDirection={true} dropdownContent={dropdownContent} height= "fit-content" width="fit-content">
      {children}
    </Dropdown>
  );
}
