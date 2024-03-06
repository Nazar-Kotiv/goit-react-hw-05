import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ items, onImageClick }) {
  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li className={css.iteam} key={item.id}>
          <ImageCard card={item} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}
