import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { MdOutlineClose } from "react-icons/md";

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, regular, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      portalClassName={css.portal}
      overlayClassName={css.overlay}
      className={css.modal}
      shouldCloseOnOverlayClick={true}
    >
      <div className={css.overlay} onClick={closeModal}>
        <button className={css.button} onClick={closeModal}>
          <MdOutlineClose size={32} />
        </button>
        <div className={css.container}>
          <img className={css.image} src={regular} />
        </div>
      </div>
    </Modal>
  );
}
