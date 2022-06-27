import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import { ReactElement, useEffect, useState } from 'react';
import styles from '../../styles/ManageContent.module.scss';
import { getHTTP } from '../../utilities/fetchAPIs';
import { formatTitle } from '../../utilities/StringFormat';

const Content: NextPage = () => {
  const [grid, setGrid] = useState<ReactElement | undefined>();
  useEffect(() => {
    const fetchAndSetGrid = async () => {
      const data = await getHTTP('/items/getAllSections')
        .then((res) => res.data)
        .then((res) =>
          res.map((item: { _id: string; name: string }) => [
            formatTitle(item.name),
          ]),
        )
        .catch((err) => console.log(err));
      console.log(data);
      setGrid(
        <div className={styles.gridWrapper}>
          <button>Add Record</button>
          <Grid
            data={data}
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
        </div>,
      );
    };
    fetchAndSetGrid();
  }, []);
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
        {grid}
      </main>
    </>
  );
};

export default Content;
