import { Form, Row, Col, Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export default function ItemForm({ item, onSubmit, isUpdate = false , onDelete, onClose }) {
  const [title] = useState(item?.title || "");
  const [startDate, setStartDate] = useState(item?.start || new Date());
  const [endDate, setEndDate] = useState(item?.end || new Date());
  return (
    <Form onSubmit={onSubmit}>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="New Item"
            defaultValue={title}
            as="textarea"
            rows={3}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridStart">
            <Form.Label>Start</Form.Label>
            <DatePicker
              wrapperClassName="datePicker"
              className="form-control"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEnd">
            <Form.Label>End</Form.Label>
            <DatePicker
              wrapperClassName="datePicker"
              className="form-control"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
          </Form.Group>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        {!isUpdate ? (
          <>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline-danger" onClick={onDelete}>
              Delete
            </Button>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </>
        )}
      </Modal.Footer>
    </Form>
  );
}
