import React from 'react';
import { useParams } from 'react-router-dom';
import destinationsData from './more.json'; // Import your JSON data
import './DestinationPage.css'; // Import the CSS file
import Footer from '../components/Footer/Footer';

const DestinationPage = () => {
  const { name } = useParams(); // Get the destination name from the URL
  const decodedName = decodeURIComponent(name); // Decode the name to handle special characters

  // Find the destination in the JSON data
  const destination = destinationsData[decodedName];

  // If the destination is not found, display an error message
  if (!destination) {
    return <div className="error-message">Destination not found</div>;
  }

  return (
    <div className="destination-page">
      <header className="destination-header">
        <h1>{destination.name}</h1>
        <img src={destination.image} alt={destination.name} className="destination-image" />
      </header>

      <div className="destination-details">
        <div className="detail-section">
          <h2>Elevation</h2>
          <p>{destination.elevation}</p>
        </div>

        <div className="detail-section">
          <h2>Best Time to Visit</h2>
          <p>{destination.bestTime.join(" , ")}</p>
        </div>

        <div className="detail-section">
          <h2>Activities</h2>
          <ul>
            {destination.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="description-section">
        {/* History Section */}
        <section className="history-section">
          <div className="text-content">
            <h2>{destination.description.History.title}</h2>
            <p>{destination.description.History.description}</p>
          </div>
          {destination.description.History.image && (
            <div className="image-content">
              <img
                src={destination.description.History.image}
                alt={`${destination.name} History`}
              />
            </div>
          )}
        </section>

        {/* Present Section */}
        <section className="present-section">
          {destination.description.Present.image && (
            <div className="image-content">
              <img
                src={destination.description.Present.image}
                alt={`${destination.name} Present`}
              />
            </div>
          )}
          <div className="text-content">
            <h2>{destination.description.Present.title}</h2>
            <p>{destination.description.Present.description}</p>
            <p>{destination.description.Present.end}</p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DestinationPage;