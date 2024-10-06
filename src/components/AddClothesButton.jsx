/* eslint-disable react/prop-types */
const AddClothesButton = ({onClick}) => {
  return (
    <button
          className="bg-pink-500 text-white active:bg-pink-600 absolute right-10 bottom-10 z-50 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={onClick}
        >
          Add
    </button>
  )
}

export default AddClothesButton