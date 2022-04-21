import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import CartButton from "../CartButton/CartButton";
import styles from "./RightHeader.module.scss";
import { logout } from "../../redux/slices/userSlice";
import { selectUser } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import UserDropdown from "./UserDropdown";
import Router from "next/router";

export default function RightHeader() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState(user.username);
  const [loginContent, setLoginContent] = useState<ReactElement>();

  useEffect(() => {
    const userLogout = () => {
      dispatch(logout());
      setUsername(null);
      Router.push("/");
    };

    setLoginContent(
      username ? (
        <UserDropdown logout={userLogout}>
          <button className={styles.userMenu}>{username}</button>
        </UserDropdown>
      ) : (
        <Link href="/user/login">
          <a>Sign In</a>
        </Link>
      )
    );
  }, [dispatch, username]);

  useEffect(() => {
    setUsername(user.username);
  }, [user]);

  return (
    <div className={styles.rightHeader}>
      <div className={styles.cartButtonContainer}>
        <CartButton />
      </div>
      {loginContent}
    </div>
  );
}
