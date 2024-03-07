import { getMovies } from "../../movies-api";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getMovies();
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
      <h1>Trending today</h1>
      {isLoading && <b>Loading movies...</b>}
      {error && <b>HTTP error!</b>}
      <MovieList movies={movies} />
    </div>
  );
}
