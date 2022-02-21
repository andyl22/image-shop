import data from "./Sections.json"

export function getAllHeaderLinkParams() {
  return Object.keys(data).map(key => {
    return {
      params: {
        shopSection: key.split(/(?=[A-Z])/g).join("-").toLowerCase()
      }
    }
  })
}


export function getShopSectionData(shopSection) {
  const formattedKey = shopSection.shopSection.split("-").map((item: string, index: number) => {
    if(index === 0 ) {
      return item;
    } else {
      return item.replace(item.charAt(0), item.charAt(0).toUpperCase());
    }
  }).join("");
  const sectionData = data[formattedKey];
  return {
    sectionName: formattedKey,
    itemList: [...sectionData]
}
}