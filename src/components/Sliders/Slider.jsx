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
      info: 'Known as the "City of Lakes", featuring Phewa Lake, Begnas Lake, and Rupa Lake. Gateway to Annapurna Circuit.'
    },
    {
      name: 'Kathmandu',
      image: 'https://images.squarespace-cdn.com/content/v1/55d729cfe4b00ab3960e7989/1443710118255-RX9W4BOH86CHF1WEUPVA/image-asset.jpeg',
      info: 'Capital city housing 7 UNESCO World Heritage Sites including Durbar Squares and sacred temples.'
    },
    {
      name: 'Lumbini',
      image: 'https://himalayan-masters.com/wp-content/uploads/2021/02/How-To-Get-From-Kathmandu-To-Lumbini-scaled-2.jpg',
      info: 'Birthplace of Lord Buddha and UNESCO World Heritage Site with ancient monasteries and Mayadevi Temple.'
    },
    {
      name: 'Chitwan National Park',
      image: 'https://chitwannationalpark.gov.np/images/2024/05/24/1.jpg',
      info: 'UNESCO-listed wildlife sanctuary famous for Bengal tigers and one-horned rhinos.'
    },
    {
      name: 'Everest Region',
      image: 'https://himalayanwindows.com/wp-content/uploads/2016/05/Namche-Bazaar.jpg',
      info: 'Home to Sagarmatha National Park (UNESCO) and iconic Everest Base Camp trek.'
    },
    {
      name: 'Annapurna Sanctuary',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Machapuchre-wow.jpg',
      info: 'Sacred glacial basin surrounded by Annapurna massif, popular for trekking.'
    },
    {
      name: 'Bandipur',
      image: 'https://lp-cms-production.imgix.net/2019-06/GettyImages-521074945_high.jpg',
      info: 'Preserved hilltop town with Newari architecture and panoramic Himalayan views.'
    },
    {
      name: 'Nagarkot',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/40/02/28/nagarkot.jpg?w=1100&h=1100&s=1',
      info: 'Mountain viewpoint offering sunrise vistas across Himalayas including Everest.'
    },
    {
      name: 'Upper Mustang',
      image: 'https://www.nepalsanctuarytreks.com/wp-content/uploads/2022/09/IMG20220603113038-scaled-e1655199373930-1280x600-1.jpg',
      info: 'Restricted trans-Himalayan region preserving Tibetan Buddhist culture.'
    },
    {
      name: 'Rara Lake',
      image: 'https://www.coretreks.com/wp-content/uploads/2024/07/rara-lake-trekking-in-nepal-1577089752.jpg',
      info: 'Largest lake in Nepal located in remote northwestern wilderness area.'
    }
  ];
  
  const heritages = [
    {
      name: 'Kathmandu Durbar Square',
      image: 'https://lh3.googleusercontent.com/p/AF1QipN_hWdqAyQSObA_nbuYo6-oe7Y84tQqekseZ_Xk=s1360-w1360-h1020',
      info: 'Historic royal complex with Hanuman Dhoka Palace and Kumari Ghar.'
    },
    {
      name: 'Patan Durbar Square',
      image: 'https://www.nepaltraveladventure.com/blog/wp-content/uploads/2020/03/patan-durbar-square.jpg',
      info: 'Architectural marvel with Krishna Mandir and golden courtyard temples.'
    },
    {
      name: 'Bhaktapur Durbar Square',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRte0KOTroqH_t_u-ZzFYlOpf6DNdOpokVqhw&s',
      info: 'Medieval square featuring 55-Window Palace and Vatsala Temple.'
    },
    {
      name: 'Swayambhunath Stupa',
      image: 'https://www.himalayan-dreams.com/media/k2/items/cache/29766e2a37e979b18d18c428ff9c5aba_L.jpg',
      info: 'Ancient hilltop stupa complex known as Monkey Temple with panoramic views.'
    },
    {
      name: 'Boudhanath Stupa',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXqPLgbl7LrSGB3Gx6GQ-8qFSo48k40TiXmw&s',
      info: 'One of world\'s largest stupas and center of Tibetan Buddhism in Nepal.'
    },
    {
      name: 'Pashupatinath Temple',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4QD4ul7qoKCVaKI0gZ0d-gNUfgglSvpjpxA&s',
      info: 'Sacred Hindu temple complex on Bagmati River with cremation ghats.'
    },
    {
      name: 'Changu Narayan Temple',
      image: 'https://english.khabarhub.com/wp-content/uploads/2023/02/Changu_Narayan_Travoal.webp',
      info: 'Oldest Vishnu temple in Kathmandu Valley with Licchavi-era inscriptions.'
    },
    {
      name: 'Lumbini',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcSHwKOkzzADeCItN3SonVZ6r33R02i3b12Q&s',
      info: 'Birthplace of Buddha featuring Ashoka Pillar and sacred garden.'
    },
    {
      name: 'Chitwan National Park',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGp1CBVKs0kIsTqPCSSYFHKI6GcH-_HyDeWA&s',
      info: 'First national park in Nepal protecting diverse Terai ecosystem.'
    },
    {
      name: 'Sagarmatha National Park',
      image: 'https://lh3.googleusercontent.com/p/AF1QipO81-Ps96bxcSRTzxNRhv7aEXiME-20DmFMK4hQ=s1360-w1360-h1020',
      info: 'Contains Everest and unique Sherpa culture in high Himalayan ecosystem.'
    }
  ];
  
  const lakes = [
    {
      name: 'Phewa Lake',
      image: 'https://adventuretrekkingtour.com/wp-content/uploads/2019/04/Sarankot-Phewa-lake-hiking.jpg',
      info: 'Second largest lake with Tal Barahi Temple and reflections of Machhapuchhre.'
    },
    {
      name: 'Begnas Lake',
      image: 'https://media1.thrillophilia.com/filestore/msivunnby4g44kuue9u0nuooqed7_d039dec41003797faf3d424555bb069f.jpg?w=400&dpr=2',
      info: 'Serene lake less crowded than Phewa, popular for fishing and boating.'
    },
    {
      name: 'Rupa Lake',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW8ZYbZBxp0A68JOjXhXwhVs-4Vr5QD8PlBA&s',
      info: 'Third largest lake in Pokhara valley with rich biodiversity.'
    },
    {
      name: 'Dipang Lake',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Rishav_Adhikari_Begnastal_4.jpg/4032px-Mapcarta.jpg',
      info: 'Important wetland habitat near Lekhnath supporting migratory birds.'
    },
    {
      name: 'Khaste Lake',
      image: 'https://www.trodly.com/pictures/attraction/x6106.jpg.pagespeed.ic.51szgllK39.jpg',
      info: 'Small lake in Pokhara valley surrounded by agricultural fields.'
    },
    {
      name: 'Rara Lake',
      image: 'https://www.adventurehimalayacircuit.com/files/groups/Rara%20Lake%20Trekking.jpg',
      info: 'Largest freshwater lake in Nepal at 2,990m elevation in Karnali Province.'
    },
    {
      name: 'Gokyo Lakes',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Gokyo_Ri_summit%2C_Gokyo_Lake%2C_Nepal%2C_Himalayas.jpg',
      info: 'High-altitude oligotrophic lake system in Everest region at 4,700-5,000m.'
    },
    {
      name: 'Mai Pokhari Lake',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Mai_pokhari_ilam_10.jpg/1200px-Mai_pokhari_ilam_10.jpg',
      info: 'Ramsar wetland site with nine corners, sacred to both Hindus and Buddhists.'
    },
    {
      name: 'Gosaikunda Lake',
      image: 'https://media.sublimetrails.com/uploads/img/gosaikunda-lake-pic.webp',
      info: 'Alpine lake at 4,380m, pilgrimage site during Janai Purnima festival.'
    },
    {
      name: 'Khaptad Daha',
      image: 'https://nepaltraveller.com/laravel-filemanager/photos/70/hike/1200px-Khaptad_Lake_-_Khaptad_National_Park,_Nepal.jpg',
      info: 'Group of shallow lakes in Khaptad National Park at 3,000m elevation.'
    }
  ];
  
  const mountains = [
    {
      name: 'Mount Everest',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfQL9_MxujjxRHQFXlDl1hlJ83RimleTK8iQ&s',
      info: 'World\'s highest peak at 8,848.86m, known as Sagarmatha in Nepali.'
    },
    {
      name: 'Annapurna Range',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Nu8dSYugktPro4CmjqdZCGcwrsukLePArg&s',
      info: 'Mountain massif containing one 8,000m peak and thirteen 7,000m peaks.'
    },
    {
      name: 'Dhaulagiri',
      image: 'https://i0.wp.com/bootsandcrampons.com/wp-content/uploads/2022/09/Dhaulagiri_FengWei_GettyImages_2-56cb375e3df78cfb379b6069.webp?fit=768%2C512&ssl=1',
      info: 'Seventh highest mountain in world at 8,167m, "White Mountain" in Sanskrit.'
    },
    {
      name: 'Manaslu',
      image: 'https://images.squarespace-cdn.com/content/v1/55d729cfe4b00ab3960e7989/1627675926988-UN23AD3T83YCQH2C9SUB/10330744993_1f455cd8f0_4k.jpg',
      info: 'Eighth highest peak at 8,163m, "Mountain of the Spirit" in Sanskrit.'
    },
    {
      name: 'Machhapuchhre',
      image: 'https://res.cloudinary.com/images-swotahtravel-com/image/upload/v1700457782/blog%20images/fishtail_mountain_Machapuchare_2.jpg',
      info: 'Sacred unclimbed peak (6,993m) with distinctive fishtail shape.'
    },
    {
      name: 'Langtang Lirung',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR71WEuqzu0QTHPBYziCYqUjesNOuVgl7STjQ&s',
      info: 'Dominant peak (7,227m) in Langtang region near Tibetan border.'
    },
    {
      name: 'Kanchenjunga',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Kangchenjunga%2C_India.jpg/800px-Kangchenjunga%2C_India.jpg',
      info: 'World\'s third highest peak (8,586m) on Nepal-India border.'
    },
    {
      name: 'Lhotse',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3gH289x1PrFBF8sDr8WUngRzPFIxmOlkMHQ&s',
      info: 'Fourth highest mountain (8,516m) connected to Everest via South Col.'
    },
    {
      name: 'Makalu',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrOOkCQcjB8qs8EScdGvzTUgjSZA7R1ojCew&s',
      info: 'Fifth highest peak (8,485m) known for its pyramid shape.'
    },
    {
      name: 'Cho Oyu',
      image: 'https://images.squarespace-cdn.com/content/v1/55d729cfe4b00ab3960e7989/5479f156-685f-4696-a8c5-c721352cca4a/18513591589_a2bb2c898f_k.jpg',
      info: 'Sixth highest mountain (8,188m) considered "easiest" 8,000er.'
    }
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
