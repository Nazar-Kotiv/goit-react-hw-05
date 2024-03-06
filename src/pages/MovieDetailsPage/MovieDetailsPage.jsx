import { useEffect, useState } from "react";
import { getMovieId } from "../../movies-api";
import { useParams, NavLink, Outlet, Link } from "react-router-dom";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getMovieId(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [movieId]);

  return (
    <div>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && (
          <p>
            Movie not found! <Link to="/"> Go back</Link>
          </p>
        )}
        {movie && (
          <>
            <h1>{movie.title}</h1>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <p>User Popularшty : {movie.popularity}</p>
            <p>Genres : {movie.genres.map((genre) => genre.name).join(", ")}</p>
            <p> Overview : {movie.overview}</p>
          </>
        )}
      </div>
      <p> Addition information</p>

      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviwes">Reviwes</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
