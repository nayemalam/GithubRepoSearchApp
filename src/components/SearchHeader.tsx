import { Image, StyleSheet, Text, View } from 'react-native';

export const SearchHeader = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../../assets/github-octocat.png')}
        style={styles.image}
      />
      <Text style={styles.text}>GitHub Repo Search</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginHorizontal: 20,
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  image: {
    width: 40,
    height: 40,
    objectFit: 'contain',
  },
  text: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Bold',
  },
});
