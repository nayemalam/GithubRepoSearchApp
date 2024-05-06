import Icon from '@expo/vector-icons/Octicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Skeleton } from 'moti/skeleton';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DynamicStickyHeaderFlatlist from '../../components/DynamicStickyHeaderFlatlist';
import { Spacer } from '../../components/Spacer';
import useSearch from '../../hooks/useSearch';
import { RootStackParamList } from '../../types';

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

type Props = {
  navigation: SearchScreenNavigationProp;
};

const RepositoryCard = ({ navigation, repository }: any) => {
  const { id, name, description, owner } = repository;
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('Detail', { repository });
      }}>
      <Image source={{ uri: owner.avatar_url }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function SearchScreen({ navigation }: Props) {
  const {
    query,
    setQuery,
    debouncedQuery,
    results: repositories,
    totalItems,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  } = useSearch({
    defaultQuery: '',
    defaultItemsPerPage: 20,
  });

  console.log('repositories', repositories);
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['rgba(96, 31, 235, 0.1)', 'rgba(241, 241, 241, 0)']}
      locations={[0, 1]}
      style={styles.container}>
      <SafeAreaView>
        <View>
          <DynamicStickyHeaderFlatlist
            data={repositories}
            style={styles.list}
            renderItem={({ item }) => (
              <>
                {isLoading && (
                  <View style={{ marginHorizontal: 30 }}>
                    <Skeleton colorMode="light" width={'100%'} height={60} />
                    <Spacer height={5} />
                  </View>
                )}
                {!isLoading && (
                  <RepositoryCard navigation={navigation} repository={item} />
                )}
              </>
            )}
            HeaderComponent={
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // marginTop: 40,
                  marginBottom: 20,
                  marginHorizontal: 10,
                  gap: 10,
                  paddingHorizontal: 20,
                  // borderColor: 'red',
                  // borderWidth: 5,
                }}>
                <Image
                  source={require('../../../assets/github-octocat.png')}
                  style={{ width: 40, height: 40, objectFit: 'contain' }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'SF-Pro-Display-Bold',
                  }}>
                  GitHub Repo Search
                </Text>
              </View>
            }
            StickyElementComponent={
              <View style={styles.sticky}>
                <View style={styles.searchContainer}>
                  <Icon name="search" size={20} style={styles.icon} />
                  <TextInput
                    placeholder="Search"
                    style={styles.input}
                    value={query}
                    onChangeText={setQuery}
                    clearButtonMode="while-editing"
                  />
                </View>
              </View>
            }
            TopListElementComponent={<View style={styles.topList} />}
          />
          {/* <FlatList
            data={repositories}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <RepositoryCard
                name={item.name}
                description={item.description}
                owner={item.owner}
              />
            )}
            ListHeaderComponent={() => (
              <Text>{totalItems} repositories found</Text>
            )}
            style={styles.list}
          /> */}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    borderColor: 'red',
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: '100%',
  },
  item: {
    borderColor: 'green',
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: '100%',
  },
  sticky: {
    // backgroundColor: '#E3DCF0',
    // borderColor: 'blue',
    // borderWidth: 5,
    // width: '100%',
    // paddingHorizontal: 20,
    // marginBottom: 2,
    // paddingBottom: 5,
  },
  topList: {
    // borderColor: 'orange',
    // borderWidth: 5,
    // height: 100,
    // marginBottom: 6,
    // width: '100%',
  },

  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    // paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,
    alignItems: 'center',
    margin: 10,
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

  list: {
    marginTop: 20,
    overflow: 'hidden',
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 30,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
