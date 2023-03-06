const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const peopleRequests = {
  fetchPopular: `${BASE_URL}/person/popular?api_key=${API_KEY}&language=en-US&page=1`,
};

export default peopleRequests;
