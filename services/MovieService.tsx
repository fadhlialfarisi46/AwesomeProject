const API_KEY = 'b70d7dfa024fdc891e1451d1a34ec39a'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
};

type MovieApiResponse = {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
};

export async function fetchMovies(page: number): Promise<MovieApiResponse> {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    return response.json();
}

export const fetchMovieById = async (id: number): Promise<Movie> => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export async function fetchMoviesByType(type: string, page: number) {
  const url = `${BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch movies');
  return response.json();
}
