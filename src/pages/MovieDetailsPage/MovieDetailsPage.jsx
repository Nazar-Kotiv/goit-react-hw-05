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
import ThreeDots from "../../components/LoaderDetails/LoaderDetails";
import { FaArrowLeft } from "react-icons/fa";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

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
        {isLoading && <ThreeDots />}
        {error && (
          <p>
            Movie not found! <Link to="/"> Go back</Link>
          </p>
        )}
        {movie && (
          <>
            <button className={css.buttonLink}>
              <Link to={backLinkRef.current} className={css.link}>
                <FaArrowLeft />
                <span>Go back</span>
              </Link>
            </button>

            <div className={css.containerSeparator}></div>
            <div className={css.containerFilmContent}>
              <div>
                <h1 className={css.title}>{movie.title}</h1>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : defaultImg
                  }
                  alt="Poster"
                />
              </div>

              <div className={css.filmDescription}>
                <p className={css.textDescription}>
                  <b>User Popularity : </b>
                  {movie.popularity}
                </p>
                <p className={css.textDescription}>
                  <b> Genres :</b>{" "}
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p className={css.textDescription}>
                  <b>Overview :</b> {movie.overview}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={css.containerSeparator}></div>
      <p className={css.additionalInfo}>
        <b>Addition information</b>
      </p>
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviwes">Reviwes</NavLink>
        </li>
      </ul>
      <hr />
      <Suspense fallback={<div>Loading Page..</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
