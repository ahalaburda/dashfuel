import Modal from "react-bootstrap/Modal";
import ItemForm from "./ItemForm";

export default function CreateItemModal({ show, selectedStartTime, handleClose, handleSubmit }) {
  const item = {
    start: selectedStartTime,
    end: selectedStartTime + 3600000,
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Item</Modal.Title>
        </Modal.Header>
          <ItemForm
            item={item}
            onSubmit={handleSubmit}
            onClose={handleClose}
          />
      </Modal>
    </>
  );
}
