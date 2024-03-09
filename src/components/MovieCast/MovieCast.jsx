import { useEffect, useState } from "react";
import { getMovieCredits } from "../../movies-api";
import { useParams, Link } from "react-router-dom";
import LoaderCast from "../LoaderCast/LoaderCast";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    if (!movieId) return;

    async function getData() {
      try {
        setIsLoading(true);
        const data = await getMovieCredits(movieId);
        setCast(data);
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
      {isLoading && <LoaderCast />}
      {error && (
        <p>
          Movie not found! <Link to="/"> Go back</Link>
        </p>
      )}
      {cast && (
        <ul className={css.ul}>
          {cast.cast.map((actor) => (
            <li className={css.li} key={actor.id}>
              <img
                className={css.img}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                    : defaultImg
                }
                width={actor.profile_path ? 200 : 100}
                alt={actor.title}
              />
              <h2>
                Actror name: <p>{actor.name}</p>
              </h2>
              <p>
                <b>Character actror:</b> {actor.character}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
