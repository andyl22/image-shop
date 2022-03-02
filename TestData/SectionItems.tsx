import data from "./SectionItems.json";

interface StaticPaths {
  params: {
    shopSection: string,
    subSection: string
  }
}

interface StaticProps {
  shopSection: string,
  subSection: string
}

export function getAllSections() {
  const staticPaths: StaticPaths[] = []
  Object.keys(data).forEach(subsection => {
    Object.keys(data[subsection as keyof typeof data]).forEach(item => {
      staticPaths.push({
        params: {
          shopSection: formatToKebabCase(subsection),
          subSection: formatToKebabCase(item)
        }
      })
    })
  })
  return staticPaths;
}


export function setSectionItems(props: StaticProps) {
  const { shopSection, subSection } = props;
  const formattedShopSection = formatToCamelCase(shopSection);
  const formattedSubScetion = formatToCamelCase(subSection)
  const subSectionContent = data[formattedShopSection as keyof typeof data]

  return {
    subSectionName: formattedSubScetion,
    subSectionContent: subSectionContent[formattedSubScetion as keyof typeof subSectionContent]
  }
}

const formatToCamelCase = (string: string): string => {
  return string.split("-").map((item: string, index: number) => {
    return (index === 0) ? item : item.replace(item.charAt(0), item.charAt(0).toUpperCase());
  }).join("")
}

const formatToKebabCase = (string: string): string => {
  return string.split(/(?=[A-Z])/g).join("-").toLowerCase()
}

