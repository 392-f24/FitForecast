import { useState } from 'react';
import ShirtSVG from '../assets/test.svg';
import PantSVG from '../assets/jeans.svg';
import BagSVG from '../assets/bag.svg';
import ShoesSVG from '../assets/shoesTest.svg';
import AllIcon from '../assets/all.svg';
import ShirtsIcon from '../assets/shirts.svg';
import PantsIcon from '../assets/pants.svg';
import ShoesIcon from '../assets/shoes.svg';
import JacketsIcon from '../assets/jackets.svg';
import AccessoriesIcon from '../assets/accessories.svg';
function Closet() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ["All", "Shirts", "Pants", "Shoes", "Jackets", "Accessories"];

  // Map categories to their icons
  const categoryIcons = {
    All: AllIcon,
    Shirts: ShirtsIcon,
    Pants: PantsIcon,
    Shoes: ShoesIcon,
    Jackets: JacketsIcon,
    Accessories: AccessoriesIcon,
  };
  const clothes = [
    // Populate this array with actual clothing items with a category property
    { imageUrl: ShirtSVG, category: 'Shirts' },
    { imageUrl: PantSVG, category: 'Pants' },
    { imageUrl: ShoesSVG, category: 'Shoes' },
    { imageUrl: ShirtSVG, category: 'Jackets' },
    { imageUrl: BagSVG, category: 'Accessories' },
  ];

  const filteredClothes = selectedCategory === 'All' 
    ? clothes 
    : clothes.filter(item => item.category === selectedCategory);

  return (
    <div className="p-4">
      {/* Category icons */}
      <div className="flex space-x-4 overflow-x-auto mb-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`w-16 h-16 flex-shrink-0 flex items-center justify-center bg-white-100 rounded-full p-2 hover:bg-gray-300 transition ${
              selectedCategory === category ? 'bg-blue-100 text-white' : ''
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
      <div className="h-screen overflow-y-auto">
        {/* Clothing grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredClothes.map((item, index) => (
            <div key={index} className="flex items-center justify-center bg-gray-100 p-4 rounded-md">
              {/* Use SVG or image for each clothing item */}
              <img src={item.imageUrl} alt={`Clothing item ${index + 1}`} className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Closet;