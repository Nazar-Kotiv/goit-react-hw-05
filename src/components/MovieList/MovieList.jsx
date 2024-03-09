import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={styles.ul}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.li}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
            className={styles.link}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
