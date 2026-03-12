import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import AppGrid from '../../components/AppGrid/AppGrid';
import FormAdd from '../../components/AppGrid/FormAddItem';
import FormAddSection from '../../components/AppGrid/FormAddSection';
import Modal from '../../components/Modal/Modal';
import styles from '../../styles/ManageContent.module.scss';

const SectionContent: NextPage = () => {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);

  const toggleAddModal = () => {
    setShowAddItemModal(!showAddItemModal);
  };

  const toggleAddSectionModal = () => {
    setShowAddSectionModal(!showAddSectionModal);
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
          <button onClick={toggleAddModal}>Add Item</button>
          <button onClick={toggleAddSectionModal}>Add Section</button>
        </div>
      </main>
      {showAddItemModal ? (
        <Modal toggleModal={toggleAddModal}>
          <FormAdd toggleForm={toggleAddModal} />
        </Modal>
      ) : null}
      {showAddSectionModal ? (
        <Modal toggleModal={toggleAddSectionModal}>
          <FormAddSection toggleForm={toggleAddSectionModal} />
        </Modal>
      ) : null}
    </>
  );
};

export default SectionContent;
