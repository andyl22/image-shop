import Section from '../models/Section';
import Subsection from '../models/Subsection';
import Item from '../models/Item';
import { postNode } from '../utilities/fetchAPIs';
import dbConnect from '../utilities/mongo';
import { formatDash } from '../utilities/StringFormat';

interface ItemType {
  _id: string;
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

interface SubsectionType {
  name: string;
  _id: string;
  section: string;
}

const getSubsectionsByID = (id: string) => Section.find({ _id: id });

const getSectionByName = (name: string) => Section.findOne({ name });

const getShopSectionNames = async () => Section.find({}, { name: 1 });

const getSubsectionNames = async (id: string) =>
  postNode('/items/getSubsectionsBySectionID', { section: id })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getAllItems = async () => Item.find().lean();

const getItemsBySubsection = async (subsectionName: string) => {
  const subsection = await Subsection.find({
    name: subsectionName,
  });
  if (subsection) {
    return Item.find({ subsection }).lean();
  }
  return null;
};

const getAllSubsectionPaths = async () => {
  await dbConnect();
  const sections = await Section.find();
  const subsections = await Subsection.find();
  const paths = [];
  for (let i = 0; i < sections.length; i += 1) {
    const subsectionNames = subsections.filter(
      (subsection: SubsectionType) =>
        JSON.stringify(subsection.section) ===
        JSON.stringify(sections[i]._id),
    );
    for (let j = 0; j < subsectionNames.length; j += 1) {
      paths.push({
        params: {
          shopSection: formatDash(sections[i].name),
          subsection: formatDash(subsectionNames[j].name),
        },
      });
    }
  }
  return paths;
};

const getAllItemPaths = async () => {
  await dbConnect();
  const sections = await Section.find();
  const subsections = await Subsection.find();
  const allItems = await Item.find();
  const paths = [];
  for (let i = 0; i < sections.length; i += 1) {
    const subsectionNames = subsections.filter(
      (subsection: SubsectionType) =>
        JSON.stringify(subsection.section) ===
        JSON.stringify(sections[i]._id),
    );
    for (let j = 0; j < subsectionNames.length; j += 1) {
      const itemsList = allItems.filter(
        (item: ItemType) =>
          JSON.stringify(item.subsection) ===
          JSON.stringify(subsectionNames[j]._id),
      );
      for (let k = 0; k < itemsList.length; k += 1) {
        paths.push({
          params: {
            shopSection: formatDash(sections[i].name),
            subsection: formatDash(subsectionNames[j].name),
            id: JSON.parse(JSON.stringify(itemsList[k]._id)),
          },
        });
      }
    }
  }
  return paths;
};

const getSectionItems = async (subsectionName: string) => {
  const items = JSON.stringify(
    await getItemsBySubsection(subsectionName),
  );
  return items;
};

export {
  getShopSectionNames,
  getSubsectionNames,
  getAllSubsectionPaths,
  getAllItemPaths,
  getSectionItems,
  getAllItems,
  getSectionByName,
  getSubsectionsByID,
};

export type { ItemType };
