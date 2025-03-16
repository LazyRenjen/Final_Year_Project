import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import './Slider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = ({ category }) => {
  const navigate = useNavigate();

  const places = [
    {
      name: 'Pokhara',
      image: './src/assets/images/top10/pokhara.jpg',
      info: 'Pokhara is known as the "City of Lakes" and is home to several lakes, including Phewa Lake, Begnas Lake, and Rupa Lake',
    },
    {
      name: 'Bandipur',
      image: './src/assets/images/top10/bandipur.jpg',
      info: 'Bandipur is a hilltop settlement in Tanahun District of Nepal and is situated on a hill overlooking the Marsyangdi River valley',
    },
    {
      name: 'Nagarkot',
      image: './src/assets/images/top10/nagarkot.jpg',
      info: 'Nagarkot is a village in central Nepal, at the rim of the Kathmandu Valley',
    },
    {
      name: 'Ghandruk',
      image: './src/assets/images/top10/ghandruk.jpg',
      info: 'Ghandruk is a popular place for treks in the Annapurna range of Nepal',
    },
    {
      name: 'Kathmandu',
      image: './src/assets/images/top10/kathmandu.jpeg',
      info: 'Kathmandu is the capital and largest city of Nepal',
    },
  ];

  const heritages = [
    {
      name: 'Bouddhanath',
      image: './src/assets/images/heritage/boudhanath.jpg',
      info: 'Swayambhunath is an ancient religious architecture atop a hill in the Kathmandu Valley',
    },
    {
      name: 'Pashupatinath',
      image: './src/assets/images/heritage/pasupatinath.jpg',
      info: 'Pashupatinath Temple is a famous and sacred Hindu temple complex that is located on the banks of the Bagmati River',
    },
    {
      name: 'Kathmandu Durbar Square',
      image: './src/assets/images/heritage/kathdurbar.jpg',
      info: 'Kathmandu Durbar Square is the plaza in front of the old royal palace of the Kathmandu Kingdom',
    },
    {
      name: 'Patan Durbar Square',
      image: './src/assets/images/heritage/patan-durbar-square.jpg',
      info: 'Patan Durbar Square is situated at the centre of the city of Lalitpur in Nepal',
    },
    {
      name: 'Bhaktapur Durbar Square',
      image: './src/assets/images/heritage/bhaktapur.jpg',
      info: 'Bhaktapur Durbar Square is the plaza in front of the royal palace of the old Bhaktapur Kingdom',
    },
  ];

  const lakes = [
    {
      name: 'Rara Lake',
      image: './src/assets/images/lakes/rara.jpg',
      info: 'Rara Lake is the biggest and deepest freshwater lake in the Nepal Himalayas',
    },
    {
      name: 'Tilicho Lake',
      image: './src/assets/images/lakes/tilicho.jpg',
      info: 'Tilicho Lake is a lake located in the Manang district of Nepal',
    },
    {
      name: 'Tsho Rolpa Lake',
      image: './src/assets/images/lakes/tsho.jpg',
      info: 'Tsho Rolpa is one of the biggest glacial lakes in Nepal',
    },
    {
      name: 'Gosainkunda Lake',
      image: './src/assets/images/lakes/gosainkunda.jpg',
      info: 'Gosainkunda is an alpine freshwater oligotrophic lake in Nepal',
    },
    {
      name: 'Phok sumdo Lake',
      image: './src/assets/images/lakes/gosainkunda.jpg',
      info: 'Phok sumdo is an alpine freshwater oligotrophic lake in Nepal',
    },
  ];

  const mountains = [ 
    {
      name: 'Mount Everest',
      image: './src/assets/images/Mountains/everest.jpg',
      info: 'Everest is the highest mountain in the world',
    },
    {
      name: 'Mount Kangchenjunga',
      image: './src/assets/images/Mountains/kangchenjunga.jpg',
      info: 'Kangchenjunga is the third highest mountain in the world',
    },
    {
      name: 'Mount Lhotse',
      image: './src/assets/images/Mountains/lhotse.jpg',
      info: 'Lhotse is the fourth highest mountain in the world',
    },
    {
      name: 'Mount Manaslu',
      image: './src/assets/images/lakes/manaslu.jpg',
      info: 'Manaslu is the eighth highest mountain in the world',
    },
    {
      name: 'Cho Oyu',
      image: './src/assets/images/Mountains/cho_oyu.jpg',
      info: 'Cho Oyu is the sixth highest mountain in the world',
    },
  ];

  const getCategoryData = () => {
    switch (category) {
      case 'top10':
        return places;
      case 'heritage':
        return heritages;
      case 'lakes':
        return lakes;
      case 'mountains':
        return mountains;
      default:
        return places;
    }
  };

  const data = getCategoryData();

  return (
    <div className="slider-wrapper">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop={true}
        className="card-wrapper"
      >
        {data.map((item) => (
          <SwiperSlide key={item.name}>
            <div className="card-container">
              <Card {...item} />
              <button 
                className="more-btn" 
                onClick={() => navigate(`/destination/${encodeURIComponent(item.name)}`)}
              >
                More
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
