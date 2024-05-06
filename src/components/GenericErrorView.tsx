import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

type Props = {
  title: string;
  goBackMessage: string;
};

const GenericErrorView = ({ title, goBackMessage }: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.defaultBlack,
      }}>
      <Text
        style={{
          color: theme.colors.defaultWhite,
          fontSize: 24,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>

      <TouchableOpacity
        style={{
          marginTop: 30,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 8,
          backgroundColor: theme.colors.purple,
        }}
        onPress={() => {
          navigation.navigate('Search');
        }}>
        {/* <Icon name="back" size={20} color={theme.colors.defaultWhite} /> */}
        <Text
          style={{
            color: theme.colors.defaultWhite,
            fontSize: 16,
          }}>
          {goBackMessage}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenericErrorView;
