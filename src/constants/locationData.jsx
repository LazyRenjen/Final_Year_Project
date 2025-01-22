import pokharaImg from '../assets/images/top10/pokhara.jpg';
import bandipurImg from '../assets/images/top10/bandipur.jpg';
import nagarkotImg from '../assets/images/top10/nagarkot.jpg';
import ghandrukImg from '../assets/images/top10/ghandruk.jpg';
import kathmanduImg from '../assets/images/top10/kathmandu.jpeg';
import bouddhanathImg from '../assets/images/heritage/boudhanath.jpg';
import pashupatinathImg from '../assets/images/heritage/pasupatinath.jpg';
import kathmanduDurbarSquareImg from '../assets/images/heritage/kathdurbar.jpg';
import patanDurbarSquareImg from '../assets/images/heritage/patan.jpg';
import bhaktapurDurbarSquareImg from '../assets/images/heritage/bhaktapur.jpg';
import raraLakeImg from '../assets/images/lakes/rara.jpg';
import tilichoLakeImg from '../assets/images/lakes/tilicho.jpg';
import tshoRolpaLakeImg from '../assets/images/lakes/tsho.jpg';
import gosainkundaLakeImg from '../assets/images/lakes/gosainkunda.jpg';
import mountEverestImg from '../assets/images/Mountains/everest.jpg';
import mountKangchenjungaImg from '../assets/images/Mountains/kangchenjunga.jpg';
import mountLhotseImg from '../assets/images/Mountains/lhotse.jpg';
import mountManasluImg from '../assets/images/Mountains/manaslu.jpg';
import mountChoOyuImg from '../assets/images/Mountains/cho_oyu.jpg';

export const CATEGORIES = {
  TOP_10: 'top10',
  HERITAGE: 'heritage',
  LAKES: 'lakes',
  MOUNTAINS: 'mountains'
};

export const LOCATIONS_DATA = {
  [CATEGORIES.TOP_10]: {
    title: 'Top 10 Places',
    items: [
      {
        id: 'pokhara',
        name: 'Pokhara',
        imagePath: pokharaImg, // Use imported image
        info: 'Pokhara is known as the "City of Lakes" and is home to several lakes, including Phewa Lake, Begnas Lake, and Rupa Lake',
      },
      {
        id: 'bandipur',
        name: 'Bandipur',
        imagePath: bandipurImg, // Use imported image
        info: 'Bandipur is a hilltop settlement in Tanahun District of Nepal and is situated on a hill overlooking the Marsyangdi River valley',
      },
      {
        id: 'nagarkot',
        name: 'Nagarkot',
        imagePath: nagarkotImg, // Use imported image
        info: 'Nagarkot is a village in central Nepal, at the rim of the Kathmandu Valley',
      },
      {
        id: 'ghandruk',
        name: 'Ghandruk',
        imagePath: ghandrukImg, // Use imported image
        info: 'Ghandruk is a popular place for treks in the Annapurna range of Nepal',
      },
      {
        id: 'kathmandu',
        name: 'Kathmandu',
        imagePath: kathmanduImg, // Use imported image
        info: 'Kathmandu is the capital and largest city of Nepal',
      },
    ]
  },
  [CATEGORIES.HERITAGE]: {
    title: 'Heritage Sites',
    items: [
      {
        id: 'bouddhanath',
        name: 'Bouddhanath',
        imagePath: bouddhanathImg, // Use imported image
        info: 'Swayambhunath is an ancient religious architecture atop a hill in the Kathmandu Valley',
      },
      {
        id: 'pashupatinath',
        name: 'Pashupatinath',
        imagePath: pashupatinathImg, // Use imported image
        info: 'Pashupatinath Temple is a famous and sacred Hindu temple complex that is located on the banks of the Bagmati River',
      },
      {
        id: 'kathmanduDurbarSquare',
        name: 'Kathmandu Durbar Square',
        imagePath: kathmanduDurbarSquareImg, // Use imported image
        info: 'Kathmandu Durbar Square is the plaza in front of the old royal palace of the Kathmandu Kingdom',
      },
      {
        id: 'patanDurbarSquare',
        name: 'Patan Durbar Square',
        imagePath: patanDurbarSquareImg, // Use imported image
        info: 'Patan Durbar Square is situated at the centre of the city of Lalitpur in Nepal',
      },
      {
        id: 'bhaktapurDurbarSquare',
        name: 'Bhaktapur Durbar Square',
        imagePath: bhaktapurDurbarSquareImg, // Use imported image
        info: 'Bhaktapur Durbar Square is the plaza in front of the royal palace of the old Bhaktapur Kingdom',
      },
    ]
  },
  [CATEGORIES.LAKES]: {
    title: 'Lakes',
    items: [
      {
        id: 'raraLake',
        name: 'Rara Lake',
        imagePath: raraLakeImg, // Use imported image
        info: 'Rara Lake is the biggest and deepest freshwater lake in the Nepal Himalayas',
      },
      {
        id: 'tilichoLake',
        name: 'Tilicho Lake',
        imagePath: tilichoLakeImg, // Use imported image
        info: 'Tilicho Lake is a lake located in the Manang district of Nepal',
      },
      {
        id: 'tshoRolpaLake',
        name: 'Tsho Rolpa Lake',
        imagePath: tshoRolpaLakeImg, // Use imported image
        info: 'Tsho Rolpa is one of the biggest glacial lakes in Nepal',
      },
      {
        id: 'gosainkundaLake',
        name: 'Gosainkunda Lake',
        imagePath: gosainkundaLakeImg, // Use imported image
        info: 'Gosainkunda is an alpine freshwater oligotrophic lake in Nepal',
      },
    ]
  },
  [CATEGORIES.MOUNTAINS]: {
    title: 'Mountains',
    items: [
      {
        id: 'mountEverest',
        name: 'Mount Everest',
        imagePath: mountEverestImg, // Use imported image
        info: 'Everest is the highest mountain in the world',
      },
      {
        id: 'mountKangchenjunga',
        name: 'Mount Kangchenjunga',
        imagePath: mountKangchenjungaImg, // Use imported image
        info: 'Kangchenjunga is the third highest mountain in the world',
      },
      {
        id: 'mountLhotse',
        name: 'Mount Lhotse',
        imagePath: mountLhotseImg, // Use imported image
        info: 'Lhotse is the fourth highest mountain in the world',
      },
      {
        id: 'mountManaslu',
        name: 'Mount Manaslu',
        imagePath: mountManasluImg, // Use imported image
        info: 'Manaslu is the eighth highest mountain in the world',
      },
      {
        id: 'choOyu',
        name: 'Cho Oyu',
        imagePath: mountChoOyuImg, // Use imported image
        info: 'Cho Oyu is the sixth highest mountain in the world',
      },
    ]
  },
};
