export const normalizeQuery = (query: string) => {
  return query
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, ' '); // Convert multiple spaces to a single space
};

export const convertToInternationalCurrencySystem = (value: number) => {
  const formatValue = (num: number, divisor: number, unit: string) => {
    let formatted = (num / divisor).toFixed(1);
    if (formatted.endsWith('.0')) {
      formatted = (num / divisor).toFixed(0);
    }
    return formatted + unit;
  };

  // Billions
  if (Math.abs(value) >= 1.0e9) {
    return formatValue(Math.abs(value), 1.0e9, 'B');
  }
  // Millions
  if (Math.abs(value) >= 1.0e6) {
    return formatValue(Math.abs(value), 1.0e6, 'M');
  }
  // Thousands
  if (Math.abs(value) >= 1.0e3) {
    return formatValue(Math.abs(value), 1.0e3, 'K');
  }

  return Math.abs(value).toString();
};
