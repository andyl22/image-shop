import { ChangeEvent, useState } from 'react';
import { postHTTP } from '../../utilities/fetchAPIs';
import FormContainer from '../Form/FormContainer';
import styles from './FormEdit.module.scss';

export interface Section {
  _id: string;
  name: string;
}

export interface Subsection {
  _id: string;
  name: string;
}

export interface Item {
  _id: string;
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
  console.log(formSection);

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

  const handleSubmit = () => {
    if (formSection !== section) {
      postHTTP('/contentManagement/updateSection', {
        id: formSection._id,
        updateBody: { name: formSection.name },
      })
        .then((res) => console.log('Success', res))
        .catch((err) => console.log(err));
    }
    if (formSubsection !== subsection) {
      postHTTP('/contentManagement/updateSubsection', {
        id: formSubsection._id,
        updateBody: { name: formSubsection.name },
      })
        .then((res) => console.log('Success', res))
        .catch((err) => console.log(err));
    }
    if (formItem !== item) {
      postHTTP('/contentManagement/updateSectionItem', {
        id: formItem._id,
        updateBody: {
          name: formItem.name,
          description: formItem.description,
          price: formItem.price,
          image: formItem.image,
          sourceLink: formItem.sourceLink,
        },
      })
        .then((res) => console.log('Success', res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <FormContainer
      title="Change Password"
      handleSubmit={handleSubmit}
    >
      <div className={styles.editContentForm}>
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
