import React from "react";

interface ModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => boolean | void;
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ openModal, setOpenModal, children }) => {
  return (
    <div>
      <dialog id="my_modal_3" className={`modal ${openModal && "modal-open"}`}>
        <div className="modal-box">
          <button
            onClick={() => setOpenModal(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          {children}
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
