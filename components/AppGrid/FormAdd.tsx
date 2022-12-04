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
  const [errorMessage, setErrorMessage] = useState();
  const [sections, setSections] = useState<Section[]>([]);
  const [subsections, setSubsections] = useState<Subsection[]>([]);
  const [selectedSection, setSelectedSection] = useState<any>();
  const [formItem, setFormItem] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    sourceName: '',
    sourceLink: '',
    subsection: '',
  });

  const handleChange = (e: ChangeEvent) => {
    const { value, id } = e.target as HTMLInputElement;
    setFormItem({ ...formItem, [id]: value });
  };

  const handleSectionChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSelectedSection(
      sections.find((section) => section.name === value),
    );
  };

  const handleSubsectionChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setFormItem({
      ...formItem,
      subsection: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    postHTTP('/contentManagement/createSectionItem', {
      name: formItem.name,
      description: formItem.description,
      price: formItem.price,
      image: formItem.image,
      sourceName: formItem.sourceName,
      sourceLink: formItem.sourceLink,
      subsection: formItem.subsection,
    })
      .then((res) => {
        if (res.errors) {
          setErrorMessage(res.message);
        } else {
          toggleForm();
        }
      })
      .catch((err) => console.log(err));
  };

  const getSections = () =>
    postHTTP('/items/getAllSections')
      .then((res) => res.data)
      .catch((err) => console.log(err));

  useEffect(() => {
    const setSectionData = async () => {
      const sectionData = await getSections();
      setSections(sectionData);
      setSelectedSection(sectionData[0]);
    };
    setSectionData();
  }, []);

  const mappedSectionOptions = sections.map((section) => (
    <option
      value={section.name}
      id={section._id}
      key={section._id}
      label={section.name}
    />
  ));

  const getSubsections = (sectionId: any) =>
    postHTTP('/items/getSubsectionsBySectionID', {
      section: sectionId,
    })
      .then((res) => res)
      .catch((err) => console.log(err));

  useEffect(() => {
    if (!selectedSection) return;
    const setSubsectionData = async () => {
      const subsectionData = await getSubsections(selectedSection);
      setSubsections(subsectionData.data);
      setFormItem({
        ...formItem,
        subsection: subsectionData.data[0].name,
      });
    };
    setSubsectionData();
  }, [selectedSection]);

  const mappedSubsectionOptions = subsections.map((subsection) => (
    <option
      value={subsection.name}
      id={subsection._id}
      key={subsection._id}
      label={subsection.name}
    />
  ));

  return (
    <FormContainer title="Add Item" handleSubmit={handleSubmit}>
      <div className={styles.addContentForm}>
        <h2>Section</h2>
        <div className={styles.selectContainer}>
          <select onChange={handleSectionChange}>
            {mappedSectionOptions}
          </select>
        </div>
        <h2>Subsection</h2>
        <div className={styles.selectContainer}>
          <select onChange={handleSubsectionChange}>
            {mappedSubsectionOptions}
          </select>
        </div>
        <h2>Item</h2>
        {errorMessage ? (
          <p className={styles.error}>{errorMessage}</p>
        ) : null}
        <div className={styles.inputContainer}>
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            id="name"
            placeholder="Item Name"
            value={formItem.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={formItem.description}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            placeholder="Price"
            value={formItem.price}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="image">Image Path</label>
          <input
            type="text"
            id="image"
            placeholder="Image"
            value={formItem.image}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="sourceName">Image Source Name</label>
          <input
            type="text"
            id="sourceName"
            placeholder="Image Source Name"
            value={formItem.sourceName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="sourceLink">Image Reference</label>
          <input
            type="text"
            id="sourceLink"
            placeholder="Image Reference"
            value={formItem.sourceLink}
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
