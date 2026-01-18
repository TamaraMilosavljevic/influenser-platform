export type Influencer = {
  userId: number;
  name: string;
  headline: string | null;
  experience: number | null;
  isPrivate: boolean;
};

export type SearchQueryParams = {
    name?: string;
    industry?: string;
    value?: string;
};