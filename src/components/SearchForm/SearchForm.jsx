import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import css from "./SearchForm.module.css";

export default function SearchForm({ onSubmit }) {
  const handleSearch = async (values, actions) => {
    if (values.query.trim() === "") {
      toast.error("Please write the name of the film");
    } else {
      await onSubmit(values.query);

      actions.resetForm();
    }
  };

  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => handleSearch(values, actions)}
    >
      <Form className={css.form}>
        <Field
          className={css.inputSearch}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
        />
        <button className={css.button} type="submit">
          Search
        </button>
        <Toaster />
      </Form>
    </Formik>
  );
}
