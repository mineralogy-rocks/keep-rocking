export type Styles = {
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
}
export const getStyles= (type = "default"): Styles => {
  const colors = {
    default: {
      textColor: 'text-slate-800',
      backgroundColor: 'bg-sky-100 dark:bg-sky-800 focus:bg-red-300',
      borderColor: 'border border-sky-200 dark:border-sky-700 hover:border-sky-300 dark:hover:border-sky-500'
    },
    primary: {},
    secondary: {},
    approved: {
      textColor: 'text-green-800',
      backgroundColor: 'bg-green-300/30 dark:bg-green-200/80'
    },
    'pending publication': {
      textColor: 'text-slate-800',
      backgroundColor: 'bg-slate-300/70'
    },
    discredited: {
      textColor: 'text-red-800',
      backgroundColor: 'bg-rose-200/70 dark:bg-rose-300/80'
    },
    questionable: {
      textColor: 'text-blue-600',
      backgroundColor: 'bg-cyan-300/30 dark:bg-cyan-200/80'
    },
    grandfathered: {
      textColor: 'text-green-800',
      backgroundColor: 'bg-green-600/30 dark:bg-green-300/80'
    },
    na: {
      textColor: 'text-font-primary dark:text-slate-800',
      backgroundColor: 'bg-slate-100 dark:bg-slate-400',
      borderColor: 'border border-slate-200 dark:border-slate-300 hover:border-slate-300 dark:hover:border-slate-400'
    },
    black: {
      textColor: 'text-orange-50',
      backgroundColor: 'bg-black dark:bg-slate-800',
      borderColor: ''
    },
  };
  return colors[type] || colors.default;
};
