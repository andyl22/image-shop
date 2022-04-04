import type { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header/Header";
import styles from "../../styles/Account.module.scss";
import { selectUser } from "../../redux/slices/userSlice";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import ActionDialog from "../../components/ActionDialog/ActionDialog";
import CloseIcon from '@mui/icons-material/Close';

const Account: NextPage = () => {
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showDeactiveConfirmation, setShowDeactiveConfirmation] = useState(false);
  const user = useAppSelector(selectUser);

  const toggleDeactiveConfirmation = () => {
    setShowDeactiveConfirmation(!showDeactiveConfirmation)
  }

  const deactiveAccount = () => {
    console.log("Placeholder to inactive account. :D")
  }

  const deactivateDialogContent = (
    <ActionDialog confirmAction={deactiveAccount} dialogTitle="Deactive Account?" toggleModal={toggleDeactiveConfirmation}>
      <p>Are you sure you would like to deactivate your account?</p>
    </ActionDialog>
  )

  const toggleChangePasswordForm = () => {
    setShowChangePasswordForm(!showChangePasswordForm);
  }

  const changePassword = () => {
    console.log("Placeholder to change password.")
  }

  const changePasswordFormDialog = (
    <form className={styles.changePasswordForm}>
      <input type="password" placeholder="New Password" />
      <input type="password" placeholder="Confirm Password" />
      <input type="password" placeholder="Current Password" />
      <input type="submit" value="Change Password" />
    </form>
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
        <button onClick={toggleChangePasswordForm} className={showChangePasswordForm ? styles.activeSelection : ""}>
          Change Password
          { showChangePasswordForm ? <CloseIcon fontSize="small" className={styles.closeButton}/> : null}
        </button>
        {showChangePasswordForm ? changePasswordFormDialog : null}
        <button onClick={toggleDeactiveConfirmation}>
          Deactive My Account
        </button>
      </main>
      {showDeactiveConfirmation ? deactivateDialogContent : null}
    </>
  );
};

export default Account;
