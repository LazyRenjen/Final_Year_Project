import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MountainTrails.css";

const MountainTrails = () => {
  const trails = [
    {
      id: 1,
      name: "Everest Base Camp Trek",
      difficulty: "Difficult",
      cost: "$1500 - $3000",
      duration: "12-14 Days",
      description:
        "The Everest Base Camp Trek offers stunning views of Mount Everest and surrounding peaks. It passes through Sherpa villages and monasteries, providing a cultural experience.",
    },
    {
      id: 2,
      name: "Annapurna Circuit Trek",
      difficulty: "Moderate to Difficult",
      cost: "$1000 - $2500",
      duration: "14-18 Days",
      description:
        "A diverse trail passing through lush forests, arid landscapes, and cultural villages. It offers views of the Annapurna and Dhaulagiri ranges.",
    },
    {
      id: 3,
      name: "Langtang Valley Trek",
      difficulty: "Moderate",
      cost: "$800 - $1500",
      duration: "7-10 Days",
      description:
        "Explore the Langtang Valley, known for its glaciers, alpine scenery, and Tamang culture. A relatively short trek with rewarding views.",
    },
    {
      id: 4,
      name: "Manaslu Circuit Trek",
      difficulty: "Difficult",
      cost: "$1200 - $2500",
      duration: "14-18 Days",
      description:
        "The Manaslu Circuit Trek offers remote trails, lush valleys, and high mountain passes. It requires a special permit for entry.",
    },
    {
      id: 5,
      name: "Ghorepani Poon Hill Trek",
      difficulty: "Easy to Moderate",
      cost: "$500 - $1000",
      duration: "5-7 Days",
      description:
        "A short and easy trek offering panoramic sunrise views of the Annapurna and Dhaulagiri ranges from Poon Hill.",
    },
  ];

  return (
    <div className="mountain-trails-container" style={{ padding: "20px" }}>
      <h1 className="text-center mb-4">Mountain Trails of Nepal</h1>
      <Carousel>
        {trails.map((trail) => (
          <Carousel.Item key={trail.id}>
            <img
              className="d-block w-100"
              src={trail.image}
              alt={trail.name}
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                <h3>{trail.name}</h3>
                <p><strong>Difficulty:</strong> {trail.difficulty}</p>
                <p><strong>Cost:</strong> {trail.cost}</p>
                <p><strong>Duration:</strong> {trail.duration}</p>
                <p>{trail.description}</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MountainTrails;
