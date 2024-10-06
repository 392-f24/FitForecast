/* eslint-disable react/prop-types */
const AddClothesButton = ({ onClick }) => {
  return (
    <button
      className="bg-neutral-800 text-white absolute right-4 bottom-4 z-10 font-bold uppercase text-sm w-16 h-16 rounded-full outline-none ease-linear transition-all duration-150 flex justify-center items-center"
      type="button"
      onClick={onClick}
    >
      <span className="material-symbols-rounded text-2xl">add</span>
    </button>
  );
};

export default AddClothesButton;
