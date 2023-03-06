const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tvRequests = {
  fetchPopular: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchTopRated: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  fetchOnTheAir: `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
};

export default tvRequests;