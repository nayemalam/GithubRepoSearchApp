import * as Font from 'expo-font';

export const useFonts = async () => {
  await Font.loadAsync({
    'SF-Pro-Display-Regular': require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
  });
};
