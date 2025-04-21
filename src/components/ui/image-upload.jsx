import React, { useState } from "react";
import axios from "axios";

const apiUri = import.meta.env.VITE_REACT_API_URI;

const ImageUpload = ({ image, onUploadSuccess }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("Image", file);

    try {
      const res = await axios.post(`${apiUri}/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });

      const imageUrl = res.data?.file?.filename;
      console.log("Upload successful to:", imageUrl);
      setPreview(URL.createObjectURL(file));
      if (onUploadSuccess && imageUrl) {
        onUploadSuccess(imageUrl);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <label className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <span className="mr-2">
          {preview ? 'Change' : 'Upload'} Image
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          aria-label={preview ? 'Change image' : 'Upload image'}
        />
      </label>

      {preview && (
        <div className="mt-6 flex flex-col items-center gap-4 animate-fade-in">
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full border-4 border-emerald-100 shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
