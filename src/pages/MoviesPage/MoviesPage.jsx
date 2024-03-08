import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import { getSearchMovie } from "../../movies-api";

export default function MoviePage() {
  const [searched, setSearched] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getSearchMovie("");
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const handleSearch = async (query) => {
    try {
      setIsLoading(true);
      const data = await getSearchMovie(query);
      setMovies(data.results);
      setSearched(true);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <b>Loading movies...</b>}
      {error && <b>HTTP error!</b>}
      {searched && <MovieList movies={movies} />}
    </div>
  );
}
