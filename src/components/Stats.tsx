import Icon from '@expo/vector-icons/Octicons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { convertToInternationalCurrencySystem } from '../utils';

type Props = {
  forks: number | null;
  stars: number | null;
  watchers: number | null;
};

export const Stats = ({ forks, stars, watchers }: Props) => {
  return (
    <View style={styles.statsContainer}>
      {watchers && (
        <View style={styles.iconContainer}>
          <Icon name="eye" size={16} color="#707070" />
          <Text style={styles.text}>
            {convertToInternationalCurrencySystem(watchers)}
          </Text>
        </View>
      )}
      {forks && (
        <View style={styles.iconContainer}>
          <Icon name="repo-forked" size={16} color="#707070" />
          <Text style={styles.text}>
            {convertToInternationalCurrencySystem(forks)}
          </Text>
        </View>
      )}
      {stars && (
        <View style={styles.iconContainer}>
          <Icon name="star" size={16} color="#707070" />
          <Text style={styles.text}>
            {convertToInternationalCurrencySystem(stars)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    gap: 14,
    width: '100%',
    marginBottom: 20,
    maxWidth: 265,
    marginTop: 10,
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  text: {
    fontSize: 12,
    color: '#707070',
  },
});
