import { useEffect, useState } from "react";
import { getMovieReviwes } from "../../movies-api";
import { useParams, Link } from "react-router-dom";

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
      {isLoading && <p>Loading...</p>}
      {error && (
        <p>
          Movie not found! <Link to="/"> Go back</Link>
        </p>
      )}
      {reviwes && (
        <ul>
          {reviwes.results.map((reviwe) => (
            <li key={reviwe.id}>
              <h2>Author: {reviwe.author}</h2>
              <p>{reviwe.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
