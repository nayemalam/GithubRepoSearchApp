import { TextStyle } from 'react-native';

type ThemeType = {
  colors: {
    defaultWhite: string;
    defaultBlack: string;
    purple: string;
  };
  pageTitleLarge: TextStyle;
};

export const theme: ThemeType = {
  colors: {
    defaultWhite: '#FFF',
    defaultBlack: '#000',
    purple: '#800080',
  },
  pageTitleLarge: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
};
