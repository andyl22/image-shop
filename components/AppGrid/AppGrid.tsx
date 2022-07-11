import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import { useEffect, useState } from 'react';
import 'gridjs/dist/theme/mermaid.css';
import styles from './AppGrid.module.scss';
import { getHTTP } from '../../utilities/fetchAPIs';
import { formatTitle } from '../../utilities/StringFormat';
import Modal from '../Modal/Modal';
import FormEdit, { Section, Subsection, Item } from './FormEdit';

interface FormData {
  section: Section;
  subsection: Subsection;
  item: Item;
}

export default function AppGrid() {
  const [gridData, setGridData] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState<FormData | undefined>();

  const showModal = (rowData: any) => {
    setShowEditModal(!showEditModal);
    setFormData({
      section: rowData.section,
      subsection: rowData.subsection,
      item: rowData,
    });
  };

  const hideModal = () => {
    setShowEditModal(!showEditModal);
    setFormData(undefined);
  };

  useEffect(() => {
    const fetchGridData = async () => {
      setGridData(
        await getHTTP('/items/getAllItemDetails')
          .then((res) => res.data)
          .then((res) =>
            res.map(
              (item: {
                _id: string;
                name: string;
                description: string;
                price: number;
                image: string;
                section: { _id: string; name: string };
                subsection: { _id: string; name: string };
              }) => [
                item.section ? formatTitle(item.section.name) : '',
                formatTitle(item.subsection.name),
                formatTitle(item.name),
                item,
              ],
            ),
          )
          .catch((err) => console.log(err)),
      );
    };
    fetchGridData();
  }, []);

  return (
    <>
      {showEditModal && formData ? (
        <Modal toggleModal={hideModal}>
          <FormEdit
            section={formData.section}
            subsection={formData.subsection}
            item={formData.item}
          />
        </Modal>
      ) : null}
      <Grid
        data={gridData || []}
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
            name: 'Item',
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
                  onClick: () => {
                    showModal(row.cells[3].data);
                  },
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
      />
    </>
  );
}
