// import { useState, useEffect } from "react";
// import MovieList from "../../components/MovieList/MovieList";
// import SearchForm from "../../components/SearchForm/SearchForm";
// import { getSearchMovie } from "../../movies-api";
// import { useSearchParams } from "react-router-dom";

// export default function MoviePage() {
//   const [searched, setSearched] = useState(false);
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const [searchParams] = useSearchParams();
//   const queryParam = searchParams.get("query") ?? "";

//   useEffect(() => {
//     async function getData() {
//       try {
//         setIsLoading(true);
//         const data = await getSearchMovie(queryParam);
//         if (data && data.results) {
//           setMovies(data.results);
//         } else {
//           setError(true);
//         }
//       } catch (error) {
//         setError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     getData();
//   }, [queryParam]);

//   const handleSearch = async (query) => {
//     try {
//       setIsLoading(true);
//       const data = await getSearchMovie(query);
//       if (data && data.results) {
//         setMovies(data.results);
//         setSearched(true);
//       } else {
//         setError(true);
//       }
//     } catch (error) {
//       setError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <SearchForm onSubmit={handleSearch} />
//       {isLoading && <b>Loading movies...</b>}
//       {error && <b>HTTP error!</b>}
//       {searched && <MovieList movies={movies} />}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import { getSearchMovie } from "../../movies-api";
import { useSearchParams } from "react-router-dom";

export default function MoviePage() {
  const [searched, setSearched] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // const [searchParams] = useSearchParams();
  // const queryParam = searchParams.get("query") ?? "";
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getSearchMovie(queryParam);
        if (data && data.results) {
          setMovies(data.results);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [queryParam]);

  const handleSearch = async (query) => {
    try {
      setIsLoading(true);
      const data = await getSearchMovie(query);
      if (data && data.results) {
        setMovies(data.results);
        searchParams.set("query", query);
        setSearchParams(searchParams);
        setSearched(true);
      } else {
        setError(true);
      }
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
