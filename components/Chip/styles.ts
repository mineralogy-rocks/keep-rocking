export type CardStyles = {
  textColor: string;
  backgroundColor: string;
}
export const getStyles= (type = "default"): CardStyles => {
  const _colors = {
    default: {
      textColor: 'text-gray-800',
      backgroundColor: 'bg-sky-400/70',
    },
    primary: {},
    secondary: {},
    approved: {
      textColor: 'text-green-800',
      backgroundColor: 'bg-green-300/30'
    },
    pending: {
      textColor: 'text-gray-800',
      backgroundColor: 'bg-gray-300/70'
    },
    discredited: {
      textColor: 'text-red-800',
      backgroundColor: 'bg-rose-200/70'
    },
    questionable: {
      textColor: 'text-blue-600',
      backgroundColor: 'bg-cyan-300/30'
    },
    grandfathered: {
      textColor: 'text-green-800',
      backgroundColor: 'bg-green-600/30'
    },
  };
  return _colors[type];
};
