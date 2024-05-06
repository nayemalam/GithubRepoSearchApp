import _ from 'lodash';
import { useEffect, useState } from 'react';
import repositoryService from '../services/RepositoryService';
import { normalizeQuery } from '../utils';

type Props = {
  defaultQuery?: string;
  defaultPage?: number;
  defaultItemsPerPage?: number;
  debounceDelay?: number;
};

const useSearch = ({
  defaultQuery = '',
  defaultPage = 1,
  defaultItemsPerPage = 10,
  debounceDelay = 500,
}: Props) => {
  const [query, setQuery] = useState(defaultQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(defaultQuery);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [results, setResults] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = _.debounce(() => {
      setDebouncedQuery(query);
    }, debounceDelay);

    handler();
    return () => {
      handler.cancel();
    };
  }, [query, debounceDelay]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      setError('');
      try {
        const normalizedQuery = normalizeQuery(debouncedQuery);
        const response = await repositoryService.searchRepositories(
          normalizedQuery,
          'asc',
          currentPage,
          itemsPerPage,
        );
        setResults(response.items);
        setTotalItems(response.total_count);
      } catch (err) {
        setError('Failed to fetch papers');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, currentPage, itemsPerPage]);

  return {
    query,
    setQuery,
    debouncedQuery,
    results,
    totalItems,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  };
};

export default useSearch;
