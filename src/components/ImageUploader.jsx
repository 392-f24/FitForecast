import { useState } from 'react';

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  // Function to handle the file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
        <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
        >
            <span>Upload Image</span>
            <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            />
        </label>
        {image && (
            <img
            src={image}
            alt="Uploaded Preview"
            className="mt-1 rounded-md w-48 h-48 object-cover"
            />
        )}
        </div>
  );
};

export default ImageUploader;
