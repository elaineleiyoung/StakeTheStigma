import postpartum_depression_image from "./resources/postpartum-depression.jpeg";
import female_health from "./resources/female_health.png";
import hpv from "./resources/hpv";
import pcos from "./resources/pcos";
import pregnancy from "./resources/pregnancy";
import sts from "./resources/sts.png";
import menopause from "./resources/menopause";
import ovarian_cancer from "./resources/ovarian_cancer";
import breast_cancer from "./resources/breast_cancer";
import React, { createContext } from 'react';

export const ImageContext = createContext(null);

const ImageProvider = ({ children, topic }) => {
  const getImageUrl = (topic) => {
    switch (topic) {
      case 'postpartum':
        return postpartum_depression_image;
      case 'pcos':
        return pcos;
      case 'hpv':
        return hpv;
      case 'pregnancy':
        return pregnancy;
      case 'menopause':
        return menopause;
      case 'menstruation':
        return female_health;
      case 'ovarian_cancer':
        return ovarian_cancer;
      case 'breast_cancer':
        return breast_cancer;
      default:
        return sts;
    }
  };

  const imageUrl = getImageUrl(topic);

  return (
    <ImageContext.Provider value={imageUrl}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageProvider;
