/* eslint-disable react/prop-types */

// skeleton inspired by https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular
// form layout reference https://tailwindui.com/components/application-ui/forms/form-layouts
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../utilities/storage";
import CustomDropdown from "./CustomDropdown";
import ImageUploader from "./ImageUploader";
import { writeData } from "../utilities/database";
import { getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import WarmthLevelInfo from "./WarmthLevelInfo";
import PreferenceInfo from "./PreferenceInfo";
import { set } from "firebase/database";
import { auth } from "../utilities/firebase";

const EditForm = ({
  showModal,
  setShowModal,
  defaultData,
  categories,
  categoriesDict,
  editing,
}) => { 
  defaultData = defaultData || {
    image: "",
    name: "",
    category: categories[0],
    warmthLevel: 0,
    color: "#000000",
    preference: 5,
  };

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [categories]);

  const currentUser = auth.currentUser;
  const [showWarmthInfo, setShowWarmthInfo] = useState(false);
  const [showPreferenceInfo, setShowreferenceInfo] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showWarmthLevel, setShowWarmthLevel] = useState(true);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleWarmthInfo = () => {
    setShowWarmthInfo(!showWarmthInfo);
  };

  const togglePreferenceInfo = () => {
    setShowreferenceInfo(!showPreferenceInfo);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);

    if (categoriesDict[value] !== "Footwear") {
      setShowWarmthLevel(true);
    } else {
      setShowWarmthLevel(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setErrorMessage("Please upload an image.");
      return;
    }

    setErrorMessage("");

    const data = new FormData(e.target);
    const formObject = Object.fromEntries(data.entries());

    // rename the image when uploading
    const clothingId = uuidv4();
    // upload image to firebase storage and wait until it is uploaded
    const snapshot = await uploadFile(`${clothingId}.png`, formObject.image);
    const imageURL = await getDownloadURL(snapshot.ref);
    console.log(imageURL);
    // write data to database
    const ClothingData = {
      category: formObject.category,
      parentCategory: categoriesDict[formObject.category],
      warmthLevel: formObject.warmthLevel || 3,
      color: formObject.color,
      preference: formObject.preference,
      imageURL,
    };
    console.log(ClothingData);
    // await writeData("admin", clothingId, ClothingData);
    if (currentUser) {
      await writeData(currentUser.uid, clothingId, ClothingData);
      console.log(currentUser.uid);
    } else {
      console.error("No authenticated user");
    }

    setShowModal(false);
  };

  const handleImageUpload = (uploadedImage) => {
    setImage(uploadedImage);
    setErrorMessage("");
  };

  return (
    <>
      {showModal ? (
        <>
          <form
            onSubmit={handleSubmit}
            className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto w-[85%] lg:w-96">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {editing ? "Edit" : "Add"} Clothes
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-col flex gap-4">
                  <div className="sm:col-span-4">
                    <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
                      <ImageUploader
                        defaultImage={defaultData.image}
                        onImageUpload={handleImageUpload}
                      />
                    </div>
                    {errorMessage && (
                      <p className="text-red-500 text-sm mt-2">
                        {errorMessage}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Category
                    </label>
                    <div className="mt-1">
                      <CustomDropdown
                        fieldId="category"
                        FieldName="category"
                        options={categories}
                        defaultValue={defaultData.category}
                        onChange={(e) => handleCategoryChange(e)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="color"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Primary Color
                    </label>
                    <div className="mt-1">
                      <div className="flex sm:max-w-md">
                        <input
                          id="color"
                          name="color"
                          type="color"
                          defaultValue={defaultData.color}
                          className="block flex-1 border-0 h-8 bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {showWarmthLevel && selectedCategory !== "Rain Jacket" && (
                    <div className="sm:col-span-4 mb-4">
                      <div className="flex items-center gap-1 relative">
                        <label
                          htmlFor="warmthLevel"
                          className="block text-sm font-medium leading-6 text-gray-900 text-left mt"
                        >
                          Warmth Level
                        </label>
                        {/* info button */}
                        <button
                          className="flex items-center justify-center bg-transparent m-0 p-0 outline-none active:outline-none"
                          onClick={toggleWarmthInfo}
                          type="button"
                        >
                          <span className="material-symbols-rounded text-sm">
                            info
                          </span>
                        </button>
                        <WarmthLevelInfo
                          isVisible={showWarmthInfo}
                          category={selectedCategory.toLowerCase()}
                        />
                      </div>
                      <div className="mt-1 relative">
                        <input
                          id="warmthLevel"
                          name="warmthLevel"
                          defaultValue={defaultData.warmthLevel}
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          className="w-full bg-gray-200 accent-gray-600 cursor-pointer"
                        />
                        <span className="text-sm text-gray-400 absolute start-0 -bottom-4">
                          1
                        </span>
                        <span className="text-sm text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">
                          2
                        </span>
                        <span className="text-sm text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">
                          3
                        </span>
                        <span className="text-sm text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">
                          4
                        </span>
                        <span className="text-sm text-gray-400 absolute start-4/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">
                          5
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="sm:col-span-4">
                    <div className="flex items-center gap-1 relative">
                      <label
                        htmlFor="preference"
                        className="block text-sm font-medium leading-6 text-gray-900 text-left"
                      >
                        Preference
                      </label>
                      {/* info button */}
                      <button
                        className="flex items-center justify-center bg-transparent m-0 p-0 outline-none active:outline-none"
                        onClick={togglePreferenceInfo}
                        type="button"
                      >
                        <span className="material-symbols-rounded text-sm">
                          info
                        </span>
                      </button>
                      <PreferenceInfo isVisible={showPreferenceInfo} />
                    </div>
                    <div className="mt-1 relative mb-2">
                      <input
                        id="preference"
                        name="preference"
                        defaultValue={defaultData.preference}
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        className="w-full bg-gray-200 accent-gray-600 cursor-pointer"
                      />
                      <span className="text-sm text-gray-400 absolute start-0 -bottom-4">
                        0
                      </span>
                      <span className="text-sm text-gray-400 absolute start-1/5 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">
                        2
                      </span>
                      <span className="text-sm text-gray-400 absolute start-2/5 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">
                        4
                      </span>
                      <span className="text-sm text-gray-400 absolute start-3/5 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">
                        6
                      </span>
                      <span className="text-sm text-gray-400 absolute start-4/5 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">
                        8
                      </span>
                      <span className="text-sm text-gray-400 absolute end-0 -bottom-4">
                        10
                      </span>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-black-500 bg-gray-200 active:bg-gray-300 font-semibold uppercase px-5 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-neutral-800 text-white active:bg-neutral-800 font-bold uppercase text-sm px-5 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default EditForm;
