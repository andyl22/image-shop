import data from "./SectionItems.json"

export function getAllSections() {
  return Object.keys(data).map(key => {
    return {
      params: {
        shopSection: "national-parks",
        subSection: key.split(/(?=[A-Z])/g).join("-").toLowerCase()
      }
    }
  })
}


export function setSectionItems({ subSection }) {
  const formattedKey = subSection.split("-").map((item: string, index: number) => {
    if (index === 0) {
      return item;
    } else {
      return item.replace(item.charAt(0), item.charAt(0).toUpperCase());
    }
  }).join("");
  return {
    subSectionName: formattedKey,
    subSectionContent: data[formattedKey]
  }
}