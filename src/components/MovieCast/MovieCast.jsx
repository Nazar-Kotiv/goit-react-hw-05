import { useEffect, useState } from "react";
import { getMovieCredits } from "../../movies-api";
import { useParams, Link } from "react-router-dom";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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
      {cast && (
        <ul>
          {cast.cast.map((actor) => (
            <li key={actor.id}>
              <h2>{actor.name}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.title}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
