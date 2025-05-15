// MountainTrails.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import TrailCard from "./components/TrailCard";
import CreateTrailModal from "./components/CreateTrailModal";
import BookingModal from "./components/BookingModal";
import * as trailAPI from "./api/trailService.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import "./MountainTrails.css";

const MountainTrails = () => {
  const { user } = useAuth();
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState(null);

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const data = await trailAPI.getTrails();
        setTrails(data);
      } catch (err) {
        setError("Failed to load trails");
      } finally {
        setLoading(false);
      }
    };
    fetchTrails();
  }, []);

  const handleCreateTrail = async (newTrail) => {
    try {
      const createdTrail = await trailAPI.createTrail(newTrail);
      setTrails([...trails, createdTrail]);
      setShowCreateModal(false);
    } catch (err) {
      setError(err.message || "Failed to create trail");
    }
  };

  const handleDeleteTrail = async (trailId) => {
    try {
      await trailAPI.deleteTrail(trailId);
      setTrails(trails.filter(trail => trail._id !== trailId));
    } catch (err) {
      setError("Failed to delete trail");
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Mountain Trails</h1>
        {user?.isAdmin && (
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            Add New Trail
          </Button>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {trails.map(trail => (
            <Col key={trail._id}>
              <TrailCard
                trail={trail}
                onDelete={handleDeleteTrail}
                onBook={() => setSelectedTrail(trail)}
                isAdmin={user?.isAdmin}
              />
            </Col>
          ))}
        </Row>
      )}

      <CreateTrailModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onCreate={handleCreateTrail}
      />

      <BookingModal
        show={!!selectedTrail}
        onHide={() => setSelectedTrail(null)}
        trail={selectedTrail}
      />
    </Container>
  );
};

export default MountainTrails;
