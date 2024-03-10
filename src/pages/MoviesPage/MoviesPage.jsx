import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import LoaderSearchForm from "../../components/LoaderSearchForm/LoaderSearchForm";
import { getSearchMovie } from "../../movies-api";
import { useSearchParams } from "react-router-dom";

export default function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [loadingQuery, setLoadingQuery] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";

  useEffect(() => {
    async function getData() {
      try {
        setLoadingResults(true);
        const data = await getSearchMovie(queryParam);
        if (data && data.results) {
          setMovies(data.results);
          setNotFound(data.results.length === 0);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoadingResults(false);
      }
    }
    if (queryParam) {
      getData();
    }
  }, [queryParam]);

  const handleSearch = async (query) => {
    try {
      setLoadingQuery(true);
      const data = await getSearchMovie(query);
      if (data && data.results) {
        setMovies(data.results);
        setNotFound(data.results.length === 0);
        setSearchParams({ query });
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoadingQuery(false);
    }
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearch} />
      {loadingQuery && <LoaderSearchForm />}
      {error && <b>HTTP error!</b>}
      {movies.length > 0 && !notFound && queryParam && !loadingResults && (
        <MovieList movies={movies} />
      )}
      {notFound && queryParam && <b>No movies found for the given query.</b>}
    </div>
  );
}
