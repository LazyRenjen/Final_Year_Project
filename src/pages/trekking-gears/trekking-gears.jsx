import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Percent, Tag, BookOpen } from 'lucide-react';
import './trekking-gears.css';
import HikingBoots from './topGear/HikingBoots.jpg';
import TrekkingPoles from './topGear/TrekkingPoles.jpg';
import Backpack from './topGear/Backpack65L.jpg';
import SleepingBag from './topGear/SleepingBag.jpg';
import GPSWatch from './topGear/GPSWatch.jpg';
import WaterFilter from './topGear/WaterFilterBottle.jpg';
import ComboPackImage from './Combopack/combopacks.jpg';
import Footer from '../../components/Footer/footer';
const TrekkingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [combocurrentSlide, setComboCurrentSlide] = useState(0);

  const topGear = [
    { id: 1, name: 'Hiking Boots', price: '$199', rating: 4.8, image: HikingBoots },
    { id: 2, name: 'Trekking Poles', price: '$89', rating: 4.5, image: TrekkingPoles },
    { id: 3, name: 'Backpack 65L', price: '$249', rating: 4.9, image: Backpack },
    { id: 4, name: 'Sleeping Bag', price: '$179', rating: 4.7, image: SleepingBag },
    { id: 5, name: 'GPS Watch', price: '$299', rating: 4.6, image: GPSWatch },
    { id: 6, name: 'Water Filter', price: '$69', rating: 4.4, image: WaterFilter },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(topGear.length / 5));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(topGear.length / 5)) % Math.ceil(topGear.length / 5));
  };

  const comboNextSlide = () => {
    setComboCurrentSlide((prev) => (prev + 1) % Math.ceil(comboPacks.length / 3));
  };
  
  const comboPrevSlide = () => {
    setComboCurrentSlide((prev) => (prev - 1 + Math.ceil(comboPacks.length / 3)) % Math.ceil(comboPacks.length / 3));
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
  ];

  const comboPacks = [
    { id: 1, title: 'Trekking Essentials', description: 'Boots, Poles, Backpack', price: '$499', image: ComboPackImage },
    { id: 2, title: 'Camping Kit', description: 'Tent, Sleeping Bag, Water Filter', price: '$699', image: ComboPackImage },
    { id: 3, title: 'tent Kit', description: 'Tent, Sleeping Bag, Water Filter', price: '$299', image: ComboPackImage },
    { id: 4, title: 'Essential Kit', description: 'Tent, Sleeping Bag, Water Filter', price: '$99', image: ComboPackImage },
  ];

  const blogs = [
    { id: 1, title: '5 Best Trekking Trails in the World', author: 'John Doe', date: 'Jan 15, 2025' },
    { id: 2, title: 'Essential Trekking Gear Checklist', author: 'Jane Smith', date: 'Jan 20, 2025' },
    { id: 3, title: 'How to Plan a Multi-Day Trek', author: 'Emily Johnson', date: 'Jan 18, 2025' },
  ];

  return (
  <div>
    <div className="page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar__container">
          <div className="navbar__items">
            {navItems.map((section) => (
              <div key={section.title} className="navbar__item group">
                <button className="navbar__button">{section.title}</button>
                <div className="navbar__dropdown">
                  {section.items.map((item) => (
                    <a key={item} href="#" className="navbar__dropdown-item">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Top Gear Carousel */}
      <div className="carousel">
        <h2 className="carousel__title">Top Trekking Gear</h2>
        <div className="carousel__wrapper">
          <div className="carousel__items">
            {topGear.slice(currentSlide * 5, (currentSlide * 5) + 5).map((gear) => (
              <div key={gear.id} className="carousel__card">
                <div className="carousel__image-container">
                  <img src={gear.image} alt={gear.name} className="carousel__image" />
                </div>
                <div className="carousel__details">
                  <h3 className="carousel__gear-name">{gear.name}</h3>
                  <div className="carousel__info">
                    <span className="carousel__price">{gear.price}</span>
                    <span className="carousel__rating">
                      <Star className="carousel__icon" />
                      {gear.rating}
                    </span>
                  </div>
                </div>
                <div className="carousel__actions">
                  <button className="carousel__button">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel__nav carousel__nav--prev" onClick={prevSlide}>
            <ChevronLeft className="carousel__nav-icon" />
          </button>
          <button className="carousel__nav carousel__nav--next" onClick={nextSlide}>
            <ChevronRight className="carousel__nav-icon" />
          </button>
        </div>
      </div>

{/* Combo Pack Carousel */}
<div className="combo-pack">
  <h2 className="combo-pack__title">Exclusive Combo Packs</h2>
  <div className="combo-pack__wrapper">
    <div className="combo-pack__items">
      {comboPacks.slice(combocurrentSlide * 3, (combocurrentSlide * 3) + 3).map((combo) => (
        <div key={combo.id} className="combo-pack__card">
          <img src={combo.image} alt={combo.title} className="combo-pack__image" />
          <div className="combo-pack__details">
            <h3 className="combo-pack__title">{combo.title}</h3>
            <p className="combo-pack__description">{combo.description}</p>
            <span className="combo-pack__price">{combo.price}</span>
          </div>
          <button className="combo-pack__button">View Pack</button>
        </div>
      ))}
    </div>
    <button className="combo-pack__nav combo-pack__nav--prev" onClick={comboPrevSlide}>
      <ChevronLeft className="combo-pack__nav-icon" />
    </button>
    <button className="combo-pack__nav combo-pack__nav--next" onClick={comboNextSlide}>
      <ChevronRight className="combo-pack__nav-icon" />
    </button>
  </div>
</div>


      {/* Discounts */}
      <div className="discounts">
        <h2 className="discounts__title">Special Discounts</h2>
        <div className="discounts__wrapper">
          <div className="discounts__card">
            <Percent className="discounts__icon" />
            <h3>Up to 30% Off</h3>
            <p>On trekking shoes and boots</p>
          </div>
          <div className="discounts__card">
            <Tag className="discounts__icon" />
            <h3>Flat $50 Off</h3>
            <p>On orders above $500</p>
          </div>
        </div>
      </div>

      {/* Blogs */}
      <div className="blogs">
        <h2 className="blogs__title">Featured Blogs</h2>
        <div className="blogs__wrapper">
          {blogs.map((blog) => (
            <div key={blog.id} className="blogs__card">
              <BookOpen className="blogs__icon" />
              <h3 className="blogs__title">{blog.title}</h3>
              <p className="blogs__meta">By {blog.author} | {blog.date}</p>
            </div>
          ))}
        </div>
      </div>
 
      {/* Trekking Season */}
      <div className="seasons">
        <h2 className="seasons__title">Best Trekking Seasons</h2>
        <div className="seasons__grid">
          {['Spring', 'Summer', 'Autumn', 'Winter'].map((season) => (
            <div key={season} className="seasons__card">
              <div className="seasons__details">
                <h3 className="seasons__name">{season}</h3>
                <p className="seasons__description">
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
  <Footer />
    </div>
  );
};

export default TrekkingPage;
