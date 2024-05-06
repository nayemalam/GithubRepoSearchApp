import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import DetailScreen from '../screens/Detail';
import SearchScreen from '../screens/Search';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
