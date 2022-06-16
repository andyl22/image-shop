import data from './Sections.json';
import { formatTitle } from '../utilities/StringFormat';
import { getHTTP } from '../utilities/fetchAPIs';

export function getAllHeaderLinkParams() {
  return Object.keys(data).map((key) => ({
    params: {
      shopSection: key
        .split(/(?=[A-Z])/g)
        .join('-')
        .toLowerCase(),
    },
  }));
}

interface ShopSection {
  shopSection: string;
}

export function getShopSectionData(shopSection: ShopSection) {
  const formattedKey = shopSection.shopSection
    .split('-')
    .map((item: string, index: number) => {
      if (index === 0) {
        return item;
      }
      return item.replace(
        item.charAt(0),
        item.charAt(0).toUpperCase(),
      );
    })
    .join('');
  const sectionData = data[formattedKey as keyof typeof data];
  return {
    sectionName: formattedKey,
    itemList: [...sectionData],
  };
}

const getShopSectionNames = async () =>
  fetch(`${process.env.API_URI}/api/items/getAllSections`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err));

export { getShopSectionNames };
