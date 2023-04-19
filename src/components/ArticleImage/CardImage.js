import React, { useContext } from 'react';
import { ImageContext } from './ImageContext';

const CardImage = () => {
  const imageUrl = useContext(ImageContext);

  return (
    <div>
      <img src={imageUrl} alt="Loading..." width="350px" height="300px"/>
    </div>
  );
};

export default CardImage;
