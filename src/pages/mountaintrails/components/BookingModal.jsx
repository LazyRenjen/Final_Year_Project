import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "./BookingModal.css";

const BookingModal = ({ show, onHide, trail }) => {
  const [bookingDetails, setBookingDetails] = useState({
    startDate: "",
    participants: 1,
    specialRequests: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: name === "participants" ? Number(value) : value
    }));
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!bookingDetails.startDate) {
      setError("Please select a start date");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      // In a real app, this would call an API endpoint
      // await bookingAPI.createBooking({ trailId: trail._id, ...bookingDetails });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => {
        onHide();
        setSuccess(false);
        // Reset form
        setBookingDetails({
          startDate: "",
          participants: 1,
          specialRequests: ""
        });
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  if (!trail) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Book {trail.name}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleBook}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Booking successful!</Alert>}
          
          <p>
            <strong>Duration:</strong> {trail.duration} days<br />
            <strong>Difficulty:</strong> {trail.difficulty}<br />
            <strong>Price:</strong> ${trail.price}
          </p>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              required
              value={bookingDetails.startDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Number of Participants</Form.Label>
            <Form.Control
              type="number"
              name="participants"
              min="1"
              max="20"
              required
              value={bookingDetails.participants}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Special Requests (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              name="specialRequests"
              rows={3}
              value={bookingDetails.specialRequests}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading || success}>
            {loading ? "Processing..." : "Confirm Booking"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BookingModal;