import { useEffect, useState } from "react";
import { getMovieReviwes } from "../../movies-api";
import { useParams, Link } from "react-router-dom";
import LoaderReviews from "../LoaderReviews/LoaderReviews";
import css from "./MovieReviews.module.css";

export default function MovieReviwes() {
  const { movieId } = useParams();
  const [reviwes, setReviwes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function getData() {
      try {
        setIsLoading(true);
        const data = await getMovieReviwes(movieId);
        setReviwes(data);
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
      {isLoading && <LoaderReviews />}
      {error && (
        <p>
          Movie not found! <Link to="/"> Go back</Link>
        </p>
      )}
      {reviwes && reviwes.results.length > 0 ? (
        <ul className={css.ul}>
          {reviwes.results.map((reviwe) => (
            <li className={css.li} key={reviwe.id}>
              <h2 className={css.h2}>Author: {reviwe.author}</h2>
              <p className={css.p}>{reviwe.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <b>No reviews available for this movie.</b>
      )}
    </div>
  );
}
