import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import ItemForm from "./ItemForm";

export default function EditItemModal({ item, show, handleClose, handleSubmit, handleDelete }) {

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
          <ItemForm
            item={item}
            isUpdate={true}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            onClose={handleClose}
          />
      </Modal>
    </>
  );
}
