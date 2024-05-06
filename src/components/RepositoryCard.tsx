import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Repository, RootStackParamList } from '../types';

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

type Props = {
  navigation: SearchScreenNavigationProp;
  repository: Repository;
  query: string;
};

export const RepositoryCard = ({ navigation, repository, query }: Props) => {
  const { id, name, description, owner } = repository;
  const repositoryName = `${owner.login}/${name}`;

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
      <Text style={styles.name} numberOfLines={1}>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} style={styles.highlight}>
              {part}
            </Text>
          ) : (
            part
          ),
        )}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('Detail', { repository });
      }}>
      <View style={styles.topContainer}>
        <Image source={{ uri: owner.avatar_url }} style={styles.avatar} />
        {getHighlightedText(repositoryName, query)}
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    padding: 16,
    marginHorizontal: 30,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    height: 100,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 10,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  descriptionContainer: {
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    width: 250,
  },
  highlight: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
