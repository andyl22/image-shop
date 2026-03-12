import { ChangeEvent, useState, useEffect, FormEvent } from 'react';
import { postHTTP } from '../../utilities/fetchAPIs';
import FormContainer from '../Form/FormContainer';
import styles from './FormAdd.module.scss';

export interface Section {
  _id: any;
  name: string;
}

export interface Subsection {
  _id: any;
  name: string;
}

export default function FormAdd(props: any) {
  const { toggleForm } = props;
  const [error, setError] = useState<string | null>(null);
  const [formItem, setFormItem] = useState({
    sectionName: '',
    subsectionName: ''
  });

  const handleChange = (e: ChangeEvent) => {
    const { value, id } = e.target as HTMLInputElement;
    console.log(value)
    setFormItem({ ...formItem, [id]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    postHTTP('/contentManagement/createSection', {
      sectionName: formItem.sectionName,
      descrisubsectionNameption: formItem.subsectionName
    })
      .then((res) => {
        if (res.errors) {
          setError(res.message);
        } else {
          toggleForm();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <FormContainer title="Add Item" handleSubmit={handleSubmit}>
      <div className={styles.addContentForm}>
        <h2>Add section and subsection</h2>
        <div className={styles.inputContainer}>
          <label htmlFor="sectionName">Section Name</label>
          <input
            type="text"
            id="sectionName"
            placeholder="Item Name"
            value={formItem.sectionName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="subsectionName">Subsection Name</label>
          <input
            type="text"
            id="subsectionName"
            placeholder="Description"
            value={formItem.subsectionName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <input type="submit" value="Save Changes" />
        </div>
      </div>
    </FormContainer>
  );
}
