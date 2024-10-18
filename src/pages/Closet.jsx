import { useEffect, useState } from "react";
import AddClothesButton from "../components/AddClothesButton";
import EditForm from "../components/EditForm";
import { getClothesData, getCategories } from "../utilities/database";
import { auth } from "../utilities/firebase";

function Closet() {
  const [showModal, setShowModal] = useState(false);
  // used for double click on clothing item to edit vs adding a new item
  const [editingClothes, setEditingClothes] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [clothes, setClothes] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [categoriesDict, setCategoriesDict] = useState({});
  const currentUser = auth.currentUser;
  useEffect(() => {
    getCategories().then(({ categoriesOrdered, categoriesDict }) => {
      if (categoriesOrdered && categoriesDict) {
        setCategories(categoriesOrdered);
        setCategoriesDict(categoriesDict);
      }
    });

    const unsubscribe = getClothesData(currentUser.uid, (clothesData) => {
      setClothes(clothesData);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // TODO: Fetch all clothes data for this person
  // Display clothes filted by the category

  const filteredClothes =
    selectedCategory === "All"
      ? clothes
      : clothes.filter((item) => item.category === selectedCategory);

  return (
    <div className="p-4">
      <EditForm
        showModal={showModal}
        setShowModal={setShowModal}
        categories={categories}
        categoriesDict={categoriesDict}
        editing={editingClothes}
      />

      {/* Category icons */}
      <div className="flex space-x-4 overflow-x-auto mb-4">
        {["All", ...categories].map((category, index) => (
          <div key={index}>
            <button
              // key={index}
              onClick={() => setSelectedCategory(category)}
              className={`w-16 h-16 flex-shrink-0 flex items-center justify-center bg-white-100 rounded-full p-2 hover:bg-gray-300 transition ${
                selectedCategory === category ? "bg-blue-100 text-white" : ""
              }`}
            >
              <img
                src={`/assets/icons/${category}.svg`}
                alt={category}
                className="w-10 h-10 object-contain"
              />
            </button>
            <p>{category}</p>
          </div>
        ))}
      </div>

      {/* Scrollable container for clothing grid */}
      <div className="h-[calc(100vh-150px)] overflow-y-auto">
        {/* Clothing grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* <p>... Need to fetch clothes data from database</p> */}
          {filteredClothes.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-gray-100 p-4 rounded-md"
            >
              {/* Use SVG or image for each clothing item */}
              <img
                src={item.imageURL}
                alt={`Clothing item ${index + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>

      <AddClothesButton
        onClick={() => {
          setEditingClothes(false);
          setShowModal(true);
        }}
      />
    </div>
  );
}

export default Closet;
