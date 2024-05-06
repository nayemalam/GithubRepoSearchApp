import { TextStyle } from 'react-native';

type ThemeType = {
  colors: {
    defaultWhite: string;
    defaultBlack: string;
    purple: string;
  };
  pageTitleLarge: TextStyle;
  font: {
    SFProTextRegular: string;
    SFProTextBold: string;
  };
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
  font: {
    SFProTextRegular: 'SF-Pro-Display-Regular',
    SFProTextBold: 'SF-Pro-Display-Bold',
  },
};
