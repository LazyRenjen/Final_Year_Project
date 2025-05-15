import React, { useState } from 'react';
import Winter from './seasonalimg/Winter.jpg';
import Spring from './seasonalimg/Spring.jpg';
import Summer from './seasonalimg/Summer.jpg';
import Autumn from './seasonalimg/Autumn.jpg';
import './Seasons.css';

const Seasons = () => {
  const getNepalSeason = () => {
    const month = new Date().getMonth();
    if ([2, 3, 4].includes(month)) return 0;
    if ([5, 6, 7].includes(month)) return 1;
    if ([8, 9, 10].includes(month)) return 2;
    return 3;
  };

  const [activeSeason, setActiveSeason] = useState(getNepalSeason());

  const seasonalImages = {
    Spring: Spring,
    Summer: Summer,
    Autumn: Autumn,
    Winter: Winter,
  };

  const seasons = [
    {
      name: 'Spring',
      description: 'Beautiful rhododendron blooms and stable weather.',
      advantage: 'Ideal for trekking and exploring natural flora.',
      precaution: 'Carry light jackets; weather may still be cool.',
    },
    {
      name: 'Summer',
      description: 'Monsoon season with occasional rain and lush landscapes.',
      advantage: 'Great for nature lovers; fewer crowds.',
      precaution: 'Be prepared for rain; carry waterproof gear.',
    },
    {
      name: 'Autumn',
      description: 'Perfect trekking conditions with clear skies.',
      advantage: 'Best for trekking; stable weather.',
      precaution: 'Book accommodations early; peak season.',
    },
    {
      name: 'Winter',
      description: 'Cold temperatures with snow-covered trails.',
      advantage: 'Stunning snow views; fewer tourists.',
      precaution: 'Wear heavy winter gear; trails may be icy.',
    },
  ];

  return (
    <div className="seasons-container">
      <div className="seasons-banner">
        <div className="seasons-content">
          <img
            src={seasonalImages[seasons[activeSeason].name]}
            alt={`${seasons[activeSeason].name} effect`}
            className="seasons-image"
          />
          <div className="seasons-info">
            <h2 className="seasons-title">{seasons[activeSeason].name}</h2>
            <p className="seasons-description">{seasons[activeSeason].description}</p>
            <div className="seasons-details">
              <div className="seasons-detail">
                <strong>Advantage:</strong> {seasons[activeSeason].advantage}
              </div>
              <div className="seasons-detail">
                <strong>Precaution:</strong> {seasons[activeSeason].precaution}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="seasons-dots">
        {seasons.map((_, index) => (
          <button
            key={index}
            className={`seasons-dot ${activeSeason === index ? 'active' : ''}`}
            onClick={() => setActiveSeason(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Seasons;