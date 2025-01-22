import React from 'react';
import './Provinces1places.css';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import everestImage from './everest.jpg';

const Province1places = () => {
  const places = [
    {
      name: 'Mount Everest (Sagarmatha)',
      description: "The world’s highest peak, a dream destination for trekkers.",
      image: everestImage, 
    },
    {
      name: 'Kanchenjunga Base Camp',
      description: "Stunning trekking experience near the third-highest mountain.",
      image: 'https://example.com/kanchenjunga.jpg',
    },
    {
      name: 'Ilam',
      description: "Famous for its lush tea gardens and scenic beauty.",
      image: 'https://example.com/ilam.jpg',
    },
    {
      name: 'Dharan',
      description: "A cultural hub with a mix of modern and traditional vibes.",
      image: 'https://example.com/dharan.jpg',
    },
    {
      name: 'Pathibhara Temple',
      description: "A sacred pilgrimage site with breathtaking views.",
      image: 'https://example.com/pathibhara.jpg',
    },
    {
      name: 'Barun Valley',
      description: "Known for its biodiversity and stunning landscapes.",
      image: 'https://example.com/barun.jpg',
    },
    {
      name: 'Hile',
      description: "A small town offering panoramic Himalayan views.",
      image: 'https://example.com/hile.jpg',
    },
    {
      name: 'Antu Danda',
      description: "A hill station ideal for sunrise views over the Kanchenjunga range.",
      image: 'https://example.com/antu.jpg',
    },
    {
      name: 'Tinjure-Milke-Jaljale (TMJ)',
      description: "Famous for its rhododendron forests.",
      image: 'https://example.com/tmj.jpg',
    },
    {
      name: 'Koshi Tappu Wildlife Reserve',
      description: "A haven for bird watchers and wildlife enthusiasts.",
      image: 'https://example.com/koshitappu.jpg',
    },
  ];

  return (
    <div className="province1-places-container">
      <h2 className="province1-title">Top 10 Places in Koshi Province</h2>
      <Carousel>
        {places.map((place, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 place-image"
              src={place.image}
              alt={place.name}
            />
            <Carousel.Caption>
              <h3>{place.name}</h3>
              <p>{place.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Province1places;
