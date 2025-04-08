import React, { useState, useRef } from "react";
import axios from "axios"; // Make sure axios is installed

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null); // To store the selected file
  const [preview, setPreview] = useState(null); // To store the file preview
  const fileInputRef = useRef(null); // Create a ref for the file input

  // Handle file selection and upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Set the preview of the image
    setPreview(URL.createObjectURL(file));
    setSelectedFile(file);

    // Create FormData to send the image to the server
    const formData = new FormData();
    formData.append("avatar", file); // backend field name must match

    try {
      // Assuming the backend is set to handle the upload at '/upload'
      const res = await axios.post("http://localhost:8085/api/user/ChangerImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", res.data);
      // You can do something with the uploaded image URL, like saving it to the user's profile
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
        Upload Image
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
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
