import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <p> Ops! Not Found Page</p>
      <Link to="/">Back to Home page</Link>
    </div>
  );
}
