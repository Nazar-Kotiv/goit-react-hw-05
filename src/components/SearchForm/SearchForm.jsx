import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field } from "formik";

export default function SearchForm({ onSubmit }) {
  const handleSearch = async (values, actions) => {
    if (values.query.trim() === "") {
      toast.error("Please write the name of the film");
    } else {
      await onSubmit(values.query); // змінено з onSearch на onSubmit
      actions.resetForm();
      setSearched(true);
    }
  };
  return (
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
  );
}
