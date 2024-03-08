import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import { useSearchParams } from "react-router-dom";

export default function SearchForm({ onSubmit }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";

  const handleSearch = async (values, actions) => {
    if (values.query.trim() === "") {
      toast.error("Please write the name of the film");
    } else {
      setSearchParams({ query: values.query });
      await onSubmit(values.query);
      actions.resetForm();
    }
  };

  useEffect(() => {
    if (!searchParams.has("query") && queryParam === "") {
      setSearchParams({ query: "" });
    }
  }, [searchParams, setSearchParams, queryParam]);

  return (
    <Formik
      initialValues={{ query: queryParam }}
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
  );
}
