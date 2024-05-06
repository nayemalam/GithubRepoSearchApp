import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Skeleton } from 'moti/skeleton';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DynamicStickyHeaderFlatlist from '../../components/DynamicStickyHeaderFlatlist';
import { GradientBackground } from '../../components/GradientBackground';
import { RepositoryCard } from '../../components/RepositoryCard';
import { SearchBar } from '../../components/SearchBar';
import { SearchHeader } from '../../components/SearchHeader';
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

export default function SearchScreen({ navigation }: Props) {
  const {
    query,
    setQuery,
    results: repositories,
    isLoading,
  } = useSearch({
    defaultQuery: '',
    defaultItemsPerPage: 20,
  });

  return (
    <GradientBackground>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <DynamicStickyHeaderFlatlist
              data={repositories}
              style={styles.list}
              HeaderComponent={<SearchHeader />}
              StickyElementComponent={
                <SearchBar query={query} setQuery={setQuery} />
              }
              renderItem={({ item }) => (
                <>
                  {isLoading && (
                    <View style={styles.mx30}>
                      <Skeleton colorMode="light" width={'100%'} height={90} />
                      <Spacer height={5} />
                    </View>
                  )}
                  {!isLoading && (
                    <RepositoryCard
                      navigation={navigation}
                      repository={item}
                      query={query}
                    />
                  )}
                </>
              )}
              TopListElementComponent={<View />}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  mx30: {
    marginHorizontal: 30,
  },
  item: {
    borderColor: 'green',
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: '100%',
  },
  list: {
    marginTop: 20,
    overflow: 'hidden',
  },
});
