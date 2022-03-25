import Link from "next/link";
import { useEffect, useState } from "react";
import CartButton from "../CartButton/CartButton";
import styles from "./RightHeader.module.scss";
import { selectUser } from "../../redux/slices/userSlice";
import { useAppSelector } from "../../redux/hooks";
import UserDropdown from "../UserDropdown/UserDropdown";

export default function RightHeader() {
  const [username] = useState(useAppSelector(selectUser).user.username);

  const loginContent = username ? (
    <UserDropdown>
      <button className={styles.userMenu}>{username}</button>
    </UserDropdown>
  ) : (
    <nav className={styles.headerLinkContainer}>
      <Link href="/user/login">
        <a>Sign In</a>
      </Link>
    </nav>
  );

  return (
    <div className={styles.rightHeader}>
      <CartButton />
      {loginContent}
    </div>
  );
}
