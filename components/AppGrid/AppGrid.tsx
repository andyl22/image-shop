import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import { ReactElement, useEffect, useState } from 'react';
import 'gridjs/dist/theme/mermaid.css';
import styles from './AppGrid.module.scss';
import { getHTTP } from '../../utilities/fetchAPIs';
import { formatTitle } from '../../utilities/StringFormat';

export default function AppGrid() {
  const [grid, setGrid] = useState<ReactElement>(<div />);
  useEffect(() => {
    const fetchAndSetGrid = async () => {
      const data = await getHTTP('/items/getAllSubsectionsPopulated')
        .then((res) => res.data)
        .then((res) =>
          res.map(
            (item: {
              _id: string;
              name: string;
              section: { _id: string; name: string };
            }) => [
              item.section ? formatTitle(item.section.name) : '',
              formatTitle(item.name),
            ],
          ),
        )
        .catch((err) => console.log(err));
      setGrid(
        <Grid
          data={data}
          columns={[
            {
              name: 'Section',
              sort: {
                enabled: true,
              },
            },
            {
              name: 'Subsection',
              sort: {
                enabled: true,
              },
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
          pagination={{ enabled: true, limit: 10 }}
          className={{
            header: styles.header,
            td: styles.td,
            th: styles.th,
            table: styles.table,
            footer: styles.footer,
          }}
        />,
      );
    };
    fetchAndSetGrid();
  }, []);

  return grid;
}
