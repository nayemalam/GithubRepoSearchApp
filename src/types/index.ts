export type Repository = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  watchers_count: number;
  stargazers_count: number;
  forks: number;
  url: string;
  html_url: string;
  language: {
    type: ['string', 'null'];
  };
  // ...
};

export type RootStackParamList = {
  Search: undefined;
  Detail: { repository: Repository };
};
