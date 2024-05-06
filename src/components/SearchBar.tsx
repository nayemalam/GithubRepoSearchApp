import Icon from '@expo/vector-icons/Octicons';
import React from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

type Props = {
  query: string;
  setQuery: (query: string) => void;
};

export const SearchBar = ({ query, setQuery }: Props) => {
  return (
    <View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} style={styles.icon} />
        <TextInput
          placeholder="Search"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          clearButtonMode="always"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,
    alignItems: 'center',
    margin: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: '#000',
    width: '100%',
  },
});
