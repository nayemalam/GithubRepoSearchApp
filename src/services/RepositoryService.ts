import { API_BASE_URL, accessToken } from './api';

export async function searchRepositories(
  text: string,
  order: string = 'asc',
  page: number = 1,
  perPage: number = 10,
) {
  if (!text) throw new Error('No text provided');

  let queryParams = `q=(${encodeURIComponent(text)})`;
  if (order !== undefined) queryParams += `&order=${order}`;
  if (page !== undefined) queryParams += `&page=${page}`;
  if (perPage !== undefined) queryParams += `&per_page=${perPage}`;

  try {
    // ex. https://api.github.com/search/repositories?q=SmartPaperSearch&order=desc&page=1&per_page=10
    const response = await fetch(
      `${API_BASE_URL}/search/repositories?${queryParams}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // handle error
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const getRepository = async (owner: string, repo: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/repos/${owner}/${repo}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // handle error
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getLanguagesByOwnerAndRepo = async (
  owner: string,
  repo: string,
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/repos/${owner}/${repo}/languages`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // handle error
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default {
  searchRepositories,
  getLanguagesByOwnerAndRepo,
  getRepository,
};
