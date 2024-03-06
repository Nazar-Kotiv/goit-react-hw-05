import css from "../ErrorMessage/ErrorMessage.module.css";
export default function ErrorMessage() {
  return (
    <p className={css.loadMoreBtn}>
      Something went wrong, please reload the page!
    </p>
  );
}
