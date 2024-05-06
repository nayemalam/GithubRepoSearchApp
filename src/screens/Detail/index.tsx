import Icon from '@expo/vector-icons/Octicons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
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
import { GradientBackground } from '../../components/GradientBackground';
import { LanguagesSkeleton } from '../../components/LanguagesSkeleton';
import { Stats } from '../../components/Stats';
import { useGetLanguages } from '../../hooks/useGetLanguages';
import { useGetRepository } from '../../hooks/useGetRepository';
import { theme } from '../../styles/theme';
import { RootStackParamList } from '../../types';

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

  const repository = route.params.repository;

  const { languages, isLoading: isLanguagesLoading } = useGetLanguages({
    owner: repository.owner.login,
    repo: repository.name,
  });

  const { watchersCount } = useGetRepository({
    owner: repository.owner.login,
    repo: repository.name,
  });

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.mx30}>
              <Image
                style={styles.profileImage}
                source={{ uri: repository.owner.avatar_url }}
              />
              <View style={styles.headerName}>
                <Text style={styles.title}>{repository.owner.login}/</Text>
                <Text style={styles.repoName}>{repository.name}</Text>
              </View>
              <Stats
                forks={repository.forks}
                stars={repository.stargazers_count}
                watchers={watchersCount}
              />
            </View>
          </View>
          <ScrollView style={styles.sectionContainer}>
            <Text style={styles.description}>{repository.description}</Text>
            <Text style={styles.sectionTitle}>Languages</Text>
            {isLanguagesLoading && <LanguagesSkeleton />}
            {languages.length === 0 && !isLanguagesLoading && (
              <Text>No languages found</Text>
            )}
            {languages.map((language, index) => (
              <Text key={`${language}-${index}`} style={styles.language}>
                {language}
              </Text>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.repoButton}
          onPress={() => {
            Linking.openURL(repository.html_url);
          }}>
          <Text style={styles.repoButtonText}>Go to Repo</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  mx30: {
    marginHorizontal: 30,
  },
  header: {
    marginVertical: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  headerName: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  repoName: {
    fontSize: 24,
    fontFamily: theme.font.SFProTextBold,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.font.SFProTextRegular,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
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
    fontFamily: theme.font.SFProTextBold,
  },
});
