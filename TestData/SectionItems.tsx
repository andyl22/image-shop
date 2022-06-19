import data from './SectionItems.json';
import {
  formatToCamelCase,
  formatToKebabCase,
} from '../utilities/StringFormat';

interface StaticPaths {
  params: {
    shopSection: string;
    subSection: string;
    id?: string;
  };
}

interface StaticProps {
  shopSection: string;
  subSection: string;
}

export function getAllSections() {
  const staticPaths: StaticPaths[] = [];
  Object.keys(data).forEach((subsection) => {
    Object.keys(data[subsection as keyof typeof data]).forEach(
      (item) => {
        staticPaths.push({
          params: {
            shopSection: formatToKebabCase(subsection),
            subSection: formatToKebabCase(item),
          },
        });
      },
    );
  });
  return staticPaths;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  visits: number;
  createDttm: number;
  updateDttm: number;
  sourceLink: string;
  sourceName: string;
}

export function setSectionItems(props: StaticProps) {
  const { shopSection, subsection } = props;
  const formattedShopSection = formatToCamelCase(shopSection);
  const formattedSubScetion = formatToCamelCase(subsection);
  const subSectionContent =
    data[formattedShopSection as keyof typeof data];

  return {
    subSectionName: formattedSubScetion,
    subSectionContent:
      subSectionContent[
        formattedSubScetion as keyof typeof subSectionContent
      ],
  };
}

export function getAllItemPaths() {
  const staticPaths: StaticPaths[] = [];
  Object.keys(data).forEach((subsection) => {
    Object.keys(data[subsection as keyof typeof data]).forEach(
      (item) => {
        /* @ts-ignore */
        data[subsection][item].forEach((subItem) => {
          staticPaths.push({
            params: {
              shopSection: formatToKebabCase(subsection),
              subSection: formatToKebabCase(item),
              id: subItem.id.toString(),
            },
          });
        });
      },
    );
  });
  return staticPaths;
}

export default data;
