import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PlaceCard = ({ name, description, location }) => (
  <div className="bg-white rounded-lg shadow-md p-6 h-full">
    <div className="w-full h-48 mb-4">
      <img 
        src="/api/placeholder/400/300" 
        alt={name}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-gray-600 mb-2">{location}</p>
    <p className="text-gray-700">{description}</p>
  </div>
);

const touristPlaces = {
  1: [
    { name: "Mount Everest", location: "Sagarmatha National Park", description: "World's highest peak offering spectacular trekking and climbing opportunities." },
    { name: "Kanchenjunga Base Camp", location: "Eastern Nepal", description: "Trek to the base of the world's third-highest peak." },
    { name: "Ilām", location: "Eastern Nepal", description: "Famous for its tea gardens and beautiful landscapes." },
    { name: "Biratnagar", location: "Province 1", description: "Major industrial and commercial hub with cultural attractions." },
    { name: "Pashupatinagar", location: "Ilam", description: "Border town known for shopping and tea estates." },
    { name: "Kakani", location: "Province 1", description: "Scenic viewpoint offering panoramic mountain views." },
    { name: "Phidim", location: "Panchthar", description: "Historical town with rich cultural heritage." },
    { name: "Dhankuta", location: "Province 1", description: "Hill station known for its diverse culture and climate." },
    { name: "Hile", location: "Dhankuta", description: "Beautiful hill station with mountain views." },
    { name: "Mangalbare", location: "Ilam", description: "Scenic town famous for organic tea production." },
  ],
  2: [
    { name: "Janakpur", location: "Madhesh Province", description: "Home to the famous Janaki Temple and rich cultural heritage." },
    { name: "Bardibas", location: "Mahottari", description: "Growing urban center with modern facilities." },
    { name: "Mahendranagar", location: "Dhanusha", description: "Historical town with cultural significance." },
    { name: "Simraungadh", location: "Bara", description: "Ancient capital with historical ruins." },
    { name: "Dhanusha", location: "Dhanushadham", description: "Important religious and cultural site." },
    { name: "Birgunj", location: "Parsa", description: "Major industrial and trading hub." },
    { name: "Sitaganj", location: "Sunsari", description: "Religious site marking Sita's birthplace." },
    { name: "Parsa", location: "Bharatpur", description: "Home to diverse wildlife and a national park." },
    { name: "Rautahat", location: "Bishrampur", description: "Historical region with cultural significance." },
    { name: "Lahan", location: "Siraha", description: "Emerging commercial center with cultural heritage." },
  ],
  3: [
    { name: "Kathmandu", location: "Bagmati Province", description: "Home to iconic sites like Swayambhunath and Pashupatinath." },
    { name: "Bhaktapur", location: "Bagmati Province", description: "Historic city known for Bhaktapur Durbar Square." },
    { name: "Patan", location: "Bagmati Province", description: "Famous for Patan Durbar Square and traditional arts." },
    { name: "Nagarkot", location: "Bagmati Province", description: "Viewpoint for stunning Himalayan panoramas." },
    { name: "Dhulikhel", location: "Bagmati Province", description: "Scenic town offering spectacular mountain views." },
    { name: "Chandragiri Hills", location: "Bagmati Province", description: "Hilltop destination with a cable car ride." },
    { name: "Kakani", location: "Bagmati Province", description: "Ideal for picnics and mountain views." },
    { name: "Sankhu", location: "Bagmati Province", description: "Historic town with cultural significance." },
    { name: "Phulchowki", location: "Bagmati Province", description: "Popular hiking trail with biodiversity." },
    { name: "Sindhupalchowk", location: "Bagmati Province", description: "Known for the Bhotekoshi River." },
  ],
  4: [
    { name: "Pokhara", location: "Gandaki Province", description: "Tourist hub with Phewa Lake and Sarangkot." },
    { name: "Ghandruk", location: "Gandaki Province", description: "Famous for Annapurna trekking." },
    { name: "Jomsom", location: "Gandaki Province", description: "Gateway to Mustang with stunning views." },
    { name: "Dhulikhel", location: "Gandaki Province", description: "Picturesque hill station." },
    { name: "Muktinath", location: "Gandaki Province", description: "Sacred pilgrimage site in Mustang." },
    { name: "Sarangkot", location: "Gandaki Province", description: "Popular for sunrise views." },
    { name: "Begnas Lake", location: "Gandaki Province", description: "Serene lake for boating and relaxation." },
    { name: "Rupa Lake", location: "Gandaki Province", description: "Peaceful lake with natural beauty." },
    { name: "Manang", location: "Gandaki Province", description: "Trekking paradise with stunning vistas." },
    { name: "Nagarjun", location: "Gandaki Province", description: "Offers great hiking trails." },
  ],
  5: [
    { name: "Lumbini", location: "Province No. 5", description: "Birthplace of Lord Buddha and a UNESCO World Heritage site." },
    { name: "Syangja", location: "Province No. 5", description: "Known for Khahare Lake and cultural sites." },
    { name: "Bardiya National Park", location: "Province No. 5", description: "Famous for diverse wildlife and jungle safaris." },
    { name: "Palpa", location: "Province No. 5", description: "Historical town with Tansen as a highlight." },
    { name: "Butwal", location: "Province No. 5", description: "Commercial city with a modern lifestyle." },
    { name: "Kapilvastu", location: "Province No. 5", description: "Historical region with significant sites." },
    { name: "Rupandehi", location: "Province No. 5", description: "Known for cultural heritage and trade." },
    { name: "Manigram", location: "Province No. 5", description: "Emerging tourist destination." },
    { name: "Bhairahawa", location: "Province No. 5", description: "Commercial hub near Lumbini." },
    { name: "Gorkha", location: "Province No. 5", description: "Famous for Gorkha Durbar." },
  ],
  6: [
    { name: "Rara Lake", location: "Karnali Province", description: "Largest lake in Nepal, known for its pristine beauty." },
    { name: "Jumla", location: "Karnali Province", description: "Known for its breathtaking landscapes." },
    { name: "Kalikot", location: "Karnali Province", description: "Famous for its historical and cultural heritage." },
    { name: "Dolpa", location: "Karnali Province", description: "Home to Shey Phoksundo National Park." },
    { name: "Surkhet", location: "Karnali Province", description: "Capital city with modern infrastructure." },
    { name: "Salyan", location: "Karnali Province", description: "Known for natural beauty and diverse wildlife." },
    { name: "Mugu", location: "Karnali Province", description: "Remote area offering trekking adventures." },
    { name: "Humla", location: "Karnali Province", description: "Culturally diverse and scenic trekking region." },
    { name: "Bajura", location: "Karnali Province", description: "Popular for hiking trails and natural beauty." },
    { name: "Dailekh", location: "Karnali Province", description: "Historical region with cultural significance." },
  ],
  7: [
    { name: "Dhangadhi", location: "Sudurpashchim Province", description: "Gateway to the Far-West and a modern city." },
    { name: "Mahakali River", location: "Sudurpashchim Province", description: "Popular for rafting and scenic beauty." },
    { name: "Bardiya National Park", location: "Sudurpashchim Province", description: "Known for wildlife diversity." },
    { name: "Kanchanpur", location: "Sudurpashchim Province", description: "Features Shuklaphanta National Park." },
    { name: "Dadeldhura", location: "Sudurpashchim Province", description: "Beautiful hill station with scenic views." },
    { name: "Doti", location: "Sudurpashchim Province", description: "Rich in historical and cultural heritage." },
    { name: "Baitadi", location: "Sudurpashchim Province", description: "Known for its ancient temples and landscapes." },
    { name: "Achham", location: "Sudurpashchim Province", description: "Famous for its natural beauty and trekking trails." },
    { name: "Far West Nepal", location: "Sudurpashchim Province", description: "Offers remote trekking opportunities." },
    { name: "Patan", location: "Sudurpashchim Province", description: "Historic town with unique architecture." },
  ],
};


const PlaceRecommendations = ({ provinceId }) => {
  const places = touristPlaces[provinceId] || [];

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6">Popular Tourist Destinations</h3>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        loop={true}
        className="w-full"
      >
        {places.map((place, index) => (
          <SwiperSlide key={index}>
            <PlaceCard {...place} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PlaceRecommendations;

