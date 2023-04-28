import React, { useContext } from 'react';
import { ImageContext } from './ImageContext';

const CardImage = () => {
  const imageUrl = useContext(ImageContext);

  return (
    <div>
      <img src={imageUrl} alt="Loading..." width="100px" height="100px"/>
    </div>
  );
};

export default CardImage;
