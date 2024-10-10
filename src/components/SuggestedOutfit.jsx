import React, { useState } from "react";
import ClothesCard from "./ClothesCard";
import { functions, httpsCallable } from "../utilities/firebase"

// Import all clothing items
import Jeans from "../assets/jeans.png";
import BeigePants from "../assets/beigePants.png";
import GreenPants from "../assets/greenPants.png";
import YellowPants from "../assets/yellowPants.png";
import Shoes from "../assets/shoes.png";
import On from "../assets/on.png";
import LeatherJacket from "../assets/leatherjacket.png";
import WhiteShirt from "../assets/whileshirt.png";
import WhiteSweater from "../assets/whitesweater.png";
import BlackShirt from "../assets/blackShirt.png";

// Categorized clothing items
const pants = [
  { name: "Light Blue Jeans", image: Jeans },
  { name: "Beige Pants", image: BeigePants },
  { name: "Green Pants", image: GreenPants },
  { name: "Yellow Pants", image: YellowPants },
];

const shoes = [
  { name: "New Balance Sneakers", image: Shoes },
  { name: "On Shoes", image: On },
];

const shirts = [
  { name: "White Shirt", image: WhiteShirt },
  { name:"Black Shirt", image: BlackShirt},
];

const jackets = [
  { name: "Leather Jacket", image: LeatherJacket },
  { name: "White Sweater", image: WhiteSweater },
];

// Helper function to select a random item from each category
const getRandomItem = (category) => {
  const randomIndex = Math.floor(Math.random() * category.length);
  return category[randomIndex];
};

const SuggestedOutfit = () => {
  const generateOutfit = () => ({
    pants: getRandomItem(pants),
    shoes: getRandomItem(shoes),
    top: getRandomItem(shirts),
    accessory: getRandomItem(jackets),
  });

  const [outfit, setOutfit] = useState(generateOutfit());

  const suggestNewOutfit = () => {
    setOutfit(generateOutfit());
  };

  const firebaseFunction = () => {
    // Call Firebase function using httpsCallable
    const onRequestExample = httpsCallable(functions, 'on_request_example');
    
    onRequestExample()
      .then(result => {
        console.log('Firebase function response:', result.data); // Access the response data
        setOutfit(generateOutfit());  // Generate new outfit after successful function call
      })
      .catch(error => {
        console.error('Error calling Firebase function:', error);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-left">Today's Outfit</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="w-full aspect-square">
          <ClothesCard clothes={outfit.pants} />
        </div>
        <div className="w-full aspect-square">
          <ClothesCard clothes={outfit.top} />
        </div>
        <div className="w-full aspect-square">
          <ClothesCard clothes={outfit.shoes} />
        </div>
        <div className="w-full aspect-square">
          <ClothesCard clothes={outfit.accessory} />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={firebaseFunction}
          className="inline-flex px-4 py-3 justify-center items-center gap-3 rounded-xl bg-neutral-800 w-fit text-white"
        >
          <span className="material-symbols-rounded">autorenew</span>
          <p className="text-m font-semibold text-left">Suggest new outfit</p>
        </button>
      </div>
    </div>
  );
};

export default SuggestedOutfit;
