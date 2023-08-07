export type Styles = {
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
}
export const getStyles= (type = "default"): Styles => {
  const colors = {
    default: {
      textColor: 'text-gray-800',
      backgroundColor: 'bg-indigo-200 focus:bg-red-300',
      borderColor: 'border border-indigo-200 hover:border-indigo-300'
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
    na: {
      textColor: 'text-gray-600',
      backgroundColor: 'bg-gray-100',
      borderColor: 'border border-gray-200 hover:border-gray-300'
    }
  };
  return colors[type];
};
