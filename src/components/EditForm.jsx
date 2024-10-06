/* eslint-disable react/prop-types */

// skeleton inspired by https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular
// form layout reference https://tailwindui.com/components/application-ui/forms/form-layouts

import CustomDropdown from "./CustomDropdown";

const categories = [
  "shirts",
  "coat",
  "shorts",
  "pants",
  "shoes",
  "accessories",
];
const thickness = ["thin", "medium", "thick"];

const EditForm = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Clothes</h3>
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
                <div className="relative p-6 flex-auto">
                  <div className="col-span-full">
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        {/* <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" /> */}
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            {/* <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            /> */}
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="nickname"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left mt-3"
                    >
                      nickname
                    </label>
                    <div className="mt-1">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          id="nickname"
                          name="nickname"
                          type="text"
                          placeholder="What would you call this?"
                          autoComplete="nickname"
                          className="block flex-1 border-0 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none "
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="cateogry"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left mt-3"
                    >
                      cateogry
                    </label>
                    <div className="mt-1">
                      <CustomDropdown data={categories} />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="thickness"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left mt-3"
                    >
                      thickness
                    </label>
                    <div className="mt-1">
                      <CustomDropdown data={thickness} />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="color"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left mt-3"
                    >
                      primary color
                    </label>
                    <div className="mt-1">
                      <div className="flex sm:max-w-md">
                        <input
                          id="color"
                          name="color"
                          type="color"
                          className="block flex-1 border-0 h-8 bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="preference "
                      className="block text-sm font-medium leading-6 text-gray-900 text-left mt-3"
                    >
                      preference
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="steps-range"
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        className="w-full bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-4">0</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/5 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">2</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/5 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">4</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-3/5 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">6</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-4/5 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">8</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-4">10</span>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-black-500 bg-gray-200 active:bg-gray-300 font-bold uppercase px-5 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default EditForm;
