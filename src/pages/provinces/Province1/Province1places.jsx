import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import "./Provinces1Places.css";
import CarouselImage from "./everest.jpg";

const Province1Places = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const places = [
    {
      name: 'Mount Everest',
      description: "The world's highest peak and ultimate mountaineering challenge, standing at 8,848.86 meters.",
      detail: "Mount Everest, known as Sagarmatha in Nepali, is part of the Himalayan mountain range. The mountain's geology consists of sedimentary and metamorphic rocks shaped by tectonic forces. The Everest region is home to the Sherpa people, renowned for their mountaineering skills and rich Buddhist culture.",
      description2: [
        {
          title: "Historical Facts",
          details: [
            {
              subtitle: "First Ascent",
              text: "First successfully climbed by Sir Edmund Hillary and Tenzing Norgay Sherpa in 1953"
            },
            {
              subtitle: "Geological Formation",
              text: "Formed about 60 million years ago during the collision of Indian and Eurasian tectonic plates"
            }
          ]
        },
        {
          title: "Modern Significance",
          details: [
            {
              subtitle: "Tourism Economy",
              text: "Generates significant revenue through climbing permits and trekking tourism"
            },
            {
              subtitle: "Climate Research",
              text: "Important site for studying climate change impacts on glaciers"
            }
          ]
        }
      ],
      highlights: [
        "Everest Base Camp Trek",
        "Khumbu Icefall",
        "Sherpa Cultural Museum"
      ],
      image: CarouselImage,
      bestTimeToVisit: 'March-May & September-November',
      travelTips: [
        "Acclimatize properly to prevent altitude sickness",
        "Hire licensed guides and porters",
        "Obtain necessary permits"
      ]
    },
    {
      name: 'Kanchenjunga Conservation Area',
      description: "Home to the world's third-highest peak and rich biodiversity in eastern Nepal.",
      detail: "The Kanchenjunga Conservation Area spans 2,035 sq km and ranges from 1,200m to 8,586m elevation. It protects endangered species like snow leopards and red pandas while supporting indigenous Limbu communities.",
      description2: [
        {
          title: "Historical Facts",
          details: [
            {
              subtitle: "Sacred Mountain",
              text: "Considered sacred in local Limbu tradition for centuries"
            },
            {
              subtitle: "Exploration History",
              text: "First surveyed by British explorers in 1848"
            }
          ]
        },
        {
          title: "Modern Significance",
          details: [
            {
              subtitle: "Conservation Efforts",
              text: "UNESCO World Heritage Site since 1997"
            },
            {
              subtitle: "Community Tourism",
              text: "Model for community-managed conservation and tourism"
            }
          ]
        }
      ],
      highlights: [
        "Kanchenjunga Base Camp",
        "Limbu Cultural Heritage",
        "Yalung Glacier"
      ],
      image: CarouselImage,
      bestTimeToVisit: 'October-November',
      travelTips: [
        "Requires restricted area permit",
        "Follow strict eco-tourism guidelines",
        "Respect local customs"
      ]
    },
    {
      name: 'Makalu Barun National Park',
      description: "Protected area featuring the world's fifth-highest mountain and unique ecosystems.",
      detail: "Established in 1992, this park covers 1,500 sq km and ranges from 435m to 8,485m elevation. It contains over 3,000 species of flowering plants and rare wildlife including the clouded leopard.",
      description2: [
        {
          title: "Historical Facts",
          details: [
            {
              subtitle: "First Exploration",
              text: "First climbed by French expedition in 1955"
            },
            {
              subtitle: "Indigenous Heritage",
              text: "Home to Rai and Sherpa communities for centuries"
            }
          ]
        },
        {
          title: "Modern Significance",
          details: [
            {
              subtitle: "Biodiversity Hotspot",
              text: "Contains 25% of Nepal's total plant species"
            },
            {
              subtitle: "Research Center",
              text: "Important site for ecological studies"
            }
          ]
        }
      ],
      highlights: [
        "Makalu Base Camp Trek",
        "Arun Valley",
        "Rare Orchid Species"
      ],
      image: CarouselImage,
      bestTimeToVisit: 'April-May & October-November',
      travelTips: [
        "Obtain special permits",
        "Hire local guides",
        "Carry camping equipment"
      ]
    },
    {
      name: 'Ilam Tea Gardens',
      description: "Scenic tea plantations producing Nepal's finest orthodox teas.",
      detail: "Located at 1,200-1,900m altitude, Ilam's tea estates have operated since 1863. The region produces distinctive black, green, and white teas using traditional methods.",
      description2: [
        {
          title: "Historical Facts",
          details: [
            {
              subtitle: "Colonial Roots",
              text: "Established during British colonial influence in South Asia"
            },
            {
              subtitle: "Trade History",
              text: "Part of ancient Silk Road trade routes"
            }
          ]
        },
        {
          title: "Modern Significance",
          details: [
            {
              subtitle: "Economic Driver",
              text: "Produces 90% of Nepal's total tea exports"
            },
            {
              subtitle: "Agro-Tourism",
              text: "Popular destination for tea tourism experiences"
            }
          ]
        }
      ],
      highlights: [
        "Tea Factory Tours",
        "Mai Pokhari Lake",
        "Antu Danda Sunrise"
      ],
      image: CarouselImage,
      bestTimeToVisit: 'March-May & September-November',
      travelTips: [
        "Try fresh tea plucking",
        "Visit during spring bloom",
        "Carry rain gear"
      ]
    },
    {
      name: 'Pathivara Temple',
      description: "Sacred Hindu shrine offering panoramic Himalayan views.",
      detail: "Situated at 3,794m altitude, this temple dedicated to Goddess Pathivara attracts pilgrims from Nepal and India. The site offers views of Kanchenjunga and Everest ranges.",
      description2: [
        {
          title: "Historical Facts",
          details: [
            {
              subtitle: "Mythological Origin",
              text: "Believed to be mentioned in ancient Hindu scriptures"
            },
            {
              subtitle: "Construction",
              text: "Current structure built in 18th century"
            }
          ]
        },
        {
          title: "Modern Significance",
          details: [
            {
              subtitle: "Pilgrimage Tourism",
              text: "Receives over 100,000 annual visitors"
            },
            {
              subtitle: "Cultural Symbol",
              text: "Important site for Nepali Hindu identity"
            }
          ]
        }
      ],
      highlights: [
        "Panoramic Mountain Views",
        "Annual Pathivara Festival",
        "Traditional Animal Sacrifice Rituals"
      ],
      image: CarouselImage,
      bestTimeToVisit: 'March-June & September-November',
      travelTips: [
        "Dress modestly",
        "Acclimatize properly",
        "Respect religious customs"
      ]
    },
    {
      name: 'Bhedetar',
      description: "Hill station known for its cool climate and sunrise views.",
      detail: "Located at 1,420m altitude, Bhedetar serves as gateway to eastern Nepal. Offers views of Himalayan ranges and confluence of Sun Koshi and Tamor rivers.",
      description2: [
        {
          title: "Historical Facts",
          details: [
            {
              subtitle: "Trade Route",
              text: "Part of ancient Trans-Himalayan trade network"
            },
            {
              subtitle: "British Era",
              text: "Developed as hill station during Rana regime"
            }
          ]
        },
        {
          title: "Modern Significance",
          details: [
            {
              subtitle: "Adventure Tourism",
              text: "Popular for paragliding and hiking"
            },
            {
              subtitle: "Climate Refuge",
              text: "Cool retreat from Terai heat"
            }
          ]
        }
      ],
      highlights: [
        "Sunrise View Tower",
        "Dantakali Temple",
        "Dharan Day Trip"
      ],
      image: CarouselImage,
      bestTimeToVisit: 'Year-round',
      travelTips: [
        "Carry warm clothing",
        "Try local Tongba drink",
        "Combine with Dharan visit"
      ]
    },
    {
      name: 'Koshi Tappu Wildlife Reserve',
      description: "Important wetland habitat for migratory birds and wild water buffalo.",
      detail: "Established in 1976, this 175 sq km reserve protects Nepal's last population of wild arna (water buffalo). Ramsar wetland site since 1987.",
      description2: [
        {
          title: "Historical Facts",
          details: [
            {
              subtitle: "Ecological History",
              text: "Formed by Koshi River sedimentation over millennia"
            },
            {
              subtitle: "Traditional Use",
              text: "Historical grazing lands for local communities"
            }
          ]
        },
        {
          title: "Modern Significance",
          details: [
            {
              subtitle: "Birdwatching Hub",
              text: "Hosts over 500 bird species including endangered species"
            },
            {
              subtitle: "Conservation Challenges",
              text: "Balancing wildlife protection with local livelihoods"
            }
          ]
        }
      ],
      highlights: [
        "Wild Water Buffalo",
        "Birdwatching Towers",
        "River Safari"
      ],
      image: CarouselImage,
      bestTimeToVisit: 'October-March',
      travelTips: [
        "Bring binoculars",
        "Hire experienced guides",
        "Follow park regulations"
      ]
    },
    {
      name: 'Halesi Mahadev Temple',
      description: "Sacred cave temple worshipped by Hindus and Buddhists.",
      detail: "Known as 'Pashupatinath of the East', this limestone cave complex features natural Shiva lingam formation. Important pilgrimage site for both Hindus and Buddhists.",
      description2: [
        {
          title: "Historical Facts",
          details: [
            {
              subtitle: "Ancient Origins",
              text: "Mentioned in 8th century Buddhist texts"
            },
            {
              subtitle: "Medieval Period",
              text: "Developed as pilgrimage site during Malla dynasty"
            }
          ]
        },
        {
          title: "Modern Significance",
          details: [
            {
              subtitle: "Interfaith Harmony",
              text: "Shared sacred space for multiple religions"
            },
            {
              subtitle: "Tourism Development",
              text: "New access roads and facilities built in 2020s"
            }
          ]
        }
      ],
      highlights: [
        "Natural Cave Formations",
        "Maha Shivaratri Festival",
        "Buddhist Meditation Caves"
      ],
      image: CarouselImage,
      bestTimeToVisit: 'February-March & October-November',
      travelTips: [
        "Wear sturdy shoes",
        "Respect prayer rituals",
        "Combine with Maratika visit"
      ]
    },
    {
      name: 'Namche Bazaar',
      description: "Historic trading hub and gateway to Everest region.",
      detail: "Situated at 3,440m, this Sherpa town serves as acclimatization stop for Everest treks. Features traditional architecture and modern amenities.",
      description2: [
        {
          title: "Historical Facts",
          details: [
            {
              subtitle: "Trade History",
              text: "Historical salt-grain trading center since 16th century"
            },
            {
              subtitle: "Mountaineering Era",
              text: "Developed as trekking hub post-1950s"
            }
          ]
        },
        {
          title: "Modern Significance",
          details: [
            {
              subtitle: "Tourism Infrastructure",
              text: "Has ATMs, cafes, and mountain gear shops"
            },
            {
              subtitle: "Cultural Preservation",
              text: "Sherpa Culture Museum established in 2005"
            }
          ]
        }
      ],
      highlights: [
        "Saturday Market",
        "Everest View Hotel",
        "Syangboche Airstrip"
      ],
      image: CarouselImage,
      bestTimeToVisit: 'March-May & September-November',
      travelTips: [
        "Acclimatize properly",
        "Buy last-minute gear here",
        "Visit Sherpa Museum"
      ]
    },
    {
      name: 'Sagarmatha National Park',
      description: "UNESCO World Heritage Site protecting Everest's unique ecosystem.",
      detail: "Established in 1976, covers 1,148 sq km of Himalayan landscape. Protects endangered species like snow leopard and red panda along with Sherpa cultural heritage.",
      description2: [
        {
          title: "Historical Facts",
          details: [
            {
              subtitle: "UNESCO Recognition",
              text: "Designated World Heritage Site in 1979"
            },
            {
              subtitle: "Geological Features",
              text: "Contains deep gorges and glaciers formed over 2 million years"
            }
          ]
        },
        {
          title: "Modern Significance",
          details: [
            {
              subtitle: "Climate Monitoring",
              text: "Key site for glacial retreat studies"
            },
            {
              subtitle: "Sustainable Tourism",
              text: "Model for community-based conservation"
            }
          ]
        }
      ],
      highlights: [
        "Gokyo Lakes",
        "Thyangboche Monastery",
        "Ngozumpa Glacier"
      ],
      image: CarouselImage,
      bestTimeToVisit: 'April-May & October-November',
      travelTips: [
        "Carry park entry permit",
        "Follow waste disposal rules",
        "Stay on marked trails"
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
      <h2 className="province-section-title">Explore Koshi Province: Himalayan Wonders</h2>
      
      {/* Carousel */}
      <div className="place-carousel-wrapper">
        <div className="place-carousel-container">
          <img 
            src={places[currentSlide].image} 
            alt={places[currentSlide].name} 
            className="place-carousel-image"
          />
          
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

export default Province1Places;