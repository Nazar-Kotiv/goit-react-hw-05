import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviePage({ onSearch }) {
  const [searched, setSearched] = useState(false);

  const handleSearch = async (values, actions) => {
    if (values.query.trim() === "") {
      toast.error("Please write the name of the film");
    } else {
      await onSearch(values.query);
      actions.resetForm();
      setSearched(true);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => handleSearch(values, actions)}
      >
        <Form>
          <Field
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
          />
          <button type="submit">Search</button>
          <Toaster />
        </Form>
      </Formik>

      {searched && <MovieList />}
    </div>
  );
}
