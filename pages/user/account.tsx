import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Account.module.scss";
import { selectUser } from "../../redux/slices/userSlice";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import ActionDialog from "../../components/ActionDialog/ActionDialog";
import FormChangePassword from "../../components/FormChangePassword/FormChangePassword";

const Account: NextPage = () => {
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showDeactive, setShowDeactive] = useState(false);
  const user = useAppSelector(selectUser);

  const toggleDeactiveConfirmation = () => {
    setShowDeactive(!showDeactive);
  };

  const deactiveAccount = () => {
    console.log("Placeholder to inactive account. :D");
    toggleDeactiveConfirmation();
  };

  const deactivateDialogContent = (
    <ActionDialog
      confirmAction={deactiveAccount}
      dialogTitle="Deactive Account?"
      toggleModal={toggleDeactiveConfirmation}
    >
      <p>Are you sure you would like to deactivate your account?</p>
    </ActionDialog>
  );

  const toggleChangePasswordForm = () => {
    setShowChangePasswordForm(!showChangePasswordForm);
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Welcome, {user.user.username}</h1>
        <button onClick={toggleChangePasswordForm}>Change Password</button>
        {showChangePasswordForm ? <FormChangePassword postSubmitAction={toggleChangePasswordForm}/> : null}
        <button onClick={toggleDeactiveConfirmation}>
          Deactive My Account
        </button>
      </main>
      {showDeactive ? deactivateDialogContent : null}
    </>
  );
};

export default Account;
