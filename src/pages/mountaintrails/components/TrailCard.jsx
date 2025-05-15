import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import "./TrailCard.css";

const TrailCard = ({ trail, onDelete, onBook, isAdmin }) => {
  return (
    <Card className="h-100 trail-card">
      <Card.Img variant="top" src={trail.image} alt={trail.name} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{trail.name}</Card.Title>
        <Badge bg={
          trail.difficulty === "easy" ? "success" :
          trail.difficulty === "medium" ? "info" :
          trail.difficulty === "hard" ? "warning" : "danger"
        } className="mb-2 difficulty-badge">
          {trail.difficulty.charAt(0).toUpperCase() + trail.difficulty.slice(1)}
        </Badge>
        <Card.Text>{trail.description}</Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5">${trail.price}</span>
            <span>{trail.duration} days</span>
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button variant="success" onClick={onBook}>
              Book Now
            </Button>
            {isAdmin && (
              <Button variant="danger" onClick={() => onDelete(trail._id)}>
                Delete Trail
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TrailCard;