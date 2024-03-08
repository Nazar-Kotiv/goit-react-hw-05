import { useEffect, useState, useRef } from "react";
import css from "./MovieDetailsPage.module.css";
import { getMovieId } from "../../movies-api";
import {
  useParams,
  NavLink,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { Suspense } from "react";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  const locationToSearch = useLocation();
  const backLinkRefToSearch = useRef(locationToSearch.state ?? "/");

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
    <div className={css.container}>
      <div className={css.containerFilm}>
        {isLoading && <p>Loading...</p>}
        {error && (
          <p>
            Movie not found! <Link to="/"> Go back</Link>
          </p>
        )}
        {movie && (
          <>
            <div className={css.containerNav}>
              <div>
                <Link to={backLinkRef.current}>Go back to Search Page</Link>
              </div>
              <div>
                <Link to={backLinkRefToSearch.current}>
                  Go back to Home Page
                </Link>
              </div>
            </div>
            <div className={css.containerFilmContent}>
              <div>
                <h1>{movie.title}</h1>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>

              <div className={css.filmDescription}>
                <p className={css.textDescription}>
                  User Popularшty : {movie.popularity}
                </p>
                <p className={css.textDescription}>
                  Genres : {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p className={css.textDescription}>
                  Overview : {movie.overview}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <p className={css.additionalInfo}> Addition information</p>

      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviwes">Reviwes</NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading Page..</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
