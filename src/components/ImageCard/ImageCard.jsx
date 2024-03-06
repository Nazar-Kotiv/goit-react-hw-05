import css from "./ImageCard.module.css";

export default function ImageCard({ card, onImageClick }) {
  const { id, urls, alt_description } = card;

  return (
    <div className={css.container} key={id}>
      <img
        onClick={() => onImageClick(urls.regular)}
        src={urls.small}
        alt={alt_description}
        className={css.image}
      />
    </div>
  );
}
