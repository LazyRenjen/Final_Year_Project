import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import "./Province2Place.css";
import Carouselimage from "./janakpur.jpg";

const Province2Places = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const places = [
    {
      name: 'Janakpur',
      description: "Ancient city known for Janaki Temple, birthplace of Goddess Sita",
      detail:"Janakpur, located in southeastern Nepal, is not only a city rich in history and culture but also serves as a vibrant center for various socio-economic activities. Known for its scenic beauty, the city is surrounded by lush green fields and flowing rivers, enhancing its allure. The local population is predominantly of Mithila origin, and the region is famous for its unique dialect, Maithili, which reflects the rich cultural heritage of the area.Janakpur is also home to numerous educational institutions, promoting the arts, literature, and local crafts. The city is well-connected by road and rail, facilitating trade and travel, which has contributed to its status as a commercial hub. Furthermore, Janakpur is a melting pot of diverse cultures and traditions, where various festivals, such as Chhath and Holi, are celebrated with great enthusiasm, showcasing the region's vibrant community spirit. As the birthplace of Sita, Janakpur continues to be a pilgrimage site for many, drawing visitors who seek spiritual fulfillment and a connection to the rich narratives of the Ramayana. Overall, Janakpur stands as a testament to the confluence of history, culture, and modernity, making it an essential part of Nepal's identity. In addition to its rich historical and cultural significance, Janakpur is increasingly recognized for its role in promoting sustainable development and environmental conservation. The city has been actively involved in initiatives aimed at preserving its natural surroundings, including efforts to maintain the health of the rivers and green spaces around it. Janakpur is also witnessing a gradual transformation in its economic landscape, with a growing emphasis on tourism and hospitality. Local entrepreneurs are increasingly investing in hotels, restaurants, and cultural experiences that showcase Mithila art and traditions, attracting visitors from around the world. The city's markets are vibrant, offering a variety of handicrafts, textiles, and traditional Mithila paintings, which not only support local artisans but also contribute to the preservation of unique cultural practices. Moreover, Janakpur benefits from a strategic location near the Nepal-India border, enhancing cross-border trade and cultural exchange. This geographical advantage allows for the flourishing of commerce while fostering a sense of community among diverse populations. As such, Janakpur is not just a historical site but a dynamic city that embodies the spirit of resilience, cultural richness, and economic potential in contemporary Nepal." ,
      description2: [
        {
          title: "Historical Facts",
          details: [
            {
              subtitle: "Mythological Significance",
              text: "Janakpur is often associated with the epic Ramayana, as it is believed to be the birthplace of Goddess Sita. The city is named after King Janak, Sita's father."
            },
            {
              subtitle: "Janaki Temple",
              text: "The Janaki Temple, built in the 19th century, is an architectural marvel dedicated to Goddess Sita. It showcases a blend of Hindu and Mughal architectural styles and is a major pilgrimage site."
            },
            {
              subtitle: "Royal History",
              text: "Janakpur served as the capital of the ancient Janak Kingdom. It was a place of learning and culture, where many scholars and poets thrived."
            },
            {
              subtitle: "Cultural Hub",
              text: "The city has been a center for Mithila art and culture, especially known for its intricate Madhubani paintings. These artworks depict mythological themes and the daily life of the region."
            }
          ]
        },
        {
          title: "Modern Significance",
          details: [
            {
              subtitle: "Economic Development",
              text: "Today, Janakpur has transformed into a commercial hub in the Province No. 2 of Nepal, with growing trade and commerce, aided by its proximity to the Indian border."
            },
            {
              subtitle: "Tourism",
              text: "The city attracts numerous domestic and international tourists, particularly during festivals like Ram Navami, which celebrates the birth of Lord Rama. The Janaki Temple becomes a focal point for celebrations."
            },
            {
              subtitle: "Infrastructure Improvements",
              text: "Recent years have seen improvements in infrastructure, including roads and public services, enhancing accessibility and living conditions in Janakpur."
            },
            {
              subtitle: "Cultural Events",
              text: "Janakpur hosts various cultural events and festivals, promoting its rich heritage. It remains a vibrant center for the preservation and promotion of Mithila culture."
            },
            {
              subtitle: "Education and Research",
              text: "The region has developed educational institutions that focus on traditional art forms, languages, and cultural studies, contributing to the preservation of its unique heritage."
            },
            {
              subtitle: "Political Significance",
              text: "As a city within a politically important province, Janakpur plays a role in local governance and development initiatives in Nepal."
            }
          ]
        }
      ],

      highlights: [
        "Janaki Temple - UNESCO World Heritage Site",
        "Rich Mithila cultural heritage",
        "Important Hindu pilgrimage destination"
      ],
      image: Carouselimage,
      image2: '/api/placeholder/800/600',
      bestTimeToVisit: 'October to March',
      travelTips: [
        "Respect local cultural practices",
        "Try local Mithila cuisine",
        "Best explored on foot or cycle"
      ]
    },
    {
      name: 'Bardibas',
      description: "Strategic town with historical significance",
      highlights: [
        "Important trade route",
        "Close to Nepal-India border",
        "Agricultural hub"
      ],
      image: '/api/placeholder/800/600',
      bestTimeToVisit: 'November to February',
      travelTips: [
        "Visit local markets",
        "Experience rural Nepali lifestyle",
        "Check local festival dates"
      ]
    },
    {
      name: 'Birgunj',
      description: "Major commercial city and border trading point",
      highlights: [
        "Largest custom point with India",
        "Industrial and commercial center",
        "Diverse cultural mix"
      ],
      image: '/api/placeholder/800/600',
      bestTimeToVisit: 'Winter months',
      travelTips: [
        "Explore local markets",
        "Try street food",
        "Be prepared for busy commercial atmosphere"
      ]
    },
    {
      name: 'Dhanushadham',
      description: "Historic site with mythological significance",
      highlights: [
        "Associated with Ramayana epic",
        "Ancient temples and archaeological sites",
        "Cultural and religious importance"
      ],
      image: '/api/placeholder/800/600',
      bestTimeToVisit: 'October to March',
      travelTips: [
        "Hire local guide for historical insights",
        "Respect religious sites",
        "Wear comfortable walking shoes"
      ]
    },
    {
      name: 'Rautahat',
      description: "Rural district with rich agricultural landscape",
      highlights: [
        "Fertile agricultural lands",
        "Traditional Terai culture",
        "Close to Nepal-India border"
      ],
      image: '/api/placeholder/800/600',
      bestTimeToVisit: 'Winter and post-monsoon',
      travelTips: [
        "Experience rural lifestyle",
        "Visit during harvest season",
        "Interact with local farming communities"
      ]
    }
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % places.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + places.length) % places.length);
  };

  return (
    <div className="province-places-container">
      <h2 className="province-section-title">Explore Province 2: A Cultural Journey</h2>
      
      {/* Carousel */}
      <div className="place-carousel-wrapper">
        <div className="place-carousel-container">
          {/* Current Slide Image */}
          <img 
            src={places[currentSlide].image} 
            alt={places[currentSlide].name} 
            className="place-carousel-image"
          />
          
          {/* Navigation Buttons */}
          <button 
            onClick={handlePrevSlide} 
            className="place-carousel-nav-button place-carousel-nav-button-prev"
          >
            &#10094;
          </button>
          <button 
            onClick={handleNextSlide} 
            className="place-carousel-nav-button place-carousel-nav-button-next"
          >
            &#10095;
          </button>
          
          {/* Slide Caption */}
          <div className="place-carousel-caption">
            <h3 className="place-carousel-caption-title">{places[currentSlide].name}</h3>
            <p className="place-carousel-caption-description">{places[currentSlide].description}</p>
            <button 
              onClick={() => setSelectedPlace(places[currentSlide])}
              className="place-details-button"
            >
              <Info className="place-details-button-icon" /> Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {/* Modal */}
{selectedPlace && (
  <div className="place-modal-overlay">
    <div className="place-modal-content">
      <button 
        onClick={() => setSelectedPlace(null)} 
        className="place-modal-close-button"
      >
        <X className="place-modal-close-icon" />
      </button>
      
      <div className="place-modal-grid">
        <div className="place-modal-image-section">
          <img 
            src={selectedPlace.image} 
            alt={selectedPlace.name} 
            className="place-modal-image"
          />
          <h2 className="place-modal-title">{selectedPlace.name}</h2>
          <p className="place-modal-description">{selectedPlace.detail}</p>
        </div>
        
        <div className="place-modal-details-section">
          {selectedPlace.description2.map((section, index) => (
            <div key={index}>
              <h3 className="place-modal-section-title">{section.title}</h3>
              <ul className="place-modal-list">
                {section.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="place-modal-list-item">
                    <h4>{detail.subtitle}</h4>
                    <p>{detail.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <h3 className="place-modal-section-title">Highlights</h3>
          <ul className="place-modal-list">
            {selectedPlace.highlights.map((highlight, index) => (
              <li key={index} className="place-modal-list-item">{highlight}</li>
            ))}
          </ul>
          
          <h3 className="place-modal-section-title">Best Time to Visit</h3>
          <p className="place-modal-visit-time">{selectedPlace.bestTimeToVisit}</p>
          
          <h3 className="place-modal-section-title">Travel Tips</h3>
          <ul className="place-modal-list">
            {selectedPlace.travelTips.map((tip, index) => (
              <li key={index} className="place-modal-list-item">{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Province2Places;