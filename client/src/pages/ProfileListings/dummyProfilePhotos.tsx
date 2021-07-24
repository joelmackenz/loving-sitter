import image1 from '../../mock-images/mock-image1.jpg';
import image2 from '../../mock-images/mock-image2.jpg';
import image3 from '../../mock-images/mock-image3.jpg';
import image4 from '../../mock-images/mock-image4.jpg';
import image5 from '../../mock-images/mock-image5.jpg';
import image6 from '../../mock-images/mock-image6.jpg';
import image7 from '../../mock-images/mock-image7.jpg';
import image8 from '../../mock-images/mock-image8.jpg';
import image9 from '../../mock-images/mock-image9.jpg';

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

export const randomImage = () => {
  const randomNum = Math.floor(Math.random() * 9);
  return images[randomNum];
};

export const specificImage = (imageNum: number) => {
  return images[imageNum];
};
