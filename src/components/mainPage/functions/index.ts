export const formatNumbers = (string: string) => {
  const number = parseFloat(string);
  if (number >= 1000) {
    if (number < 10000) {
      return `${number / 1000}k`;
    } else if (number < 1000000) {
      return `${(number / 1000).toFixed(0)}k`;
    } else if (number < 1000000000) {
      return `${number / 1000000}m`;
    } else {
      return `${number / 1000000000}g`;
    }
  } else {
    return string;
  }
};