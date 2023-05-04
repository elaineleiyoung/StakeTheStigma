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
    if (/Reproductivehealth/i.test(topic)) {
      return reproductive_health;
    } else if (/Breasthealth/i.test(topic)) {
      return breast_health;
    } else if (/SexualHealth/i.test(topic)) {
      return sexual_health;
    } else if (/MentalHealth/i.test(topic)) {
      return mental_health;
    } else if (/Cardiovascularhealth/i.test(topic)) {
      return cardiovascular_health;
    } else if (/Bonehealth/i.test(topic)) {
      return bone_health;
    } else if (/Cancer/i.test(topic)) {
      return breast_health;
    } else if (/Autoimmunediseases/i.test(topic)) {
      return autoimmune_disease;
    } else if (/Skinhealth/i.test(topic)) {
      return skin_health;
    } else if (/Muscularhealth/i.test(topic)) {
      return muscular_health;
    } else if (/NutritionandFitness/i.test(topic)) {
      return nutrition;
    } else {
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
