import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Router from 'next/router';
import styles from '../../styles/Account.module.scss';
import { logout, selectUser } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ActionDialog from '../../components/ActionDialog/ActionDialog';
import FormChangePassword from '../../components/FormChangePassword/FormChangePassword';
import { postHTTP } from '../../utilities/fetchAPIs';

const Account: NextPage = () => {
  const [showChangePasswordForm, setShowChangePasswordForm] =
    useState(false);
  const [showDeactive, setShowDeactive] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const userLogout = () => {
    dispatch(logout());
    Router.push('/');
  };

  const toggleDeactiveConfirmation = () => {
    setShowDeactive(!showDeactive);
  };

  const deactiveAccount = async () => {
    const deleteResponse = await postHTTP('/user/deleteAccount', {
      username: user.username,
    }).catch((err) => console.log(err));
    if (deleteResponse.success) {
      userLogout();
    } else {
      console.log(deleteResponse.data);
    }
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
        <title>My Account</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Welcome, {user.username}</h1>
        <button onClick={toggleChangePasswordForm}>
          Change Password
        </button>
        {showChangePasswordForm ? (
          <FormChangePassword
            username={user.username}
            postSubmitAction={toggleChangePasswordForm}
          />
        ) : null}
        <button onClick={toggleDeactiveConfirmation}>
          Deactive My Account
        </button>
      </main>
      {showDeactive ? deactivateDialogContent : null}
    </>
  );
};

export default Account;
