import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { getSearchMovie } from "../../movies-api";
import SearchForm from "../../components/SearchForm/SearchForm";

export default function MoviePage({ onSubmit }) {
  const [searched, setSearched] = useState(false);
  const [movies, setMovies] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getSearchMovie();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <SearchForm onSubmit={onSubmit} />
      {movies !== "" && <MovieList movies={movies} />}
    </div>
  );
}
