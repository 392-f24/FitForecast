import { useState } from "react";
import AddClothesButton from "../components/AddClothesButton";
import AllIcon from "../assets/all.svg";
import EditForm from "../components/EditForm";

// import ShirtSVG from "../assets/test.svg";
// import PantSVG from "../assets/jeans.svg";
import BagSVG from "../assets/bag.svg";
// import ShoesSVG from "../assets/shoesTest.svg";

// import ShirtsIcon from "../assets/shirts.svg";
// import PantsIcon from "../assets/pants.svg";
// import ShoesIcon from "../assets/shoes.svg";
// import JacketsIcon from "../assets/jackets.svg";
// import AccessoriesIcon from "../assets/accessories.svg";

// import clothes icons
import HoodieIcon from "../assets/icons/hoodie.svg";
import BootsIcon from "../assets/icons/boots.svg";
import DressIcon from "../assets/icons/dress.svg";
import DressShoesIcon from "../assets/icons/dressshoes.svg";
import LongSleeveIcon from "../assets/icons/longsleeve.svg";
import PantsIcon from "../assets/icons/pants.svg";
import SandalsIcon from "../assets/icons/sandals.svg";
import ShortsIcon from "../assets/icons/shorts.svg";
import SneakersIcon from "../assets/icons/sneakers.svg";
import TShirtIcon from "../assets/icons/t-shirt.svg";
import ShirtIcon from "../assets/icons/shirt.svg";
import SweaterIcon from "../assets/icons/sweater.svg";
import JacketIcon from "../assets/icons/jacket.svg";
import RainJacketIcon from "../assets/icons/rainjacket.svg";
import CoatIcon from "../assets/icons/coat.svg";

function Closet() {
  const [showModal, setShowModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // const categories = [
  //   "All",
  //   "Shirts",
  //   "Pants",
  //   "Shoes",
  //   "Jackets",
  //   "Accessories",
  // ];

  const categories = [
    "All",
    "TShirt",
    "Shirt",
    "LongSleeve",
    "Dress",
    "Shorts",
    "Pants",
    "Sandals",
    "Sneakers",
    "Boots",
    "DressShoes",
    "Sweater",
    "Hoodie",
    "Jacket",
    "RainJacket",
    "Coat",
  ];

  // Map categories to their icons
  const categoryIcons = {
    All: AllIcon,
    TShirt: TShirtIcon,
    Shirt: ShirtIcon,
    LongSleeve: LongSleeveIcon,
    Dress: DressIcon,
    Shorts: ShortsIcon,
    Pants: PantsIcon,
    Sandals: SandalsIcon,
    Sneakers: SneakersIcon,
    Boots: BootsIcon,
    DressShoes: DressShoesIcon,
    Sweater: SweaterIcon,
    Hoodie: HoodieIcon,
    Jacket: JacketIcon,
    RainJacket: RainJacketIcon,
    Coat: CoatIcon,
  };

  const clothes = [
    // Populate this array with actual clothing items with a category property
    // { imageUrl: ShirtSVG, category: "Shirts" },
    // { imageUrl: PantSVG, category: "Pants" },
    // { imageUrl: ShoesSVG, category: "Shoes" },
    // { imageUrl: ShirtSVG, category: "Jackets" },
    // { imageUrl: BagSVG, category: "Accessories" },
    { imageUrl: BagSVG, category: "Hoodie" },
  ];

  const filteredClothes =
    selectedCategory === "All"
      ? clothes
      : clothes.filter((item) => item.category === selectedCategory);

  return (
    <div className="p-4">
      <EditForm showModal={showModal} setShowModal={setShowModal} />

      {/* Category icons */}
      <div className="flex space-x-4 overflow-x-auto mb-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`w-16 h-16 flex-shrink-0 flex items-center justify-center bg-white-100 rounded-full p-2 hover:bg-gray-300 transition ${
              selectedCategory === category ? "bg-blue-100 text-white" : ""
            }`}
          >
            <img
              src={categoryIcons[category]}
              alt={category}
              className="w-10 h-10 object-contain"
            />
          </button>
        ))}
      </div>

      {/* Scrollable container for clothing grid */}
      <div className="h-[calc(100vh-150px)] overflow-y-auto">
        {/* Clothing grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <p>... Need to fetch clothes data from database</p>
          {/* {filteredClothes.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-gray-100 p-4 rounded-md"
            >
              Use SVG or image for each clothing item
              <img
                src={item.imageUrl}
                alt={`Clothing item ${index + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))} */}
        </div>
      </div>

      <AddClothesButton onClick={() => setShowModal(true)} />
    </div>
  );
}

export default Closet;
