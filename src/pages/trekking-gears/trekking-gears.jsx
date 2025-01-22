import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Mountain, Calendar, Star } from 'lucide-react';
import './trekking-gears.css';

const TrekkingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const topGear = [
    { id: 1, name: 'Hiking Boots', price: '$199', rating: 4.8, image: '/api/placeholder/300/200' },
    { id: 2, name: 'Trekking Poles', price: '$89', rating: 4.5, image: '/api/placeholder/300/200' },
    { id: 3, name: 'Backpack 65L', price: '$249', rating: 4.9, image: '/api/placeholder/300/200' },
    { id: 4, name: 'Sleeping Bag', price: '$179', rating: 4.7, image: '/api/placeholder/300/200' },
    { id: 5, name: 'GPS Watch', price: '$299', rating: 4.6, image: '/api/placeholder/300/200' },
    { id: 6, name: 'Water Filter', price: '$69', rating: 4.4, image: '/api/placeholder/300/200' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(topGear.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(topGear.length / 3)) % Math.ceil(topGear.length / 3));
  };

  const navItems = [
    {
      title: 'Men',
      items: ['Jackets', 'Pants', 'Boots', 'Backpacks', 'Accessories']
    },
    {
      title: 'Women',
      items: ['Jackets', 'Pants', 'Boots', 'Backpacks', 'Accessories']
    },
    {
      title: 'Activity',
      items: ['Hiking', 'Climbing', 'Camping', 'Alpine', 'Trail Running']
    },
    {
      title: 'Destinations',
      items: ['Everest Region', 'Annapurna', 'Langtang', 'Manaslu', 'Mustang']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              {navItems.map((section) => (
                <div key={section.title} className="relative group inline-block">
                  <button className="h-16 px-3 inline-flex items-center text-gray-700 hover:text-gray-900">
                    {section.title}
                  </button>
                  <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg z-50">
                    {section.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Top Gear Carousel */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Top Trekking Gear</h2>
        <div className="relative">
          <div className="flex space-x-6">
            {topGear.slice(currentSlide * 3, (currentSlide * 3) + 3).map((gear) => (
              <div key={gear.id} className="w-1/3 border rounded-lg shadow-md">
                <div>
                  <img src={gear.image} alt={gear.name} className="w-full h-48 object-cover rounded-t" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl mb-2">{gear.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{gear.price}</span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {gear.rating}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-2 rounded-full shadow-md"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Featured Treks */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Treks</h2>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((trek) => (
              <div key={trek} className="border rounded-lg shadow-md">
                <div>
                  <img src={`/api/placeholder/400/250`} alt={`Trek ${trek}`} className="w-full h-48 object-cover rounded-t" />
                </div>
                <div className="p-4">
                  <h3>Everest Base Camp Trek</h3>
                  <div className="mt-4 flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      14 Days
                    </span>
                    <span className="flex items-center">
                      <Mountain className="w-4 h-4 mr-1" />
                      5,364m
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Nepal
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trekking Season */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Best Trekking Seasons</h2>
          <div className="grid grid-cols-4 gap-6">
            {['Spring', 'Summer', 'Autumn', 'Winter'].map((season) => (
              <div key={season} className="border rounded-lg shadow-md">
                <div className="p-4">
                  <h3 className="text-lg font-bold">{season}</h3>
                  <p className="text-gray-600 mt-2">
                    {season === 'Autumn' ? 'Perfect trekking conditions with clear skies and moderate temperatures' :
                     season === 'Spring' ? 'Beautiful rhododendron blooms and stable weather' :
                     season === 'Summer' ? 'Monsoon season with occasional rain and lush landscapes' :
                     'Cold temperatures with snow-covered trails and fewer tourists'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekkingPage;
