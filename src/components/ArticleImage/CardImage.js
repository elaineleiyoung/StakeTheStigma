import React, { useContext } from 'react';
import { ImageContext } from './ImageContext';

const CardImage = () => {
  const imageUrl = useContext(ImageContext);

  return (
    <div>
      <img src={imageUrl} alt="Loading..." width="auto" height="217px" objectFit= "cover" />
    </div>
  );
};

export default CardImage;
