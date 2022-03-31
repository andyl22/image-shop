import type { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header/Header";
import styles from "../../styles/Account.module.scss";
import { selectUser } from "../../redux/slices/userSlice";
import { useAppSelector } from "../../redux/hooks";
import Link from "next/link";
import { useState } from "react";
import ActionDialog from "../../components/ActionDialog/ActionDialog";

const Account: NextPage = () => {
  const [showDeactiveConfirmation, setShowDeactiveConfirmation] = useState(false);
  const user = useAppSelector(selectUser);

  const toggleDeactiveConfirmation = () => {
    setShowDeactiveConfirmation(!showDeactiveConfirmation)
  }

  const deactiveAccount = () => {
    console.log("Placeholder to inactive account. :D")
  }

  const deactivateDialogContent = (
    <ActionDialog confirmAction = {deactiveAccount} dialogTitle="Deactive Account?" toggleModal={toggleDeactiveConfirmation}>
      <p>Are you sure you would like to deactive your account?</p>
    </ActionDialog>
  )

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>Welcome, {user.user.username}</h1>
        <Link href="/user/changePassword">
          <a>
            Change My Password
          </a>
        </Link>
        <button onClick={toggleDeactiveConfirmation}>
          Deactive My Account
        </button>
      </main>
      {showDeactiveConfirmation ? deactivateDialogContent : null}
    </>
  );
};

export default Account;
