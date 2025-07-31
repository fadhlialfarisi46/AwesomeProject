import { API_KEY, BASE_URL } from '@env';

export type TVShow = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
};

type TVShowApiResponse = {
    results: TVShow[];
    page: number;
    total_pages: number;
    total_results: number;
};

export async function fetchTVShows(page: number): Promise<TVShowApiResponse> {
    const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch TVShows');
    }
    return response.json();
}

export const fetchTVShowById = async (id: number): Promise<TVShow> => {
  const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export async function fetchTVShowsByType(type: string, page: number) {
  const url = `${BASE_URL}/tv/${type}?api_key=${API_KEY}&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch TVShows');
  return response.json();
}
