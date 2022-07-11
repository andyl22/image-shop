import { ChangeEvent, FormEvent, useState } from 'react';
import FormContainer from '../Form/FormContainer';
import styles from './FormEdit.module.scss';

export interface Section {
  id: string;
  name: string;
}

export interface Subsection {
  id: string;
  name: string;
}

export interface Item {
  name: string;
  description: string;
  price: string;
  image: string;
  sourceLink: string;
}

interface Props {
  section: Section;
  subsection: Subsection;
  item: Item;
}

export default function FormChangePassword(props: Props) {
  const { section, subsection, item } = props;
  const [formSection, setFormSection] = useState(section);
  const [formSubsection, setFormSubsection] = useState(subsection);
  const [formItem, setFormItem] = useState(item);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent) => {
    const { value, id } = e.target as HTMLInputElement;
    const splitID = id.split(/(?=[A-Z])/g);
    const targetSection = splitID[0];
    const property =
      splitID[1].charAt(0).toLowerCase() + splitID[1].slice(1);
    console.log(property, value, targetSection);
    switch (targetSection) {
      case 'section':
        setFormSection({ ...formSection, [property]: value });
        break;
      case 'subsection':
        setFormSubsection({ ...formSubsection, [property]: value });
        break;
      case 'item':
        setFormItem({ ...formItem, [property]: value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formSection === section);
    console.log(formSubsection === subsection);
    console.log(formItem === item);
  };

  return (
    <FormContainer
      title="Change Password"
      handleSubmit={handleSubmit}
    >
      <div className={styles.editContentForm}>
        {error ? <p className={styles.error}>{error}</p> : null}
        <h2>Section</h2>
        <input
          type="text"
          id="sectionName"
          placeholder="Section Name"
          value={formSection.name}
          onChange={handleChange}
        />
        <h2>Subsection</h2>
        <input
          type="text"
          id="subsectionName"
          placeholder="Subsection Name"
          value={formSubsection.name}
          onChange={handleChange}
        />
        <h2>Item</h2>
        <input
          type="text"
          id="itemName"
          placeholder="Item Name"
          value={formItem.name}
          onChange={handleChange}
        />
        <input
          type="text"
          id="itemDescription"
          placeholder="Description"
          value={formItem.description}
          onChange={handleChange}
        />
        <input
          type="text"
          id="itemPrice"
          placeholder="Price"
          value={formItem.price}
          onChange={handleChange}
        />
        <input
          type="text"
          id="itemImage"
          placeholder="Image"
          value={formItem.image}
          onChange={handleChange}
        />
        <input
          type="text"
          id="itemSourceLink"
          placeholder="Image Source"
          value={formItem.sourceLink}
          onChange={handleChange}
        />
        <input type="submit" value="Save Changes" />
      </div>
    </FormContainer>
  );
}
