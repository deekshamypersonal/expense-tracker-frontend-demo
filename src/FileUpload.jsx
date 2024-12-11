import React, { useState } from "react";
import { uploadBill } from "./api";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You are not logged in.");
      return;
    }

    try {
      const data = await uploadBill(selectedFile, token);
      setText(data);
      setErrorMessage("");
    } catch (error) {
      console.error("There was an error uploading the file!", error);
      setErrorMessage("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-center text-purple-700 mb-6 underline">
        Upload a PNG File
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        <div>
          <input
            type="file"
            accept="image/png"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-200"
        >
          Upload
        </button>
      </form>
      {text && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">
            Extracted Text:
          </h3>
          <p className="text-gray-800">{text}</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
