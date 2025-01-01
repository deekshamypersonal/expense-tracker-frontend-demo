import React, { useState, useContext } from "react";
import { uploadBill } from "./api";
import { DataContext } from "./DataContext";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { expenses } = useContext(DataContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Front-end check for PNG or JPEG
    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Please select a PNG or JPEG image only.");
      event.target.value = null; // Reset file input
      return;
    }

    setSelectedFile(file);
    setErrorMessage(""); // Clear any previous error
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (expenses.length >= 10) {
      setErrorMessage(
        "Demo user can only have 10 expenses total. Please delete an existing one from View Expense tab."
      );
      return;
    }

    if (!selectedFile) {
      setErrorMessage("Please select a PNG or JPEG file!");
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
      setErrorMessage(
        "No valid receipt data found. Please upload a valid bill."
      );
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-center text-purple-700 mb-6 underline">
        Upload a PNG or JPEG File
      </h1>
      <p className="text-sm text-center text-gray-600 mb-4">
        Accepted formats: <span className="font-semibold">.png, .jpg</span>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        <div>
          <input
            type="file"
            accept="image/png, image/jpeg"
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
