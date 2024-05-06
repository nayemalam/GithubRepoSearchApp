import { useEffect, useState } from 'react';
import repositoryService from '../services/RepositoryService';

export const useGetLanguages = ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      if (!owner || !repo) return;
      setIsLoading(true);
      try {
        const response = await repositoryService.getLanguagesByOwnerAndRepo(
          owner,
          repo,
        );
        setLanguages(Object.keys(response));
      } catch (err) {
        console.error('Failed to fetch languages', err);
        setLanguages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLanguages();
  }, [owner, repo]);

  return { languages, isLoading };
};
