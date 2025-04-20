import React, { useState, useRef } from "react";
import axios from "axios"; // Make sure axios is installed

const apiUri = import.meta.env.VITE_REACT_API_URI

const ImageUpload = ({image}) => {
  const [preview, setPreview] = useState(null); // To store the file preview
  const fileInputRef = useRef(null); // Create a ref for the file input

  // Handle file selection and upload
  const handleFileChange = async (e,) => {
    const file = e.target.files[0];
    if (!file) return;


    // Create FormData to send the image to the server
    const formData = new FormData();
    formData.append("Image", file);
    try {
      // Assuming the backend is set to handle the upload at '/upload'
      const res = await axios.post(`${apiUri}/users/upload-${image}picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });
      console.log("Upload successful:", res.data);
      setPreview(URL.createObjectURL(file));
      // Set the preview of the image
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };


  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Button to trigger file input click */}
      <button
        onClick={() => fileInputRef.current.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Upload {image} Image
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef} // Attach ref to the input element
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Display preview if a file is selected */}
      {preview && (
        <div className="mt-6 flex flex-col items-center gap-4 animate-fade-in">
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full border-4 border-emerald-100 shadow-md"
            />
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-emerald-700">Change Successful!</p>
            <p className="text-sm text-gray-500 mt-1">You may need to refresh the page to see changes in this page</p>
          </div>
          <button
            onClick={() => window.location.reload()} // Reloads the page
            className="mt-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Refresh Now
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
