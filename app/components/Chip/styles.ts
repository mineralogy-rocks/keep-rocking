export type Styles = {
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
}
export const getStyles= (type = "default"): Styles => {
  const colors = {
    default: {
      textColor: 'text-slate-800',
      backgroundColor: 'bg-indigo-200 dark:bg-indigo-300 focus:bg-red-300',
      borderColor: 'border border-indigo-200 dark:border-indigo-300 hover:border-indigo-300 dark:hover:border-indigo-200'
    },
    primary: {},
    secondary: {},
    approved: {
      textColor: 'text-green-800',
      backgroundColor: 'bg-green-300/30'
    },
    'pending publication': {
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
      textColor: 'text-font-primary dark:text-slate-800',
      backgroundColor: 'bg-slate-100 dark:bg-slate-400',
      borderColor: 'border border-slate-200 dark:border-slate-300 hover:border-slate-300 dark:hover:border-slate-400'
    },
    black: {
      textColor: 'text-orange-50',
      backgroundColor: 'bg-black',
      borderColor: ''
    },
  };
  return colors[type] || colors.default;
};
