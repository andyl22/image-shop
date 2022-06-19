import { postNode } from '../utilities/fetchAPIs';
import { formatDash } from '../utilities/StringFormat';

interface Item {
  name: string;
  description: string;
  price: number;
  image: string;
  visits: number;
  createDttm: Date;
  updateDttm: Date;
  sourceLink: string;
  sourceName: string;
  subsection: string;
}

interface Subsection {
  name: string;
  _id: string;
  section: string;
}

const getShopSectionNames = async () =>
  postNode(`/items/getAllSections`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getSubsectionNames = async (id: string) =>
  postNode('/items/getSubsectionsBySectionID', { section: id })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getAllSubsections = () =>
  postNode('/items/getAllSubsections')
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getAllItems = () =>
  postNode('/items/getAllItems')
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getAllSubsectionPaths = async () => {
  const sections = await getShopSectionNames();
  const subsections = await getAllSubsections();
  const paths = [];
  for (let i = 0; i < sections.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const subsectionNames = subsections.filter(
      (subsection: Subsection) =>
        subsection.section === sections[i]._id,
    );
    for (let j = 0; j < subsectionNames.length; j += 1) {
      paths.push({
        params: {
          shopSection: formatDash(sections[i].name),
          subSection: subsectionNames[j].name,
        },
      });
    }
  }
  return paths;
};

const getAllItemPathTest = async () => {
  const sections = await getShopSectionNames();
  const subsections = await getAllSubsections();
  const allItems = await getAllItems();
  const paths = [];
  for (let i = 0; i < sections.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const subsectionNames = subsections.filter(
      (subsection: Subsection) =>
        subsection.section === sections[i]._id,
    );
    for (let j = 0; j < subsectionNames.length; j += 1) {
      const itemsList = allItems.filter(
        (item: Item) => item.subsection === subsectionNames[j]._id,
      );
      for (let k = 0; k < itemsList.length; k += 1) {
        paths.push({
          params: {
            shopSection: formatDash(sections[i].name),
            subSection: subsectionNames[j].name,
            id: itemsList[k]._id,
          },
        });
      }
    }
  }
  return paths;
};

export {
  getShopSectionNames,
  getSubsectionNames,
  getAllSubsectionPaths,
  getAllItemPathTest,
};
