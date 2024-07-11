export type Styles = {
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
};

export const getStyles= (type = "default"): Styles => {

  let defaultStyles = {
    textColor: 'text-font-primary',
    backgroundColor: 'bg-chip',
    borderColor: 'border border-slate-200 dark:border-slate-400/50 hover:border-slate-300 dark:hover:border-slate-400/80'
  };

  const colors = {
    default: defaultStyles,
    highlighted: {
      ...defaultStyles,
      borderColor: 'border border-slate-400'
    }
  };
  return colors[type];
};
