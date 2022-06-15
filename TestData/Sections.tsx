import data from './Sections.json';
import { formatTitle } from '../utilities/StringFormat';

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

export function getShopSectionNames() {
  return Object.keys(data).map((item) => formatTitle(item));
}
