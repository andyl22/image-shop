const formatToCamelCase = (string: string): string => {
  return string
    .split("-")
    .map((item: string, index: number) => {
      return index === 0
        ? item
        : item.replace(item.charAt(0), item.charAt(0).toUpperCase());
    })
    .join("");
};

const formatToKebabCase = (string: string): string => {
  return string
    .replace(/ /g, "")
    .split(/(?=[A-Z])/g)
    .join("-")
    .toLowerCase();
};

const formatTitle = (string: string): string => {
  return string
    .split(/(?=[A-Z])/g)
    .map(item => item[0].toUpperCase() + item.slice(1, item.length))
    .join(" ")
}

export { formatToCamelCase, formatToKebabCase, formatTitle }