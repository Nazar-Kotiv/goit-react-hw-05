import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDhkNjZmODM0YjFiMDUzYjQ2YTk4ZWZmYWVlMTQ5ZCIsInN1YiI6IjY1ZTg4OTRkOTYzODY0MDE4MWNhMWM1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Aj9IK_-6oYeAc7V6Y3KZdJ1Q3ozhcEPMYYHfj3_XVX4",
  },
};

export const getMovies = async () => {
  const response = await axios.get(
    "/trending/movie/day?language=en-US",
    options
  );
  return response.data.results;
};

export const getMovieId = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?language=en-US`, options);
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data;
};
