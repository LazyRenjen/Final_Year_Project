import React from 'react';
import { useParams } from 'react-router-dom';
import destinationsData from './more.json';
import Footer from '../components/Footer/Footer';
import './DestinationPage.css';

const DestinationPage = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const destination = destinationsData[decodedName];

  if (!destination) {
    return <div className="error-message">Destination not found</div>;
  }

  return (
    <div className="destination-page">
      <header className="destination-header">
        <h1>{decodedName.split(' (')[0]}</h1>
      </header>

      <div className="destination-content">
        {/* History Section */}
        <section className="history-section">
          <div className="text-content">
            <h2>{destination.History.title}</h2>
            <p>{destination.History.description}</p>
          </div>
          {destination.History.image && (
            <div className="image-content">
              <img src={destination.History.image} alt={`${decodedName} History`} />
            </div>
          )}
        </section>

        {/* Present Section */}
        <section className="present-section">
          {destination.Present.image && (
            <div className="image-content">
              <img src={destination.Present.image} alt={`${decodedName} Present`} />
            </div>
          )}
          <div className="text-content">
            <h2>{destination.Present.title}</h2>
            <p>{destination.Present.description}</p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationPage;
