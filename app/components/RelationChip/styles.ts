export type Styles = {
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
};

export const getStyles= (type = "default"): Styles => {

  let defaultStyles = {
    textColor: 'text-gray-800',
    backgroundColor: 'bg-red-50/60',
    borderColor: 'border border-gray-200 hover:border-gray-300'
  };

  const colors = {
    default: defaultStyles,
    highlighted: {
      ...defaultStyles,
      borderColor: 'border border-gray-400'
    }
  };
  return colors[type];
};
