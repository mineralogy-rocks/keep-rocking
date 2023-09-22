export type Styles = {
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
};

export const getStyles= (type = "default"): Styles => {

  let defaultDarkStyles = {
    textColor: 'text-font-primary',
    backgroundColor: 'bg-red-50/60',
    borderColor: 'border border-font-secondary'
  };

  let defaultLightStyles = {
    textColor: 'text-font-orange',
    backgroundColor: 'bg-red-500',
    borderColor: 'border border-font-secondary'
  };

  const colors = {
    default: defaultDarkStyles,
    black: {
      ...defaultLightStyles,
      backgroundColor: 'bg-black'
    },
    blue: {
      ...defaultLightStyles,
      backgroundColor: 'bg-blue-500'
    },
    brown: {
      ...defaultLightStyles,
      backgroundColor: 'bg-yellow-900'
    },
    green: {
      ...defaultLightStyles,
      backgroundColor: 'bg-green-600'
    },
    grey: {
      ...defaultLightStyles,
      backgroundColor: 'bg-gray-500'
    },
    orange: {
      ...defaultLightStyles,
      backgroundColor: 'bg-orange-500'
    },
    pink: {
      ...defaultLightStyles,
      backgroundColor: 'bg-pink-500'
    },
    purple: {
      ...defaultLightStyles,
      backgroundColor: 'bg-purple-500'
    },
    red: {
      ...defaultLightStyles,
      backgroundColor: 'bg-red-500'
    },
    violet: {
      ...defaultLightStyles,
      backgroundColor: 'bg-violet-600'
    },
    highlighted: {
      ...defaultDarkStyles,
      borderColor: 'border border-gray-400'
    },
    white: {
      ...defaultDarkStyles,
      backgroundColor: 'bg-white'
    },
    yellow: {
      ...defaultDarkStyles,
      backgroundColor: 'bg-yellow-500'
    }
  };

  if (type in colors) return colors[type];
  return colors.default;
};
