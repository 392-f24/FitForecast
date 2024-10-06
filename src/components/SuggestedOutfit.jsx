import React, { useState } from "react";
import ClothesCard from "./ClothesCard";

// Import all clothing items
import Jeans from "../assets/jeans.png";
import BeigePants from "../assets/beigePants.png";
import GreenPants from "../assets/greenPants.png";
import YellowPants from "../assets/yellowPants.png";
import Shoes from "../assets/shoes.png";
import On from "../assets/on.png";
import LeatherJacket from "../assets/leatherjacket.png";
import WhiteShirt from "../assets/whileshirt.png";
import WhiteSweater from "../assets/whitesweater.jpg";
import Sunglasses from "../assets/sunglasses.png";
import Tote from "../assets/tote.png";

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

const tops = [
  { name: "Leather Jacket", image: LeatherJacket },
  { name: "White Shirt", image: WhiteShirt },
  { name: "White Sweater", image: WhiteSweater },
];

const accessories = [
  { name: "Beige Totebag", image: Tote },
  { name: "Sunglasses", image: Sunglasses },
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
    top: getRandomItem(tops),
    accessory: getRandomItem(accessories),
  });

  const [outfit, setOutfit] = useState(generateOutfit());

  const suggestNewOutfit = () => {
    setOutfit(generateOutfit());
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-left">Today's Outfit</p>

      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <ClothesCard clothes={outfit.pants} />
          <ClothesCard clothes={outfit.top} />
        </div>
        <div className="flex flex-col gap-4">
          <ClothesCard clothes={outfit.shoes} />
          <ClothesCard clothes={outfit.accessory} />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={suggestNewOutfit}
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
