import ClothesCard from "./ClothesCard";

import Jeans from "../assets/jeans.png";
import Shoes from "../assets/shoes.png";
import Sweater from "../assets/sweater.png";
import Tote from "../assets/tote.png";

const outfit = [
  {
    name: "Light Blue Jeans",
    image: Jeans,
  },
  {
    name: "New Balance Sneakers",
    image: Shoes,
  },
  {
    name: "Brown Sweater",
    image: Sweater,
  },
  {
    name: "Beige Totebag",
    image: Tote,
  },
];

function SuggestedOutfit() {
  const firstHalf = outfit.slice(0, Math.ceil(outfit.length / 2));
  const secondHalf = outfit.slice(Math.ceil(outfit.length / 2));

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-left">Today's Outfit</p>

      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          {firstHalf.map((clothes, index) => (
            <ClothesCard key={index} clothes={clothes} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {secondHalf.map((clothes, index) => (
            <ClothesCard key={index + firstHalf.length} clothes={clothes} />
          ))}
        </div>
      </div>

      <div className="pt-4">
        <button className="inline-flex px-4 py-3 justify-center items-center gap-3 rounded-xl bg-neutral-800 w-fit text-white">
          <span className="material-symbols-rounded">autorenew</span>
          <p className="text-m font-semibold text-left">Suggest new outfit</p>
        </button>
      </div>
    </div>
  );
}

export default SuggestedOutfit;
