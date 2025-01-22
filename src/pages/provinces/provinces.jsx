import React, { useState } from 'react';
import './Provinces.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Province1places from './Province1/Province1places';

const Provinces = () => {
  const [activeProvince, setActiveProvince] = useState(0);

  const provinces = [
    {
      id: 1,
      name: "Koshi Province",
      capital: "Biratnagar",
      area: "25,905 km²",
      population: "4.5 million",
      districts: 14,
      description: "Koshi Province, formerly Province No. 1, is home to Mount Everest and diverse ethnic communities. Known for its tea gardens, wildlife reserves, and the Koshi River.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d906168.5676571!2d86.86923475!3d27.427089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e854a215bd9ebd%3A0x4e19b3518bf0c2e3!2sKoshi%20Province!5e0!3m2!1sen!2snp!4v1637089876543"
    },
    {
      id: 2,
      name: "Madhesh Province",
      capital: "Janakpur",
      area: "9,661 km²",
      population: "5.4 million",
      districts: 8,
      description: "Madhesh Province is known for its rich cultural heritage, including the birthplace of Sita - Janakpur. The region is characterized by fertile plains and agricultural abundance.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d460915.54266!2d85.923476!3d26.927089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec4e!1s0x39ec4e!5e0!3m2!1sen!2snp!4v1637089876543"
    },
    {
      id: 3,
      name: "Bagmati Province",
      capital: "Hetauda",
      area: "20,300 km²",
      population: "5.5 million",
      districts: 13,
      description: "Bagmati Province includes Kathmandu Valley, the nation's capital. Rich in cultural heritage sites, temples, and modern urban development, it's Nepal's most developed province.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448915.54266!2d85.323476!3d27.727089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb!1s0x39eb!5e0!3m2!1sen!2snp!4v1637089876543"
    },
    {
      id: 4,
      name: "Gandaki Province",
      capital: "Pokhara",
      area: "21,504 km²",
      population: "2.4 million",
      districts: 11,
      description: "Gandaki Province is famous for the Annapurna mountain range and tourist hub Pokhara. Features stunning lakes, diverse geography from hills to mountains, and rich cultural heritage.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448915.54266!2d83.323476!3d28.727089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399!1s0x399!5e0!3m2!1sen!2snp!4v1637089876543"
    },
    {
      id: 5,
      name: "Lumbini Province",
      capital: "Deukhuri",
      area: "22,288 km²",
      population: "4.5 million",
      districts: 12,
      description: "Lumbini Province, birthplace of Buddha, is a major pilgrimage site. Known for its historical importance, religious sites, and diverse culture spanning from plains to hills.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448915.54266!2d82.323476!3d27.727089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399!1s0x399!5e0!3m2!1sen!2snp!4v1637089876543"
    },
    {
      id: 6,
      name: "Karnali Province",
      capital: "Birendranagar",
      area: "27,984 km²",
      population: "1.5 million",
      districts: 10,
      description: "Karnali Province is Nepal's largest province by area. Known for pristine nature, remote landscapes, and unique cultural practices. Home to Rara Lake and diverse wildlife.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448915.54266!2d81.323476!3d29.727089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399!1s0x399!5e0!3m2!1sen!2snp!4v1637089876543"
    },
    {
      id: 7,
      name: "Sudurpashchim Province",
      capital: "Godawari",
      area: "19,539 km²",
      population: "2.5 million",
      districts: 9,
      description: "Sudurpashchim Province features diverse geography from Terai plains to high Himalayas. Home to Khaptad National Park and rich in cultural heritage of far-western Nepal.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448915.54266!2d80.323476!3d29.727089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399!1s0x399!5e0!3m2!1sen!2snp!4v1637089876543"
    }
  ];

  const handlePrevProvince = () => {
    setActiveProvince((prev) => (prev === 0 ? provinces.length - 1 : prev - 1));
  };

  const handleNextProvince = () => {
    setActiveProvince((prev) => (prev === provinces.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="provinces-container">
      <h1 className="provinces-title">Provinces of Nepal</h1>
      <div className="provinces-nav">
        {provinces.map((province, index) => (
          <button
            key={province.id}
            className={`province-nav-item ${activeProvince === index ? 'active' : ''}`}
            onClick={() => setActiveProvince(index)}
          >
            {province.name}
          </button>
        ))}
      </div>

      <div className="province-navigation">
        <button onClick={handlePrevProvince} className="nav-btn">
          Previous
        </button>
        <button onClick={handleNextProvince} className="nav-btn">
          Next
        </button>
      </div>

      <div className="province-content">
        <div className="province-info">
          <h2>{provinces[activeProvince].name}</h2>
          <div className="province-details">
            <div className="info-item">
              <span className="label">Capital:</span>
              <span className="value">{provinces[activeProvince].capital}</span>
            </div>
            <div className="info-item">
              <span className="label">Area:</span>
              <span className="value">{provinces[activeProvince].area}</span>
            </div>
            <div className="info-item">
              <span className="label">Population:</span>
              <span className="value">{provinces[activeProvince].population}</span>
            </div>
            <div className="info-item">
              <span className="label">Districts:</span>
              <span className="value">{provinces[activeProvince].districts}</span>
            </div>
          </div>
          <p className="province-description">{provinces[activeProvince].description}</p>
        </div>
        <div className="map-container">
          <iframe
            src={provinces[activeProvince].mapUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${provinces[activeProvince].name}`}
          />
        </div>
      </div>
      {activeProvince === 0 && <Province1places />}
    </div>
  );
};

export default Provinces;