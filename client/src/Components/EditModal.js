import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditModal = ({
  show,
  handleClose,
  handleUpdate,
  editingUser,
  handleEditInputChange,
}) => {
  if (!editingUser) {
    return null; // If editingUser is null, do not render the modal
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{ borderBottom: "none" }}>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editingUser.name || ""}
              onChange={handleEditInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={editingUser.email || ""}
              onChange={handleEditInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="text"
              name="password"
              value={editingUser.password || ""}
              onChange={handleEditInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} >
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
