const formatToCamelCase = (string: string): string =>
  string
    .split('-')
    .map((item: string, index: number) =>
      index === 0
        ? item
        : item.replace(item.charAt(0), item.charAt(0).toUpperCase()),
    )
    .join('');

const formatToKebabCase = (string: string): string =>
  string
    .replace(/ /g, '')
    .split(/(?=[A-Z])/g)
    .join('-')
    .toLowerCase();

const formatTitle = (string: string): string =>
  string
    .split(/(?=[A-Z])/g)
    .map((item) => item[0].toUpperCase() + item.slice(1, item.length))
    .join(' ');

const formatDash = (string: string): string =>
  string
    .split(/(?=[A-Z])/g)
    .join('-')
    .toLowerCase();

export {
  formatToCamelCase,
  formatToKebabCase,
  formatTitle,
  formatDash,
};
