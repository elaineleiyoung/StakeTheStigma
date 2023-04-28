import autoimmune_disease from "./resources/autoimmune_disease.webp";
import bone_health from "./resources/bone_health.jpeg"
import breast_health from "./resources/breast_health.png";
import cardiovascular_health from "./resources/cardiovascular_health.webp";
import mental_health from "./resources/mental_health.png";
import muscular_health from "./resources/muscular_health.jpeg";
import nutrition from "./resources/nutrition.png";
import reproductive_health from "./resources/reproductive_health.jpeg";
import sexual_health from "./resources/sexual_health.jpeg";
import skin_health from "./resources/skin_disease.jpeg";
import sts from "./resources/sts.png"
import React, { createContext } from 'react';

export const ImageContext = createContext(null);

const ImageProvider = ({ children, topic }) => {
  const getImageUrl = (topic) => {
    switch (topic) {
      case 'Reproductivehealth':
        return reproductive_health;
      case 'Breasthealth':
        return breast_health;
      case 'Sexualhealth':
        return sexual_health;
      case 'Mentalhealth':
        return mental_health;
      case 'Cardiovascularhealth':
        return cardiovascular_health;
      case 'Bonehealth':
        return bone_health;
      case 'Cancer':
        return breast_health;
      case 'Autoimmunediseases':
        return autoimmune_disease;
      case 'Skinhealth':
        return skin_health;
      case 'Muscularhealth':
        return muscular_health;
      case 'Nutritionandfitness':
        return nutrition;
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
