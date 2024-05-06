import { useEffect, useState } from 'react';
import repositoryService from '../services/RepositoryService';

export const useGetRepository = ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  const [repository, setRepository] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [watchersCount, setWatchersCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchRepository = async () => {
      if (!owner || !repo) return;
      setIsLoading(true);
      try {
        const response = await repositoryService.getRepository(owner, repo);
        setRepository(response);
        setWatchersCount(response.subscribers_count);
      } catch (err) {
        console.error('Failed to fetch repository details', err);
        setRepository(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepository();
  }, [owner, repo]);

  return { repository, isLoading, watchersCount };
};
