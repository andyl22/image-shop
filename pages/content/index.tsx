import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import AppGrid from '../../components/AppGrid/AppGrid';
import FormAdd from '../../components/AppGrid/FormAdd';
import Modal from '../../components/Modal/Modal';
import styles from '../../styles/ManageContent.module.scss';

const SectionContent: NextPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  return (
    <>
      <Head>
        <title>Manage Content</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Manage Content</h1>
        <p>Create, update, and delete items on the shop.</p>
        <div className={styles.gridWrapper}>
          <AppGrid />
          <button onClick={toggleAddModal}>Add Record</button>
        </div>
      </main>
      {showAddModal ? (
        <Modal toggleModal={toggleAddModal}>
          <FormAdd />
        </Modal>
      ) : null}
    </>
  );
};

export default SectionContent;
