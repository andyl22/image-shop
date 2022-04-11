import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import CartButton from "../CartButton/CartButton";
import styles from "./RightHeader.module.scss";
import { logout } from "../../redux/slices/userSlice";
import { selectUser } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import UserDropdown from "../UserDropdown/UserDropdown";
import Router from "next/router";

export default function RightHeader() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState(user.user.username);
  const [loginContent, setLoginContent] = useState<ReactElement | null>(null);

  useEffect(() => {
    const test = () => {
      dispatch(logout());
      setUsername(null);
      Router.push("/");
    };

    const loginContent = username ? (
      <UserDropdown logout={test}>
        <button className={styles.userMenu}>{username}</button>
      </UserDropdown>
    ) : (
      <div className={styles.headerLinkContainer}>
        <Link href="/user/login">
          <a>Sign In</a>
        </Link>
      </div>
    );
    setLoginContent(loginContent);
  }, [dispatch, username]);

  return (
    <div className={styles.rightHeader}>
      <div className={styles.cartButtonContainer}>
        <CartButton />
      </div>
      {loginContent}
    </div>
  );
}
