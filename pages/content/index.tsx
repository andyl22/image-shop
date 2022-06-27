import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import styles from '../../styles/ManageContent.module.scss';

const Content: NextPage = () => (
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
        <button>Add Record</button>
        <Grid
          data={[
            ['John', 'john@example.com'],
            ['Mike', 'mike@gmail.com'],
          ]}
          columns={[
            {
              name: 'Section Name',
            },
            {
              name: 'Edit',
              formatter: (cell, row) =>
                h(
                  'button',
                  {
                    className:
                      'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                    onClick: () =>
                      console.log(`Editing "${row.cells[0].data}"`),
                  },
                  'Edit',
                ),
            },
          ]}
          search
          pagination={{ enabled: true, limit: 100 }}
          className={{
            header: styles.header,
            td: styles.td,
            th: styles.th,
            table: styles.table,
            footer: styles.footer,
          }}
        />
      </div>
    </main>
  </>
);

export default Content;
