export const camelize = (str: string): string => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toUpperCase() : word.toLowerCase();
  }).replace(/\s+/g, '').replace(/_/g, ' ');
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getRange = (min: number|string, max: number|string): string|null => {
  if (!min || !max) return null;
  const minStr = String(min);
  const maxStr = String(max);

  if (minStr === "0" && minStr === maxStr) return null;
  return minStr === maxStr ? minStr : `${minStr}—${maxStr}`;
};

export const concatStrings = (values: string[], sep: string=" "): string => {
  return values.filter((v) => v).join(sep);
};

export const compareColors = [
	{
		base: '#2563eb',
	},
	{
		base: '#be185d',
	},
	{
		base: '#fb7185',
	},
	{
		base: '#ea580c',
	},
  {
		base: '#22c55e',
	}
];
