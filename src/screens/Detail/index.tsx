import Icon from '@expo/vector-icons/Octicons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { Skeleton } from 'moti/skeleton';
import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GenericErrorView from '../../components/GenericErrorView';
import { Spacer } from '../../components/Spacer';
import repositoryService from '../../services/RepositoryService';
import { RootStackParamList } from '../../types';
import { convertToInternationalCurrencySystem } from '../../utils';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Detail'
>;

type Props = {
  navigation: SearchScreenNavigationProp;
  route: DetailScreenRouteProp;
};

export default function DetailScreen({ route, navigation }: Props) {
  if (!route.params) {
    return <GenericErrorView title="Nothing to show" goBackMessage="Go Home" />;
  }
  const [languages, setLanguages] = useState<string[]>([]);
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(false);
  const [watchersCount, setWatchersCount] = useState<number | null>(null);

  console.log('route.params', route.params.repository);

  const repository = route.params.repository;

  useEffect(() => {
    const fetchLanguages = async () => {
      setIsLoadingLanguages(true);
      try {
        const response = await repositoryService.getLanguagesByOwnerAndRepo(
          repository.owner.login,
          repository.name,
        );
        setLanguages(Object.keys(response));
      } catch (err) {
        console.error('Failed to fetch languages', err);
      } finally {
        setIsLoadingLanguages(false);
      }
    };

    const fetchWatchers = async () => {
      try {
        const response = await repositoryService.getRepository(
          repository.owner.login,
          repository.name,
        );
        setWatchersCount(response.subscribers_count);
      } catch (err) {
        console.error('Failed to fetch watchers count', err);
      }
    };

    fetchLanguages();
    fetchWatchers();
  }, [repository]);

  console.log('watchersCount', watchersCount);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['rgba(96, 31, 235, 0.1)', 'rgba(241, 241, 241, 0)']}
      locations={[0, 1]}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={{ marginHorizontal: 30 }}>
              <Image
                style={styles.profileImage}
                source={{ uri: repository.owner.avatar_url }}
              />
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: 5,
                }}>
                <Text style={styles.title}>{repository.owner.login}/</Text>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: 'SF-Pro-Display-Bold',
                  }}>
                  {repository.name}
                </Text>
              </View>
              <View style={styles.statsContainer}>
                {watchersCount && (
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 5,
                    }}>
                    <Icon name="eye" size={16} color="#707070" />
                    <Text style={{ fontSize: 12, color: '#707070' }}>
                      {convertToInternationalCurrencySystem(watchersCount)}
                    </Text>
                  </View>
                )}
                {repository.forks && (
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 5,
                    }}>
                    <Icon name="repo-forked" size={16} color="#707070" />
                    <Text style={{ fontSize: 12, color: '#707070' }}>
                      {convertToInternationalCurrencySystem(repository.forks)}
                    </Text>
                  </View>
                )}
                {repository.stargazers_count && (
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 5,
                    }}>
                    <Icon name="star" size={16} color="#707070" />
                    <Text style={{ fontSize: 12, color: '#707070' }}>
                      {convertToInternationalCurrencySystem(
                        repository.stargazers_count,
                      )}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <ScrollView style={styles.sectionContainer}>
            <Text style={styles.description}>{repository.description}</Text>
            <Text style={styles.sectionTitle}>Languages</Text>
            {isLoadingLanguages &&
              Array.from({ length: 10 }).map((_, index) => (
                <>
                  <Skeleton
                    key={index}
                    colorMode="light"
                    width={50}
                    height={10}
                  />
                  <Spacer height={5} />
                </>
              ))}
            {languages.length === 0 && !isLoadingLanguages && (
              <Text>No languages found</Text>
            )}
            {languages.map((language, index) => (
              <Text key={index} style={styles.language}>
                {language}
              </Text>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.repoButton}
          onPress={() => {
            console.log('opening url', repository.html_url);
            Linking.openURL(repository.html_url);
          }}>
          <Text style={styles.repoButtonText}>Go to Repo</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  header: {
    marginVertical: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'SF-Pro-Display-Regular',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 14,
    width: '100%',
    marginBottom: 20,
    maxWidth: 265,
    marginTop: 10,
  },
  sectionContainer: {
    marginBottom: 20,
    marginHorizontal: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  language: {
    fontSize: 16,
    marginBottom: 5,
  },
  repoButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginHorizontal: 30,
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  repoButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'SF-Pro-Display-Bold',
  },
});
